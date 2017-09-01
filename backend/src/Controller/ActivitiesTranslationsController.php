<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * ActivitiesTranslations Controller
 *
 * @property \App\Model\Table\ActivitiesTranslationsTable $ActivitiesTranslations
 *
 * @method \App\Model\Entity\ActivitiesTranslation[] paginate($object = null, array $settings = [])
 */
class ActivitiesTranslationsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Activities', 'Translations']
        ];
        $activitiesTranslations = $this->paginate($this->ActivitiesTranslations);

        $this->set(compact('activitiesTranslations'));
        $this->set('_serialize', ['activitiesTranslations']);
    }

    /**
     * View method
     *
     * @param string|null $id Activities Translation id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $activitiesTranslation = $this->ActivitiesTranslations->get($id, [
            'contain' => ['Activities', 'Translations']
        ]);

        $this->set('activitiesTranslation', $activitiesTranslation);
        $this->set('_serialize', ['activitiesTranslation']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $activitiesTranslation = $this->ActivitiesTranslations->newEntity();
        if ($this->request->is('post')) {
            $activitiesTranslation = $this->ActivitiesTranslations->patchEntity($activitiesTranslation, $this->request->getData());
            if ($this->ActivitiesTranslations->save($activitiesTranslation)) {
                $this->Flash->success(__('The activities translation has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities translation could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTranslations->Activities->find('list', ['limit' => 200]);
        $translations = $this->ActivitiesTranslations->Translations->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTranslation', 'activities', 'translations'));
        $this->set('_serialize', ['activitiesTranslation']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Activities Translation id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $activitiesTranslation = $this->ActivitiesTranslations->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $activitiesTranslation = $this->ActivitiesTranslations->patchEntity($activitiesTranslation, $this->request->getData());
            if ($this->ActivitiesTranslations->save($activitiesTranslation)) {
                $this->Flash->success(__('The activities translation has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities translation could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesTranslations->Activities->find('list', ['limit' => 200]);
        $translations = $this->ActivitiesTranslations->Translations->find('list', ['limit' => 200]);
        $this->set(compact('activitiesTranslation', 'activities', 'translations'));
        $this->set('_serialize', ['activitiesTranslation']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Activities Translation id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $activitiesTranslation = $this->ActivitiesTranslations->get($id);
        if ($this->ActivitiesTranslations->delete($activitiesTranslation)) {
            $this->Flash->success(__('The activities translation has been deleted.'));
        } else {
            $this->Flash->error(__('The activities translation could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
