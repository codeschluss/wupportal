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
			$this->Auth->allow(['add','login']);
	}

	public function isAuthorized($user)
	{
		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
			case 'edit':
				// users can only view details of themselves
				return $this->isOwnUser($request->id,$user);
			case 'view':
				// users can only view details of themselves
				return $this->request->getParam('id') === $user['id'];
			case 'delete':
				// user can be deleted by himself or superusers
				return $this->isSuperuser($user) || $this->isOwnUser($request->id,$user);
			default:
				return parent::isAuthorized($user);
		}
	}

	protected function isOwnUser($requestUserId, $user)
	{
		return $this->request->getParam('id') === $user['id']
			&& $requestUserId === $user['id'];
	}

}
