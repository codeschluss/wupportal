<?php
namespace App\Controller;

use Cake\ORM\TableRegistry;

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

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index', 'getByProviders']);
	}

	/**
	 * mapped to http get method without param
	 * @return \Cake\Http\Response all records
	 */
	public function index()
	{
		$result = $this->table()->find()
			->contain($this->contain())
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

		$result = $this->table()->find()
			->contain($associatedTables)
			->where([$this->name . '.id' => $id])
			->first();

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name . '.id')
			: $this->ResponseHandler->responseSuccess($result);
	}

	/**
	 * Fetch method
	 *
	 * @return \Cake\Http\Response|void
	 */
	public function list()
	{
		$query = $this->table()->find()->group($this->name . '.id');
		$request = $this->request->input('json_decode');
		if (is_null($request)) return $this->ResponseHandler->responseError();

		$this->setPagination($request);
		$this->setJoins($query);
		$this->setSorting($query, $request);
		$this->setFiltering($query, $request);

		$result = $this->paginate($query)->toArray();
		// $result = $query->all()->toArray();
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
			$query->leftJoinWith('Tags')->contain($this->contain());

		} else {
			foreach ($this->contain() as $contain) {
				$query->leftJoinWith($contain)->contain($contain);
			}
		}
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
