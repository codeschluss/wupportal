<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Categories Controller
 *
 * @property \App\Model\Table\CategoriesTable $Categories
 *
 * @method \App\Model\Entity\Category[] paginate($object = null, array $settings = [])
 */
class CategoriesController extends AppController
{

	protected $DEFAULT_SORT = 'Categories.name';

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index']);
	}

	/** @return array Fields to use for filter  */
	protected function fieldsTofilter()
	{
		return [
			'name'
		];
	}

	/** @return array Fields to use to filter translations  */
	protected function fieldsTofilterTranslated()
	{
		return [
			$this->table()->translationField('name')
		];
	}

}
