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

    /**
     * Initialization hook method.
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();

        $this->Auth->allow(['index', 'view']);
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $query = $this->Suburbs->find();

        $this->set($query->toArray());
    }

    /**
     * View method
     *
     * @param string|null $id Suburb id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $query = $this->Suburbs->get($id);

        $this->set($query->toArray());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    // public function add()
    // {
    //     $suburb = $this->Suburbs->newEntity();
    //     if ($this->request->is('post')) {
    //         $suburb = $this->Suburbs->patchEntity($suburb, $this->request->getData());
    //         if ($this->Suburbs->save($suburb)) {
    //             $this->Flash->success(__('The suburb has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The suburb could not be saved. Please, try again.'));
    //     }
    //     $this->set(compact('suburb'));
    //     $this->set('_serialize', ['suburb']);
    // }

    /**
     * Edit method
     *
     * @param string|null $id Suburb id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    // public function edit($id = null)
    // {
    //     $suburb = $this->Suburbs->get($id, [
    //         'contain' => []
    //     ]);
    //     if ($this->request->is(['patch', 'post', 'put'])) {
    //         $suburb = $this->Suburbs->patchEntity($suburb, $this->request->getData());
    //         if ($this->Suburbs->save($suburb)) {
    //             $this->Flash->success(__('The suburb has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The suburb could not be saved. Please, try again.'));
    //     }
    //     $this->set(compact('suburb'));
    //     $this->set('_serialize', ['suburb']);
    // }

    /**
     * Delete method
     *
     * @param string|null $id Suburb id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function delete($id = null)
    // {
    //     $this->request->allowMethod(['post', 'delete']);
    //     $suburb = $this->Suburbs->get($id);
    //     if ($this->Suburbs->delete($suburb)) {
    //         $this->Flash->success(__('The suburb has been deleted.'));
    //     } else {
    //         $this->Flash->error(__('The suburb could not be deleted. Please, try again.'));
    //     }
    //
    //     return $this->redirect(['action' => 'index']);
    // }
}
