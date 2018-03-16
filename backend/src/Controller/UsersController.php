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

	/**
	 * Contain helper.
	 *
	 * @return array Contained models
	 */
	public function contain()
	{
			return [
					'Providers.Organisations'
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
					'Users.username',
					'Users.fullname',
					'Users.phone'
			];
	}

	/**
	 * Add method
	 *
	 * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
	 */
	public function add()
	{
			$request = json_decode($this->request->input(), true);

			// var_dump($user); exit;
			$this->data($this->table()->save(
					$this->table()->patchEntity(
							$this->table()->newEntity(),
							json_decode($this->request->input(), true),
							['associated' => $this->contain()]
					)
			));
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
					$this->viewBuilder()->className('Json');
					$this->set([
							'success' => false,
							'data' => null,
							'_serialize' => ['success', 'data']
					]);
			} else {
					$query = $this->table()->find()->contain($this->contain());
					$query->where(['Users.id' => $user['id']]);
					$result = $query->first();
					$this->viewBuilder()->className('Json');
					$this->set([
							'success' => true,
							'data' => $result,
							'_serialize' => ['success', 'data']
					]);
			}
	}

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['login']);
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
				// user can be deleted/view by himself or superusers
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
