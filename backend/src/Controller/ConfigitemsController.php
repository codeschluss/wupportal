<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Configitems Controller
 *
 * @property \App\Model\Table\ConfigitemsTable $Configitems
 *
 * @method \App\Model\Entity\Configitem[] paginate($object = null, array $settings = [])
 */
class ConfigitemsController extends AppController
{

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $configitems = $this->paginate($this->Configitems);

        $this->set(compact('configitems'));
        $this->set('_serialize', ['configitems']);
    }

    /**
     * View method
     *
     * @param string|null $id Configitem id.
     * @return \Cake\Http\Response|void
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function view($id = null)
    {
        $configitem = $this->Configitems->get($id, [
            'contain' => []
        ]);

        $this->set('configitem', $configitem);
        $this->set('_serialize', ['configitem']);
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $configitem = $this->Configitems->newEntity();
        if ($this->request->is('post')) {
            $configitem = $this->Configitems->patchEntity($configitem, $this->request->getData());
            if ($this->Configitems->save($configitem)) {
                $this->Flash->success(__('The configitem has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The configitem could not be saved. Please, try again.'));
        }
        $this->set(compact('configitem'));
        $this->set('_serialize', ['configitem']);
    }

    /**
     * Edit method
     *
     * @param string|null $id Configitem id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    public function edit($id = null)
    {
        $configitem = $this->Configitems->get($id, [
            'contain' => []
        ]);
        if ($this->request->is(['patch', 'post', 'put'])) {
            $configitem = $this->Configitems->patchEntity($configitem, $this->request->getData());
            if ($this->Configitems->save($configitem)) {
                $this->Flash->success(__('The configitem has been saved.'));

                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The configitem could not be saved. Please, try again.'));
        }
        $this->set(compact('configitem'));
        $this->set('_serialize', ['configitem']);
    }

    /**
     * Delete method
     *
     * @param string|null $id Configitem id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    public function delete($id = null)
    {
        $this->request->allowMethod(['post', 'delete']);
        $configitem = $this->Configitems->get($id);
        if ($this->Configitems->delete($configitem)) {
            $this->Flash->success(__('The configitem has been deleted.'));
        } else {
            $this->Flash->error(__('The configitem could not be deleted. Please, try again.'));
        }

        return $this->redirect(['action' => 'index']);
    }
}
