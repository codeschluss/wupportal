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
				return  $this->isOwnActivity($user['id'], $request->activity_id)
					|| $this->isOrgaAdminActivity($user['id'], $request->activity_id);
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
		return $this->isAllowedByActivity($this->getProviderQuery($userId), $activityId);
	}

	private function isOrgaAdminActivity($userId, $activityId)
	{
		return $this->isAllowedByActivity($this->getProviderOrganisationQuery($userId), $activityId);
	}

	private function isOwnSchedule($userId, $scheduleId)
	{
		return $this->isAllowedBySchedule($this->getProviderQuery($userId), $scheduleId);
	}

	private function isOrgaAdminSchedule($userId, $scheduleId)
	{
		return $this->isAllowedBySchedule($this->getProviderOrganisationQuery($userId), $scheduleId);
	}

	private function isAllowedByActivity($subqueryProviders, $activityId)
	{
		$activities = TableRegistry::get('Activities');
		return $activities->isOwnedByValidProvider($subqueryProviders, $activityId);
	}

	private function isAllowedBySchedule($subqueryProviders, $scheduleId)
	{
		$activities = TableRegistry::get('Activities');
		return $this->table()->isOwnedByValidActivity($scheduleId,
			$activities->getByProviders($subqueryProviders));
	}

}
