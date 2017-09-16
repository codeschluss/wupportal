<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Activities Controller
 *
 * @property \App\Model\Table\ActivitiesTable $Activities
 *
 * @method \App\Model\Entity\Activity[] paginate($object = null, array $settings = [])
 */
class ActivitiesController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Addresses', 'Providers' => ['Organisations'], 'Categories', 'TargetGroups', 'Tags']
        ];
        $activities = $this->paginate($this->Activities);

        $this->set(compact('activities'));
        $this->set('_serialize', ['activities']);
    }

    /**
     * View method
     *
     * @param string|null $id Activity id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $activity = $this->Activities->get($id, [
            'contain' => ['Addresses', 'Providers', 'Categories', 'Tags', 'TargetGroups', 'Translations']
        ]);

        $this->set('activity', $activity);
        $this->set('_serialize', ['activity']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $activity = $this->Activities->newEntity();
        if ($this->request->is('post')) {
            $activity = $this->Activities->patchEntity($activity, $this->request->getData());
            if ($this->Activities->save($activity)) {
                $this->Flash->success(__('The activity has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activity could not be saved. Please, try again.'));
        }
        $addresses = $this->Activities->Addresses->find('list', ['limit' => 200]);
        $providers = $this->Activities->Providers->find('list', ['limit' => 200]);
        $categories = $this->Activities->Categories->find('list', ['limit' => 200]);
        $tags = $this->Activities->Tags->find('list', ['limit' => 200]);
        $targetGroups = $this->Activities->TargetGroups->find('list', ['limit' => 200]);
        $translations = $this->Activities->Translations->find('list', ['limit' => 200]);
        $this->set(compact('activity', 'addresses', 'providers', 'categories', 'tags', 'targetGroups', 'translations'));
        $this->set('_serialize', ['activity']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Activity id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $activity = $this->Activities->get($id, [
            'contain' => ['Tags', 'TargetGroups', 'Translations']
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $activity = $this->Activities->patchEntity($activity, $this->request->getData());
            if ($this->Activities->save($activity)) {
                $this->Flash->success(__('The activity has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activity could not be saved. Please, try again.'));
        }
        $addresses = $this->Activities->Addresses->find('list', ['limit' => 200]);
        $providers = $this->Activities->Providers->find('list', ['limit' => 200]);
        $categories = $this->Activities->Categories->find('list', ['limit' => 200]);
        $tags = $this->Activities->Tags->find('list', ['limit' => 200]);
        $targetGroups = $this->Activities->TargetGroups->find('list', ['limit' => 200]);
        $translations = $this->Activities->Translations->find('list', ['limit' => 200]);
        $this->set(compact('activity', 'addresses', 'providers', 'categories', 'tags', 'targetGroups', 'translations'));
        $this->set('_serialize', ['activity']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Activity id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $activity = $this->Activities->get($id);
        if ($this->Activities->delete($activity)) {
            $this->Flash->success(__('The activity has been deleted.'));
        } else {
            $this->Flash->error(__('The activity could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
