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

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['list','view', 'index']);
	}

	/** @return array associated models */
	protected function contain()
	{
		return [
				'Addresses',
				'Addresses.Suburbs'
		];
	}

	/** @return array Fields to use for filter  */
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

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		switch ($this->request->getParam('action')) {
			case 'edit':
				$request = $this->request->input('json_decode');
				return $request->id === $this->request->getParam('id')
					&& $this->isOrgaAdminUser($user['id'], $request->id);
			case 'delete':
				return $this->isOrgaAdminUser($user['id'], $this->request->getParam('id'));
			default:
				// add method
				return parent::isAuthorized($user);
		}
	}

}
