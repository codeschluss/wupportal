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
    /**
     * Contain helper.
     *
     * @return array Contained models
     */
    protected function contain() { return []; }

    /**
     * filter helper.
     *
     * @return array Fields to use for filter
     */
    protected function fieldsTofilter() { return []; }

    /**
     * @var array $paginate Paginator configuration
     */
    public $paginate;

    /**
     * Initialization hook method.
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();

        $this->loadComponent('RequestHandler');
    }

    /**
     * Before render callback.
     *
     * @param \Cake\Event\Event $event The beforeRender event.
     * @return \Cake\Http\Response|null|void
     */
    public function beforeRender(Event $event)
    {
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $query = $this->table()->find()->contain($this->contain());

        $this->data($query->all()->toArray());
    }

    /**
     * View method
     *
     * @param string|null $id Film id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $query = $this->table()->find()->contain($this->contain());
        $query->where([$this->name . '.id' => $id]);

        $this->data($query->first());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $this->data($this->table()->save(
            $this->table()->patchEntity(
                $this->table()->newEntity(),
                json_decode($this->request->input(), true),
                ['associated' => $this->contain()]
            )
        ));
    }

    /**
     * Edit method
     *
     * @param string|null $id Film id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id)
    {
        $this->data($this->table()->save(
            $this->table()->patchEntity(
                $this->table()->get($id, ['contain' => $this->contain()]),
                json_decode($this->request->input(), true),
                ['associated' => $this->contain()]
            )
        ));
    }

    /**
     * Delete method
     *
     * @param string|null $id Film id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id)
    {
        $this->data($this->table()->delete($this->table()->get($id)));
    }

    /**
     * Fetch method
     *
     * @return \Cake\Http\Response|void
     */
    public function list()
    {
        $query = $this->table()->find()->group($this->name . '.id');
        $request = $this->request->input('json_decode');
        if (is_null($request)) return;

        $this->paginate = [
            'limit' => $request->pageSize,
            'page' => $request->page,
        ];

        foreach ($this->contain() as $contain) {
            $query->leftJoinWith($contain)->contain($contain);
        }

        // foreach ($request->sorted as $sort) $query->group($sort->id)
        //     ->order([$sort->id => $sort->desc ? 'desc' : 'asc']);

        if (!empty($request->filter)) {
            $query->where(['OR' => function($exp, $q) use (&$field, &$request) {
                $whereClause = [];
                foreach ($this->fieldsTofilter() as $field) {
                    $whereClause[] = $field . ' LIKE "%' . $request->filter . '%" COLLATE utf8_general_ci';
                }
                return $whereClause;
            }]);
        }

        // var_dump($query); exit;

        $this->data($this->paginate($query));
    }

    /**
     * Data response helper.
     *
     * @return void
     */
    protected function data($response)
    {
        is_bool($response)
            ? $this->set('bool', $response)
            : $this->set('records', $response);

        if ($this->Paginator) $this->set('pages',
            $this->Paginator->getPagingParams()[$this->name]['pageCount']);

        if ($this->request->_matchedRoute === '/pdf/screenings/:id') {
            $this->viewBuilder()->className('CakePdf\View\PdfView');
        } else {
            $this->viewBuilder()->className('Json');
            $this->set('_serialize', true);
        }
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
}
