<?php
namespace App\Controller;

use Cake\ORM\TableRegistry;
use Cake\I18n\Time;
use App\Controller\AppController;

/**
 * Activities Controller
 *
 * @property \App\Model\Table\ActivitiesTable $Activities
 *
 * @method \App\Model\Entity\Activity[] paginate($object = null, array $settings = [])
 */
class ActivitiesController extends AppController
{

	protected $DEFAULT_SORT = 'Activities.name';

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index', 'getByProviders', 'mapfilter']);
	}

	/**
	 * mapped to http get method without param
	 * @return \Cake\Http\Response all records
	 */
	public function index()
	{
		$result = $this->table()->find()
			->contain($this->contain())
			->order([$this->DEFAULT_SORT => 'ASC'])
			->all()
			->toArray();

		$this->prepareResult($result);
		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($result);
	}

	/**
	 * mapped to http get method with id param
	 * @param string|null $id Entry id.
	 * @return \Cake\Http\Response record for the entry id
	 */
	public function view($id = null)
	{
		$associatedTables = $this->table()->showUserActive($id)
			? $this->contain()
			: $this->baseContain();

		$result = $this->table()->find('translations')
			->contain($associatedTables)
			->where([$this->name . '.id' => $id])
			->first();

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name . '.id')
			: $this->ResponseHandler->responseSuccess($result);
	}

	public function mapfilter() {
		$query = $this->table()->find()->distinct();
		$this->setJoins($query);
		$this->setOnlyFutureSchedulesFilter($query);

		$emptyEntities = $this->setAdvancedFilters($query);

		empty($emptyEntities)
			? $this->setFiltering($query, $this->request->input('json_decode'))
			:	$this->setFreetextFilter($query, $emptyEntities);

		$result = $query->all()->toArray();
		$this->prepareResult($result);

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($result);
	}

	private function setAdvancedFilters($query) {
		$request = $this->request->input('json_decode');
		$emptyEntities = [];
		if(isset($request->advanced) && !empty($request->advanced)) {
			foreach ($request->advanced as $entity => $ids) {
				if ($ids && !empty($ids)) {
					$query->where(['OR' =>
						function($exp, $q) use ($entity, $ids) {
							return array_map(function ($id) use ($entity) {
								return [$entity . '.id' => $id];
							}, $ids);
						}
					]);
				} else {
					$emptyEntities[] = $entity;
				}
			}
		}
		return $emptyEntities;
	}

	private function setFreetextFilter($query, $emptyEntities) {
		if(isset($this->request->input('json_decode')->filter)) {
			$filter = $this->request->input('json_decode')->filter;
			if(!empty($filter)) {
				$query->where(['OR' =>
					function($exp, $q) use ($emptyEntities, $filter) {
						$or = [];
						if (!empty($emptyEntities)) {
							$or =
								array_map(function ($entity) use ($filter) {
									return $this->getFilterFieldsQuery($entity, $filter);
								}, $emptyEntities);
						}

						if ($this->isLocaleSet()) {
							$or[] = [$this->table()->translationField('name') . ' LIKE' => '%' . $filter . '%'];
							$or[] = [$this->table()->translationField('description') . ' LIKE' => '%' . $filter . '%'];
						} else {
							$or[] = ['Activities.name LIKE' =>  '%' . $filter . '%'];
							$or[] = ['Activities.description LIKE' => '%' . $filter . '%'];
						}

						return $or;
					}
				]);
			}
		}
	}

	private function getFilterFieldsQuery($entity, $filter) {
		switch($entity) {
			case 'Organisations':
			case 'Suburbs':
				return [$entity . '.name LIKE' => '%' . $filter . '%'];
			case 'Categories':
				return $this->isLocaleSet()
					?	[$this->table()->Categories->translationField('name') . ' LIKE' => '%' . $filter . '%']
					: [$entity . '.name LIKE' => '%' . $filter . '%'];
			case 'Tags':
				if($this->isLocaleSet()) {
					$tagsQuery = $this->table()->getTranslatedTagsQuery($filter);
					return
						function ($exp) use ($tagsQuery) {
							return $exp->exists($tagsQuery);
						};
				}
				return [$entity . '.name LIKE' => '%' . $filter . '%'];
		}
	}

	/**
	 * Fetch method
	 *
	 * @return \Cake\Http\Response|void
	 */
	public function list()
	{
		$request = $this->request->input('json_decode');
		if (is_null($request)) return $this->ResponseHandler->responseError();
		$query = $this->table()->find()->group($this->name . '.id');

		$this->setPagination($request);
		$this->setJoins($query);

		if(isset($request->future) && $request->future) {
			$this->setOnlyFutureSchedulesFilter($query);
		}

		$this->setSorting($query, $request);
		$this->setFiltering($query, $request);

		$result = $this->paginate($query)->toArray();
		$this->prepareResult($result);

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($this->createListResponse($query, $result));
	}

	public function getByProviders()
	{
		$query = $this->table()->find()->group($this->name . '.id');
		$request = $this->request->input('json_decode');
		if (is_null($request) && empty($request->providers))
			return $this->ResponseHandler->responseError();

		$this->setPagination($request);
		$this->setJoins($query);

		if(isset($request->future) && $request->future) {
			$this->setOnlyFutureSchedulesFilter($query);
		}

		$this->setSorting($query, $request);
		$this->setFiltering($query, $request);
		$this->setByProviders($query, $request);

		$result = $this->paginate($query)->toArray();
		$this->prepareResult($result);

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($this->createListResponse($query, $result));
	}

	protected function setJoins($query)
	{
		if ($this->isLocaleSet()) {
			$query
			->leftJoinWith('Tags')
			->leftJoinWith('TargetGroups')
			->contain($this->contain());
		} else {
			foreach ($this->contain() as $contain) {
				$query->leftJoinWith($contain)->contain($contain);
			}
		}
	}

	private function setOnlyFutureSchedulesFilter($query) {
		$query->matching('Schedules', function ($q) {
			return $q->where(['Schedules.start_date >' => $q->func()->now('date')]);
		});
	}

	protected function setFiltering($query, $request)
	{
		if (!empty($request->filter)) {
			$query->where(['OR' => function($exp, $q) use (&$field, &$request) {
				$fieldsToFilter = $this->isLocaleSet()
					? $this->fieldsTofilterTranslated()
					: $this->fieldsTofilter();

				$whereClause = [];
				foreach ($fieldsToFilter as $field) {
					$whereClause[] = [$field . ' LIKE' => '%' . $request->filter . '%'];
				}

				$tagsQuery = $this->table()->getTranslatedTagsQuery($request->filter);
				$whereClause[] = function ($exp) use ($tagsQuery) {
					return $exp->exists($tagsQuery);
				};
				return $whereClause;
			}]);
		}
	}

	private function setByProviders($query, $request)
	{
		$query->where(['OR' => function($exp, $q) use (&$field, &$request) {
			$whereClause = [];
			foreach ($request->providers as $provider) {
				$whereClause[] = ['Providers.id' => $provider];
			}
			return $whereClause;
		}]);
	}

	private function prepareResult($result)
	{
		foreach ($result as $activity) {
			if (!$activity->show_user) {
				unset($activity->provider->user);
				unset($activity->provider->user_id);
			}
		}
	}

	/** @return array base of associated models */
	protected function baseContain()
	{
		return [
			'Addresses',
			'Addresses.Suburbs',
			'Tags',
			'Categories',
			'TargetGroups',
			'Schedules',
			'Providers.Organisations'
		];
	}

	/** @return array associated models */
	protected function contain()
	{
		$associatedTables = $this->baseContain();
		array_push($associatedTables, 'Providers.Users');
		return $associatedTables;
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'Activities.name',
			'Activities.description',
			'Organisations.name',
			'Categories.name',
			'Tags.name',
			'Suburbs.name'
		];
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilterTranslated()
	{
		return [
			$this->table()->translationField('name'),
			$this->table()->translationField('description'),
			$this->table()->Categories->translationField('name'),
			'Suburbs.name',
			'Organisations.name',
		];
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
			case 'add':
				return $this->isApprovedProvider($user['id'], $request->provider_id)
					|| $this->isOrgaAdminProvider($user['id'], $request->provider_id);
			case 'edit':
				return $this->request->getParam('id') === $request->id &&
					($this->isOwnActivity($user['id'], $request->id)
					|| $this->isOrgaAdminActivity($user['id'], $request->id));
			case 'delete':
				return $this->isOwnActivity($user['id'],  $this->request->getParam('id'))
					|| $this->isOrgaAdminActivity($user['id'],  $this->request->getParam('id'));
			default:
				return parent::isAuthorized($user);
		}
	}

	private function isOwnActivity($userId, $activityId)
	{
		return $this->table()->isOwnedByValidProvider(
			$this->getProviderQuery($userId), $activityId);
	}

	private function isOrgaAdminActivity($userId, $activityId)
	{
		return $this->table()->isOwnedByValidProvider(
			$this->getProviderOrganisationQuery($userId), $activityId);
	}
}
