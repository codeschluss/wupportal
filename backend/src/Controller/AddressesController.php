<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Addresses Controller
 *
 * @property \App\Model\Table\AddressesTable $Addresses
 *
 * @method \App\Model\Entity\Address[] paginate($object = null, array $settings = [])
 */
class AddressesController extends AppController
{

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

	/** @return array associated models */
	protected function contain()
	{
		return [
				'Suburbs'
		];
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'latitude',
			'longitude',
			'street',
			'postal_code',
			'place',
			'Suburbs.name'
		];
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		$request = $this->request->input('json_decode');
		switch ($this->request->getParam('action')) {
			case 'add':
				return $this->isApprovedProvider($user['id']);
			default:
				return parent::isAuthorized($user);
		}
	}


}
