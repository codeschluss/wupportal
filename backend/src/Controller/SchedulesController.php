<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\ORM\TableRegistry;

/**
 * Schedules Controller
 *
 * @property \App\Model\Table\SchedulesTable $Schedules
 *
 * @method \App\Model\Entity\Schedule[] paginate($object = null, array $settings = [])
 */
class SchedulesController extends AppController
{

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
			case 'add':
			case 'edit':
			case 'delete':
				return  $this->isOwnActivity($user['id'], $request) || $this->isOrgaAdminActivity($user['id'], $request);
			default:
				return parent::isAuthorized($user);
		}
	}

	private function isOwnActivity($userId, $request)
	{
		$providers = TableRegistry::get('Providers');
		$subqueryProviders = $providers->find()
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.approved' => true
			]);

		return $this->isAllowed($subqueryProviders, $request->activity_id);
	}

	private function isOrgaAdminActivity($userId, $request)
	{
		$organisations = TableRegistry::get('Organisations');
		$subqueryOrganisations = $organisations->find()
			->innerJoinWith('Providers')
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.admin' => true
			]);

		$providers = TableRegistry::get('Providers');
		$subqueryProviders = $providers->find()
		->select(['id'])
    ->where(function ($exp, $q) use ($subqueryOrganisations) {
        return $exp->in('organisation_id', $subqueryOrganisations);
		});

		return $this->isAllowed($subqueryProviders, $request->activity_id);
	}

	private function isAllowed($subqueryProviders, $activityId)
	{
		$activities = TableRegistry::get('Activities');
		$result = $activities->find()
			->select(['id'])
			->where(function ($exp, $q) use ($subqueryProviders) {
					return $exp->in('Activities.provider_id', $subqueryProviders);
			})
			->andWhere(['Activities.id' => $activityId])
			->first();

		// var_dump($result); exit;
		return !empty($result);
	}

}
