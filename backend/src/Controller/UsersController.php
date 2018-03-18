<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;
use Cake\ORM\TableRegistry;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[] paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['login']);
	}

	/** @return array associated models */
	public function contain()
	{
		return [
			'Providers.Organisations'
		];
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'Users.username',
			'Users.fullname',
			'Users.phone'
		];
	}


	/**
	 * login method
	 *
	 * @return \Cake\Http\Response|void
	 */
	public function login()
	{
			$user = $this->Auth->identify();
			if (!$user) {
				return $this->ResponseHandler->responseNotAuthorized();
			} else {
				$result = $this->table()->find()
					->contain($this->contain())
					->where(['Users.id' => $user['id']])
					->first();
				return $this->ResponseHandler->responseSuccess($result);
			}
	}

	public function beforeFilter(Event $event)
	{
		parent::beforeFilter($event);

		$request = $this->request->input('json_decode');

		if ($this->request->getParam('action') === 'add') {
			if($request->superuser && !$this->Auth->user('superuser')) {
				$this->Auth->deny('add');
			} else {
				$this->Auth->allow('add');
			}
		}
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
				case 'edit':
				// user can only edit details if:
				//	- own user and no permission granting (superuser, admin, approved)
				//  - superuser
				return $this->isOwnUser($request->id, $user['id'])
					&& $this->noPermissionGrants($request, $user['id']);
			case 'view':
			case 'delete':
				// user can be deleted/view by hims	elf or superusers
				return $this->request->getParam('id') === $user['id'];
			default:
				return parent::isAuthorized($user);
		}
	}

	private function isOwnUser($requestUserId, $userId)
	{
		return $this->request->getParam('id') === $userId
			&& $requestUserId === $userId;
	}

	private function noPermissionGrants($request, $userId) {
		$storedUser = $this->getStoredUser($userId);
		if ($request->superuser && !$storedUser->superuser) {
			return false;
		}
		return $this->checkProviderPermissionGrants($request->providers,$storedUser->providers);
	}

	private function getStoredUser($userId) {
		return $this->table()
			->find()
			->contain($this->contain())
			->where([
				$this->name . '.id' => $userId,
			])
			->first();
	}

	private function checkProviderPermissionGrants($requestProviders, $storedProviders) {
		if (!empty($requestProviders)) {
			foreach ($requestProviders as $requestProvider) {
				if($requestProvider->admin || $requestProvider->approved) {
					if (!empty($storedProviders)) {
						foreach($storedProviders as $storedProvider) {
							if($storedProvider->id === $requestProvider->id) {
								if (($requestProvider->approved && !$storedProvider->approved)
									|| ($requestProvider->admin && !$storedProvider->admin)) {
										return false;
								}
							}
						}
					} else {
						return false;
					}
				}
			}
		}
		return true;
	}

}
