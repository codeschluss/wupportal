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
        $query = $this->Configurations->find();

        $this->set($query->toArray());
    }

    /**
     * View method
     *
     * @param string|null $id Configuration id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $query = $this->Configurations->get($id);

        $this->set($query->toArray());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    // public function add()
    // {
    //     $configuration = $this->Configurations->newEntity();
    //     if ($this->request->is('post')) {
    //         $configuration = $this->Configurations->patchEntity($configuration, $this->request->getData());
    //         if ($this->Configurations->save($configuration)) {
    //             $this->Flash->success(__('The configuration has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The configuration could not be saved. Please, try again.'));
    //     }
    //     $this->set(compact('configuration'));
    //     $this->set('_serialize', ['configuration']);
    // }

    /**
     * Edit method
     *
     * @param string|null $id Configuration id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    // public function edit($id = null)
    // {
    //     $configuration = $this->Configurations->get($id, [
    //         'contain' => []
    //     ]);
    //     if ($this->request->is(['patch', 'post', 'put'])) {
    //         $configuration = $this->Configurations->patchEntity($configuration, $this->request->getData());
    //         if ($this->Configurations->save($configuration)) {
    //             $this->Flash->success(__('The configuration has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The configuration could not be saved. Please, try again.'));
    //     }
    //     $this->set(compact('configuration'));
    //     $this->set('_serialize', ['configuration']);
    // }

    /**
     * Delete method
     *
     * @param string|null $id Configuration id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function delete($id = null)
    // {
    //     $this->request->allowMethod(['post', 'delete']);
    //     $configuration = $this->Configurations->get($id);
    //     if ($this->Configurations->delete($configuration)) {
    //         $this->Flash->success(__('The configuration has been deleted.'));
    //     } else {
    //         $this->Flash->error(__('The configuration could not be deleted. Please, try again.'));
    //     }
    //
    //     return $this->redirect(['action' => 'index']);
    // }
}
