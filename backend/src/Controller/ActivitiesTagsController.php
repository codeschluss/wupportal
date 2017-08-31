<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * ActivitiesTags Controller
 *
 * @property \App\Model\Table\ActivitiesTagsTable $ActivitiesTags
 *
 * @method \App\Model\Entity\ActivitiesTag[] paginate($object = null, array $settings = [])
 */
class ActivitiesTagsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Activities', 'Tags']
        ];
        $activitiesTags = $this->paginate($this->ActivitiesTags);

        $this->set(compact('activitiesTags'));
        $this->set('_serialize', ['activitiesTags']);
    }

    /**
     * View method
     *
     * @param string|null $id Activities Tag id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $activitiesTag = $this->ActivitiesTags->get($id, [
            'contain' => ['Activities', 'Tags']
        ]);

        $this->set('activitiesTag', $activitiesTag);
        $this->set('_serialize', ['activitiesTag']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $activitiesTag = $this->ActivitiesTags->newEntity();
        if ($this->request->is('post')) {
            $activitiesTag = $this->ActivitiesTags->patchEntity($activitiesTag, $this->request->getData());
            if ($this->ActivitiesTags->save($activitiesTag)) {
                $this->Flash->success(__('The activities tag has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities tag could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTags->Activities->find('list', ['limit' => 200]);
        $tags = $this->ActivitiesTags->Tags->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTag', 'activities', 'tags'));
        $this->set('_serialize', ['activitiesTag']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Activities Tag id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $activitiesTag = $this->ActivitiesTags->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $activitiesTag = $this->ActivitiesTags->patchEntity($activitiesTag, $this->request->getData());
            if ($this->ActivitiesTags->save($activitiesTag)) {
                $this->Flash->success(__('The activities tag has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities tag could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTags->Activities->find('list', ['limit' => 200]);
        $tags = $this->ActivitiesTags->Tags->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTag', 'activities', 'tags'));
        $this->set('_serialize', ['activitiesTag']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Activities Tag id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $activitiesTag = $this->ActivitiesTags->get($id);
        if ($this->ActivitiesTags->delete($activitiesTag)) {
            $this->Flash->success(__('The activities tag has been deleted.'));
        } else {
            $this->Flash->error(__('The activities tag could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
