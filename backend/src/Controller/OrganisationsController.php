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
        $query = $this->Organisations->find();

        $this->set($query->toArray());
    }

    /**
     * View method
     *
     * @param string|null $id Organisation id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $query = $this->Organisations->get($id);

        $this->set($query->toArray());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    // public function add()
    // {
    //     $organisation = $this->Organisations->newEntity();
    //     if ($this->request->is('post')) {
    //         $organisation = $this->Organisations->patchEntity($organisation, $this->request->getData());
    //         if ($this->Organisations->save($organisation)) {
    //             $this->Flash->success(__('The organisation has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The organisation could not be saved. Please, try again.'));
    //     }
    //     $addresses = $this->Organisations->Addresses->find('list', ['limit' => 200]);
    //     $this->set(compact('organisation', 'addresses'));
    //     $this->set('_serialize', ['organisation']);
    // }

    /**
     * Edit method
     *
     * @param string|null $id Organisation id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    // public function edit($id = null)
    // {
    //     $organisation = $this->Organisations->get($id, [
    //         'contain' => []
    //     ]);
    //     if ($this->request->is(['patch', 'post', 'put'])) {
    //         $organisation = $this->Organisations->patchEntity($organisation, $this->request->getData());
    //         if ($this->Organisations->save($organisation)) {
    //             $this->Flash->success(__('The organisation has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The organisation could not be saved. Please, try again.'));
    //     }
    //     $addresses = $this->Organisations->Addresses->find('list', ['limit' => 200]);
    //     $this->set(compact('organisation', 'addresses'));
    //     $this->set('_serialize', ['organisation']);
    // }

    /**
     * Delete method
     *
     * @param string|null $id Organisation id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function delete($id = null)
    // {
    //     $this->request->allowMethod(['post', 'delete']);
    //     $organisation = $this->Organisations->get($id);
    //     if ($this->Organisations->delete($organisation)) {
    //         $this->Flash->success(__('The organisation has been deleted.'));
    //     } else {
    //         $this->Flash->error(__('The organisation could not be deleted. Please, try again.'));
    //     }
    //
    //     return $this->redirect(['action' => 'index']);
    // }
}
