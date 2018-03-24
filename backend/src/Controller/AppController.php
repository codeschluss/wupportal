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
use Cake\Network\Exception\ConflictException;
use \stdClass;

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

	/** @var array $paginate Paginator configuration */
	public $paginate;

	/**
	 * Initialization hook method.
	 * @return void
	 */
	public function initialize()
	{
		parent::initialize();
		$this->loadComponent('ResponseHandler');
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

	/** @return array associated models */
	protected function contain() { return []; }

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter() { return []; }

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
		$result = $this->table()->find()
			->contain($this->contain())
			->where([$this->name . '.id' => $id])
			->first();

		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name . '.id')
			: $this->ResponseHandler->responseSuccess($result);
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

		return $result->errors()
			? $this->ResponseHandler->responseError($result->errors())
			: $this->ResponseHandler->responseSuccess($this->table()->save($result));
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
		$result = $this->table()->patchEntity(
			$this->table()->get($id, ['contain' => $this->contain()]),
			json_decode($this->request->input(), true),
			['associated' => $this->contain()]
		);

		return $result->errors()
			? $this->ResponseHandler->responseError($result->errors())
			: $this->ResponseHandler->responseSuccess($this->table()->save($result));
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
		$result = $this->table()->delete($this->table()->get($id));

		// delete throws own not found exception
		return $this->ResponseHandler->responseSuccess('deleted');
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
		if (is_null($request)) return $this->ResponseHandler->responseError();

		$this->setPagination($request);
		$this->setJoins($query);
		$this->setSorting($query, $request);
		$this->setFiltering($query, $request);

		$result = $this->paginate($query)->toArray();
		return $this->ResponseHandler->isNotFoundError($result)
			? $this->ResponseHandler->responseNotFoundError($this->name)
			: $this->ResponseHandler->responseSuccess($this->createListResponse($query, $result));
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

	protected function createListResponse($query,$result) {
		$listResponse = new stdClass();
		$listResponse->records = $result;
		$listResponse->totalCount = $query->count();
		return $listResponse;
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

	protected function isApprovedProvider($userId, $providerId = null)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->isApprovedProvider($userId, $providerId);
	}

	protected function isOrgaAdminUser($ownUserId, $organisationId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->isOrgaAdminUser($ownUserId, $organisationId);
	}

	protected function isOrgaAdminProvider($userId, $providerId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->isOrgaAdminProvider($userId, $providerId,
			$this->getAdminOrganisationsQuery($userId));
	}

	protected function getProviderQuery($userId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->getProviderQuery($userId);
	}

	protected function getProviderOrganisationQuery($userId)
	{
		$providers = TableRegistry::get('Providers');
		return $providers->getProviderOrganisationQuery($userId,
			$this->getAdminOrganisationsQuery($userId));
	}

	protected function getAdminOrganisationsQuery($userId)
	{
		$organisations = TableRegistry::get('Organisations');
		return $organisations->getAdminOrganisationsQuery($userId);
	}
}
