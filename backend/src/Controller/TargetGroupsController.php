<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * TargetGroups Controller
 *
 * @property \App\Model\Table\TargetGroupsTable $TargetGroups
 *
 * @method \App\Model\Entity\TargetGroup[] paginate($object = null, array $settings = [])
 */
class TargetGroupsController extends AppController
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
        $query = $this->Tags->find();

        $this->set($query->toArray());
    }

    /**
     * View method
     *
     * @param string|null $id Target Group id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $query = $this->Tags->get($id);

        $this->set($query->toArray());
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    // public function add()
    // {
    //     $targetGroup = $this->TargetGroups->newEntity();
    //     if ($this->request->is('post')) {
    //         $targetGroup = $this->TargetGroups->patchEntity($targetGroup, $this->request->getData());
    //         if ($this->TargetGroups->save($targetGroup)) {
    //             $this->Flash->success(__('The target group has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The target group could not be saved. Please, try again.'));
    //     }
    //     $activities = $this->TargetGroups->Activities->find('list', ['limit' => 200]);
    //     $this->set(compact('targetGroup', 'activities'));
    //     $this->set('_serialize', ['targetGroup']);
    // }

    /**
     * Edit method
     *
     * @param string|null $id Target Group id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    // public function edit($id = null)
    // {
    //     $targetGroup = $this->TargetGroups->get($id, [
    //         'contain' => ['Activities']
    //     ]);
    //     if ($this->request->is(['patch', 'post', 'put'])) {
    //         $targetGroup = $this->TargetGroups->patchEntity($targetGroup, $this->request->getData());
    //         if ($this->TargetGroups->save($targetGroup)) {
    //             $this->Flash->success(__('The target group has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The target group could not be saved. Please, try again.'));
    //     }
    //     $activities = $this->TargetGroups->Activities->find('list', ['limit' => 200]);
    //     $this->set(compact('targetGroup', 'activities'));
    //     $this->set('_serialize', ['targetGroup']);
    // }

    /**
     * Delete method
     *
     * @param string|null $id Target Group id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function delete($id = null)
    // {
    //     $this->request->allowMethod(['post', 'delete']);
    //     $targetGroup = $this->TargetGroups->get($id);
    //     if ($this->TargetGroups->delete($targetGroup)) {
    //         $this->Flash->success(__('The target group has been deleted.'));
    //     } else {
    //         $this->Flash->error(__('The target group could not be deleted. Please, try again.'));
    //     }
    //
    //     return $this->redirect(['action' => 'index']);
    // }
}
