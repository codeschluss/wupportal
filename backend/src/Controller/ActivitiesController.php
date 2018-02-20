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

	/**
	 * Contain helper.
	 *
	 * @return array Contained models
	 */
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

	/**
	 * filter helper.
	 *
	 * @return array Fields to use for filter
	 */
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
		if (is_null($request)) return;
		if (empty($request->providers)) return;

		$this->setPagination($request);
		$this->setJoins($query);
		$this->setSorting($query, $request);
		$this->setFiltering($query, $request);
		$this->setByProviders($query, $request);
		$this->data($this->paginate($query));
	}

	private function setByProviders($query, $request) {
		$query->where(['OR' => function($exp, $q) use (&$field, &$request) {
			$whereClause = [];
			foreach ($request->providers as $provider) {
				$whereClause[] = ['Providers.id' => $provider];
			}
			return $whereClause;
		}]);
	}

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index', 'getByProviders']);
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		$storedProvider = $this->getStoredProvider($user['id'], $request->provider->organisation_id);

		switch ($this->request->getParam('action')) {
			case 'add':
				return $storedProvider->approved;
			case 'edit':
				// request is authorized when user is:
				//	- admin of this organisation
				//	- is own provider of this activity
				return $storedProvider !== null && !is_bool($storedProvider) &&
				($storedProvider->admin || $this->validEditOwnActivity($user, $request));
			case 'delete':
				return $request->provider->user_id === $user['id'] || $storedProvider->admin;
			default:
				return parent::isAuthorized($user);
		}
	}

	private function getStoredProvider($userId, $organisationId)
	{
		$query = $this->table()->find()->contain('Providers');
		$query->where([
			'Providers.user_id' => $userId,
			'Providers.organisation_id' => $organisationId
		]);
		return $query->first();
	}

	private function validEditOwnActivity($user, $request) {
		if ($user['id'] !== $request->provider->user_id) {
			return false;
		}
		return $this->isOwnedBy($request->provider->id, $request->id);
	}

	private function isOwnedBy($providerId, $activityId)
	{
		return $this->table()->exists(['id' => $activityId, 'provider_id' => $providerId]);
	}

}
