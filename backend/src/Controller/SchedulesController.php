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
				return  $this->isOwnActivity($user['id'], $request->activity_id) || $this->isOrgaAdminActivity($user['id'], $request->activity_id);
			case 'edit':
				if ($this->request->getParam('id') !== $request->id) return false;

				return
					(($this->isOwnSchedule($user['id'], $this->request->getParam('id'))
					&& $this->isOwnActivity($user['id'], $request->activity_id))
					||
					($this->isOrgaAdminSchedule($user['id'], $this->request->getParam('id'))
					&& $this->isOrgaAdminActivity($user['id'], $request->activity_id)));
			case 'delete':
				return $this->isOwnSchedule($user['id'], $this->request->getParam('id'))
					|| $this->isOrgaAdminSchedule($user['id'], $this->request->getParam('id'));
			default:
				return parent::isAuthorized($user);
		}
	}

	private function isOwnActivity($userId, $activityId)
	{
		return $this->isAllowedByActivity($this->getProviderSubquery($userId), $activityId);
	}

	private function isOrgaAdminActivity($userId, $activityId)
	{
		return $this->isAllowedByActivity($this->getProviderOrganisationSubquery($userId), $activityId);
	}

	private function isOwnSchedule($userId, $scheduleId)
	{
		return $this->isAllowedBySchedule($this->getProviderSubquery($userId), $scheduleId);
	}

	private function isOrgaAdminSchedule($userId, $scheduleId)
	{
		return $this->isAllowedBySchedule($this->getProviderOrganisationSubquery($userId), $scheduleId);
	}

	private function getProviderSubquery($userId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->find()
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.approved' => true
			]);
	}

	private function getProviderOrganisationSubquery($userId)
	{
		$organisations = TableRegistry::get('Organisations');
		$organisationAdminSubquery = $organisations->find()
			->innerJoinWith('Providers')
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.admin' => true
			]);

		$providers = TableRegistry::get('Providers');
		return $providers->find()
		->select(['id'])
    ->where(function ($exp, $q) use ($organisationAdminSubquery) {
        return $exp->in('organisation_id', $organisationAdminSubquery);
		});
	}

	private function isAllowedByActivity($subqueryProviders, $activityId)
	{
		$activities = TableRegistry::get('Activities');
		$result = $activities->find()
			->select(['id'])
			->where(function ($exp, $q) use ($subqueryProviders) {
					return $exp->in('Activities.provider_id', $subqueryProviders);
			})
			->andWhere(['Activities.id' => $activityId])
			->first();

		return !empty($result);
	}

	private function isAllowedBySchedule($subqueryProviders, $scheduleId)
	{
		$result = $this->table()->find()
			->innerJoinWith('Activities')
			->select(['id'])
			->where(function ($exp, $q) use ($subqueryProviders) {
					return $exp->in('Activities.provider_id', $subqueryProviders);
			})
			->andWhere([
				'Schedules.id' => $scheduleId,
			])
			->first();

		return !empty($result);
	}

}
