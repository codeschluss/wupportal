<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Suburbs Controller
 *
 * @property \App\Model\Table\SuburbsTable $Suburbs
 *
 * @method \App\Model\Entity\Suburb[] paginate($object = null, array $settings = [])
 */
class SuburbsController extends AppController
{

	protected $DEFAULT_SORT = 'Suburbs.name';

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

	public function isAuthorized($user)
	{
		if ($this->isSuperuser($user)) return true;

		switch ($this->request->getParam('action')) {
			case 'add':
				return $this->isApprovedProvider($user['id']);
			default:
				return parent::isAuthorized($user);
		}
	}

}
