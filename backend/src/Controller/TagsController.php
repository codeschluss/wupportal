<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Tags Controller
 *
 * @property \App\Model\Table\TagsTable $Tags
 *
 * @method \App\Model\Entity\Tag[] paginate($object = null, array $settings = [])
 */
class TagsController extends AppController
{

	/**
	 * filter helper.
	 *
	 * @return array Fields to use for filter
	 */
	protected function fieldsTofilter()
	{
		return [
			'name'
		];
	}

	/**
	 * Add method
	 *
	 * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
	 */
	public function add()
	{
			// var_dump($user); exit;
			$request = $this->request->input('json_decode');
			$query = $this->table()->find()->contain($this->contain());
			$query->where([$this->name . '.name' => $request->name]);

			$result = $query->first();
			if ($result) {
					$this->data($result);
			} else {
					parent::add();
			}
	}

	public function initialize()
	{
		parent::initialize();
		$this->Auth->allow(['view','list', 'index', 'add']);
	}

}
