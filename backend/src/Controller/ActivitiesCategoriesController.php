<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * ActivitiesCategories Controller
 *
 * @property \App\Model\Table\ActivitiesCategoriesTable $ActivitiesCategories
 *
 * @method \App\Model\Entity\ActivitiesCategory[] paginate($object = null, array $settings = [])
 */
class ActivitiesCategoriesController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $this->paginate = [
            'contain' => ['Activities', 'Categories']
        ];
        $activitiesCategories = $this->paginate($this->ActivitiesCategories);

        $this->set(compact('activitiesCategories'));
        $this->set('_serialize', ['activitiesCategories']);
    }

    /**
     * View method
     *
     * @param string|null $id Activities Category id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $activitiesCategory = $this->ActivitiesCategories->get($id, [
            'contain' => ['Activities', 'Categories']
        ]);

        $this->set('activitiesCategory', $activitiesCategory);
        $this->set('_serialize', ['activitiesCategory']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $activitiesCategory = $this->ActivitiesCategories->newEntity();
        if ($this->request->is('post')) {
            $activitiesCategory = $this->ActivitiesCategories->patchEntity($activitiesCategory, $this->request->getData());
            if ($this->ActivitiesCategories->save($activitiesCategory)) {
                $this->Flash->success(__('The activities category has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities category could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesCategories->Activities->find('list', ['limit' => 200]);
        $categories = $this->ActivitiesCategories->Categories->find('list', ['limit' => 200]);
        $this->set(compact('activitiesCategory', 'activities', 'categories'));
        $this->set('_serialize', ['activitiesCategory']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Activities Category id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $activitiesCategory = $this->ActivitiesCategories->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $activitiesCategory = $this->ActivitiesCategories->patchEntity($activitiesCategory, $this->request->getData());
            if ($this->ActivitiesCategories->save($activitiesCategory)) {
                $this->Flash->success(__('The activities category has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The activities category could not be saved. Please, try again.'));
        }
        $activities = $this->ActivitiesCategories->Activities->find('list', ['limit' => 200]);
        $categories = $this->ActivitiesCategories->Categories->find('list', ['limit' => 200]);
        $this->set(compact('activitiesCategory', 'activities', 'categories'));
        $this->set('_serialize', ['activitiesCategory']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Activities Category id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $activitiesCategory = $this->ActivitiesCategories->get($id);
        if ($this->ActivitiesCategories->delete($activitiesCategory)) {
            $this->Flash->success(__('The activities category has been deleted.'));
        } else {
            $this->Flash->error(__('The activities category could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
