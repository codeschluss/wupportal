<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Configurations Controller
 *
 * @property \App\Model\Table\ConfigurationsTable $Configurations
 *
 * @method \App\Model\Entity\Configuration[] paginate($object = null, array $settings = [])
 */
class ConfigurationsController extends AppController
{

	protected $DEFAULT_SORT = 'Configurations.item';

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

}
