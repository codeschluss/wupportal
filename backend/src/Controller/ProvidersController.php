<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Providers Controller
 *
 * @property \App\Model\Table\ProvidersTable $Providers
 *
 * @method \App\Model\Entity\Provider[] paginate($object = null, array $settings = [])
 */
class ProvidersController extends AppController
{

	/**
	 * Contain helper.
	 *
	 * @return array Contained models
	 */
	public function contain()
	{
		return [
			'Users',
			'Organisations'
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

    public function getByUser()
    {
        $request = $this->request->input('json_decode');
        if (is_null($request)) return;
        if (!isset($request->user)) return;

        $query = $this->table()->find()->contain($this->contain());
        if (isset($request->admin)) {
            $query->where([$this->name . '.admin' => $request->admin]);
        }
        $this->setByUser($query, $request);
        $this->data($query->all()->toArray());
    }

    private function setByUser($query, $request) {
        $query->where([$this->name . '.user_id' => $request->user]);
    }


	public function getByOrganisation()
	{
		$request = $this->request->input('json_decode');
		if (is_null($request)) return;
		if (!isset($request->organisation)) return;

		if(isset($request->filter) || isset($request->sort)) {
			$query = $this->table()->find()->group($this->name . '.id');
			$this->setPagination($request);
			$this->setJoins($query);
			$this->setSorting($query, $request);
			$this->setFiltering($query, $request);
			$this->setByOrganisation($query, $request);
			$this->data($this->paginate($query));
		} else {
			$query = $this->table()->find()->contain($this->contain());
			$this->setByOrganisation($query, $request);
			$this->data($query->all()->toArray());
		}
	}

	private function setByOrganisation($query, $request)
	{
		$query->where([$this->name . '.organisation_id' => $request->organisation]);
	}

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['index', 'view', 'add', 'getByUser', 'getByOrganisation']);
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		$storedProvider = $this->getStoredProvider($user['id'], $request->organisation_id);

		switch ($this->request->getParam('action')) {
			case 'edit':
				// request is authorized when user:
				//	- is superuser
				//	- is admin of this provider organisation
				//	- is own user but only valid if user doesnt change
				//		from not approved to approved or not admin to admin
				if (($storedProvider !== null && !is_bool($storedProvider) && $storedProvider->admin)
						|| $this->validEditProvider($user, $request, $storedProvider)) {
					return true;
				}
				return false;
			case 'delete':
				return $request->user_id === $user['id'] || $storedProvider->admin;
			default:
				return parent::isAuthorized($user);
		}
	}

	private function getStoredProvider($userId, $organisationId)
	{
		$query = $this->table()->find()->contain($this->contain());
		$query->where([
			$this->name . '.user_id' => $userId,
			$this->name . '.organisation_id' => $organisationId
		]);
		return $query->first();
	}

	private function validEditProvider($user, $request, $storedProvider) {
		if ($user['id'] !== $request->user_id) {
			return false;
		}

		return (($request->approved && !$storedProvider->approved)
				|| ($request->admin && !$storedProvider->admin));
	}
}
