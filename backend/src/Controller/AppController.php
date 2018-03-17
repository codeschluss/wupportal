<?php
/**
 * CakePHP(tm) : Rapid Development Framework (https://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright Copyright (c) Cake Software Foundation, Inc. (https://cakefoundation.org)
 * @link      https://cakephp.org CakePHP(tm) Project
 * @since     0.2.9
 * @license   https://opensource.org/licenses/mit-license.php MIT License
 */
namespace App\Controller;

use Cake\Controller\Controller;
use Cake\Event\Event;
use Cake\ORM\TableRegistry;
use Cake\Core\Exception\Exception;

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @link https://book.cakephp.org/3.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller
{
	/**
	 * Contain helper.
	 *
	 * @return array Contained models
	 */
	protected function contain() { return []; }

	/**
	 * filter helper.
	 *
	 * @return array Fields to use for filter
	 */
	protected function fieldsTofilter() { return []; }

	/**
	 * @var array $paginate Paginator configuration
	 */
	public $paginate;

	/**
	 * Initialization hook method.
	 *
	 * @return void
	 */
	public function initialize()
	{
			parent::initialize();

			$this->loadComponent('RequestHandler');

			$this->loadComponent('Auth', [
				'authorize' => ['Controller'],
				'authenticate' => [
						'Basic' => [
								'fields' => [
										'username' => 'username',
										'password' => 'password'],
								'userModel' => 'Users'
						],
				],
				'storage' => 'Memory',
				'unauthorizedRedirect' => false,
				'loginAction' => false
			]);
	}

	/**
	 * Before render callback.
	 *
	 * @param \Cake\Event\Event $event The beforeRender event.
	 * @return \Cake\Http\Response|null|void
	 */
	public function beforeRender(Event $event)
	{
	}

	/**
	 * Index method
	 *
	 * @return \Cake\Http\Response|void
	 */
	public function index()
	{
			$query = $this->table()->find()->contain($this->contain());

			$this->data($query->all()->toArray());
	}

	/**
	 * View method
	 *
	 * @param string|null $id Entry id.
	 * @return \Cake\Http\Response|void
	 * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
	 */
	public function view($id = null)
	{
			$query = $this->table()->find()->contain($this->contain());
			$query->where([$this->name . '.id' => $id]);

			$this->data($query->first());
	}

	/**
	 * Add method
	 *
	 * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
	 */
	public function add()
	{
		$result = $this->table()->patchEntity(
			$this->table()->newEntity(),
			json_decode($this->request->input(), true),
			['associated' => $this->contain()]
		);

		if ($result->errors()) {
			return $this->handleError($result->errors());
		} else {
			$this->data($this->table()->save($result));
		}
	}

	/**
	 * Edit method
	 *
	 * @param string|null $id Entry id.
	 * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
	 * @throws \Cake\Network\Exception\NotFoundException When record not found.
	 */
	public function edit($id)
	{
			$this->data($this->table()->save(
					$this->table()->patchEntity(
							$this->table()->get($id, ['contain' => $this->contain()]),
							json_decode($this->request->input(), true),
							['associated' => $this->contain()]
					)
			));
	}

	/**
	 * Delete method
	 *
	 * @param string|null $id Entry id.
	 * @return \Cake\Http\Response|null Redirects to index.
	 * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
	 */
	public function delete($id)
	{
		$this->data($this->table()->delete($this->table()->get($id)));
	}

	/**
	 * Fetch method
	 *
	 * @return \Cake\Http\Response|void
	 */
	public function list()
	{
			// var_dump($request); exit;
			$query = $this->table()->find()->group($this->name . '.id');
			$request = $this->request->input('json_decode');
			if (is_null($request)) return;

			$this->setPagination($request);
			$this->setJoins($query);
			$this->setSorting($query, $request);
			$this->setFiltering($query, $request);
			$this->data($this->paginate($query));
			$this->setPaginagingResponse($query);
	}

	protected function setPagination($request)
	{
		$this->paginate = [
				'limit' => $request->pageSize,
				'page' => $request->page,
		];
	}

	protected function setJoins($query)
	{
			foreach ($this->contain() as $contain) {
					$query->leftJoinWith($contain)->contain($contain);
			}
	}

	protected function setSorting($query, $request)
	{
		if (!empty($request->sort->direction)) {
			$query
				->group($request->sort->active)
				->order([$request->sort->active => $request->sort->direction]);
			}
	}

	protected function setFiltering($query, $request)
	{
			if (!empty($request->filter)) {
					$query->where(['OR' => function($exp, $q) use (&$field, &$request) {
							$whereClause = [];
							foreach ($this->fieldsTofilter() as $field) {
									$whereClause[] = $field . ' LIKE "%' . $request->filter . '%" COLLATE utf8_general_ci';
							}
							return $whereClause;
					}]);
			}
	}

	/**
	 * Data response helper.
	 *
	 * @return void
	 */
	protected function data($response)
	{
		is_bool($response)
			? $this->set('bool', $response)
			: $this->set('records', $response);

		$this->viewBuilder()->className('Json');
		$this->set('_serialize', true);
	}

	protected function handleError($errors) {
		foreach ($errors as $error) {
			if (key($error) === 'unique') {
				$response = $this->response->withStatus(409);
				return $response;
			}
		}
	}

	protected function setPaginagingResponse($query)
	{
		if ($this->Paginator)
		{
			$this->set('pages',
				$this->Paginator->getPagingParams()[$this->name]['pageCount']);
		}
		$this->set('totalCount', $query->count());
	}

	/**
	 * Table helper.
	 *
	 * @return \Cake\ORM\Table
	 */
	protected function table()
	{
		return $this->{$this->name};
	}

	/*
		################### Authorization ##############
	*/

	public function isAuthorized($user)
	{
		// Admin can access every action and default deny if not
		return $this->isSuperuser($user);
	}

	protected function isSuperuser($user) {
		return isset($user['superuser']) && $user['superuser'];
	}

	protected function isApprovedProvider($userId)
	{
		$result = $this->getProviderQuery($userId)->first();
		return !empty($result);
	}

	protected function isOrgaAdminUser($ownUserId, $organisationId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers
			->exists([
				'user_id' => $ownUserId,
				'organisation_id' => $organisationId,
				'admin' => true
			]);
	}

	protected function isOrgaAdminProvider($userId, $providerId)
	{
		$organisationAdminSubquery = $this->getAdminOrganisationsQuery($userId);

		$providers = TableRegistry::get('Providers');
		$result = $providers->find()
		->select(['id'])
    ->where(function ($exp, $q) use ($organisationAdminSubquery) {
        return $exp->in('organisation_id', $organisationAdminSubquery);
		})
		->andWhere(['id' => $providerId])
		->first();

		return !empty($result);
	}

	protected function getProviderQuery($userId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->find()
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.approved' => true
			]);
	}

	protected function getProviderOrganisationQuery($userId)
	{
		$organisationAdminSubquery = $this->getAdminOrganisationsQuery($userId);

		$providers = TableRegistry::get('Providers');
		return $providers->find()
		->select(['id'])
    ->where(function ($exp, $q) use ($organisationAdminSubquery) {
        return $exp->in('organisation_id', $organisationAdminSubquery);
		});
	}

	protected function getAdminOrganisationsQuery($userId)
	{
		$organisations = TableRegistry::get('Organisations');
		return $organisations->find()
			->innerJoinWith('Providers')
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.admin' => true
			]);
	}
}
