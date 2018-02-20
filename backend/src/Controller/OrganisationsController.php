<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Organisations Controller
 *
 * @property \App\Model\Table\OrganisationsTable $Organisations
 *
 * @method \App\Model\Entity\Organisation[] paginate($object = null, array $settings = [])
 */
class OrganisationsController extends AppController
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
				'Addresses.Suburbs'
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
			'Organisations.name',
			'Organisations.description',
			'Organisations.website',
			'Organisations.mail',
			'Organisations.phone',
			'Addresses.street',
			'Addresses.postal_code',
			'Addresses.place',
			'Suburbs.name'
		];
	}

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['list','view', 'index']);
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		$storedProvider = $this->getStoredProvider($user['id'], $request->id);

		switch ($this->request->getParam('action')) {
			case 'edit':
				// request is authorized when user is admin of this organisation
				return ($storedProvider !== null
					&& !is_bool($storedProvider)
					&& $storedProvider->admin);
			case 'delete':
				return $storedProvider->admin;
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
}
