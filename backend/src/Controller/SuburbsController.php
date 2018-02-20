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

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

}
