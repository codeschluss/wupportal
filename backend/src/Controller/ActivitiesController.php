<?php
namespace App\Controller;

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

	/** @return array associated models */
	protected function contain()
	{
		return [
			'Addresses',
			'Addresses.Suburbs',
			'Tags',
			'Categories',
			'TargetGroups',
			'Providers.Organisations',
			'Schedules'
		];
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

	public function getByProviders()
	{
		// var_dump($request); exit;
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

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($this->createListResponse($query, $result));

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
