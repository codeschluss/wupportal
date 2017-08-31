<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * ActivitiesTargetGroups Controller
 *
 * @property \App\Model\Table\ActivitiesTargetGroupsTable $ActivitiesTargetGroups
 *
 * @method \App\Model\Entity\ActivitiesTargetGroup[] paginate($object = null, array $settings = [])
 */
class ActivitiesTargetGroupsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Activities', 'TargetGroups']
        ];
        $activitiesTargetGroups = $this->paginate($this->ActivitiesTargetGroups);

        $this->set(compact('activitiesTargetGroups'));
        $this->set('_serialize', ['activitiesTargetGroups']);
    }

    /**
     * View method
     *
     * @param string|null $id Activities Target Group id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $activitiesTargetGroup = $this->ActivitiesTargetGroups->get($id, [
            'contain' => ['Activities', 'TargetGroups']
        ]);

        $this->set('activitiesTargetGroup', $activitiesTargetGroup);
        $this->set('_serialize', ['activitiesTargetGroup']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $activitiesTargetGroup = $this->ActivitiesTargetGroups->newEntity();
        if ($this->request->is('post')) {
            $activitiesTargetGroup = $this->ActivitiesTargetGroups->patchEntity($activitiesTargetGroup, $this->request->getData());
            if ($this->ActivitiesTargetGroups->save($activitiesTargetGroup)) {
                $this->Flash->success(__('The activities target group has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities target group could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTargetGroups->Activities->find('list', ['limit' => 200]);
        $targetGroups = $this->ActivitiesTargetGroups->TargetGroups->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTargetGroup', 'activities', 'targetGroups'));
        $this->set('_serialize', ['activitiesTargetGroup']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Activities Target Group id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $activitiesTargetGroup = $this->ActivitiesTargetGroups->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $activitiesTargetGroup = $this->ActivitiesTargetGroups->patchEntity($activitiesTargetGroup, $this->request->getData());
            if ($this->ActivitiesTargetGroups->save($activitiesTargetGroup)) {
                $this->Flash->success(__('The activities target group has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities target group could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTargetGroups->Activities->find('list', ['limit' => 200]);
        $targetGroups = $this->ActivitiesTargetGroups->TargetGroups->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTargetGroup', 'activities', 'targetGroups'));
        $this->set('_serialize', ['activitiesTargetGroup']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Activities Target Group id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $activitiesTargetGroup = $this->ActivitiesTargetGroups->get($id);
        if ($this->ActivitiesTargetGroups->delete($activitiesTargetGroup)) {
            $this->Flash->success(__('The activities target group has been deleted.'));
        } else {
            $this->Flash->error(__('The activities target group could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
