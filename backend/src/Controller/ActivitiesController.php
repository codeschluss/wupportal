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
     * Initialization hook method.
     *
     * @return void
     */
    public function initialize()
    {
        parent::initialize();

        $this->Auth->allow(['filter', 'index', 'view']);
    }

    /**
     * Filter method
     *
     * @return \Cake\Http\Response|void
     */
    public function filter()
    {
        $params = array_map(function($value) {
            return preg_split('@;@', $value, NULL, PREG_SPLIT_NO_EMPTY);
        }, array_intersect_key($this->request->getQueryParams(), array_flip([
            'keyword', 'organisations', 'suburbs', 'tags', 'target_groups'
        ])));

        if (empty($params)) return;

        $query = $this->Activities->find()
            ->leftJoinWith('Categories')
            ->leftJoinWith('Addresses.Suburbs')
            ->leftJoinWith('Providers.Organisations')
            ->leftJoinWith('TargetGroups')
            ->leftJoinWith('Tags')
            ->contain([
                'Categories',
                'Addresses.Suburbs',
                'Providers.Organisations',
                'Providers.Users',
                'Tags',
                'TargetGroups'
            ])->group('Activities.id');

        if (array_key_exists('keyword', $params)) {
            $ci = 'COLLATE utf8_general_ci';
            $keyword = current($params['keyword']);
            $query->where(['OR' => [
                'Activities.name LIKE "%' . $keyword . '%"' . $ci,
                'Activities.description LIKE "%' . $keyword . '%"' . $ci,
                'Categories.name LIKE "%' . $keyword . '%"' . $ci,
                'Categories.description LIKE "%' . $keyword . '%"' . $ci,
                'Addresses.street LIKE "%' . $keyword . '%"' . $ci,
                'Organisations.name LIKE "%' . $keyword . '%"' . $ci,
                'Organisations.description LIKE "%' . $keyword . '%"' . $ci,
                'Suburbs.name LIKE "%' . $keyword . '%"' . $ci,
                'Tags.name LIKE "%' . $keyword . '%"' . $ci,
                'Tags.description LIKE "%' . $keyword . '%"' . $ci,
                'TargetGroups.name LIKE "%' . $keyword . '%"' . $ci,
                'TargetGroups.description LIKE "%' . $keyword . '%"' . $ci
            ]]);
        }

        if (array_key_exists('categories', $params))
            foreach ($params['categories'] as $id)
                $query->where(['Categories.id' => $id]);

        if (array_key_exists('organisations', $params))
            foreach ($params['organisations'] as $id)
                $query->where(['Organisations.id' => $id]);

        if (array_key_exists('suburbs', $params))
            foreach ($params['suburbs'] as $id)
                $query->where(['Suburbs.id' => $id]);

        if (array_key_exists('tags', $params))
            foreach ($params['tags'] as $id)
                $query->where(['Tags.id' => $id]);

        if (array_key_exists('target_groups', $params))
            foreach ($params['target_groups'] as $id)
                $query->where(['TargetGroups.id' => $id]);

        $this->set($this->processQuery($query));
    }

    /**
     * Index method
     *
     * @return \Cake\Http\Response|void
     */
    public function index()
    {
        $query = $this->Activities->find()->contain([
                'Categories',
                'Addresses.Suburbs',
                'Providers.Organisations',
                'Providers.Users',
                'TargetGroups',
                'Tags'
            ]);

        $this->set($this->processQuery($query));
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
        $query = $this->Activities->get($id)->contain([
                'Categories',
                'Addresses.Suburbs',
                'Providers.Organisations',
                'Providers.Users',
                'TargetGroups',
                'Tags'
            ]);

        $this->set($this->processQuery($query));
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    // public function add()
    // {
    //     $activity = $this->Activities->newEntity();
    //     if ($this->request->is('post')) {
    //         $activity = $this->Activities->patchEntity($activity, $this->request->getData());
    //         if ($this->Activities->save($activity)) {
    //             $this->Flash->success(__('The activity has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The activity could not be saved. Please, try again.'));
    //     }
    //     $addresses = $this->Activities->Addresses->find('list', ['limit' => 200]);
    //     $providers = $this->Activities->Providers->find('list', ['limit' => 200]);
    //     $categories = $this->Activities->Categories->find('list', ['limit' => 200]);
    //     $tags = $this->Activities->Tags->find('list', ['limit' => 200]);
    //     $targetGroups = $this->Activities->TargetGroups->find('list', ['limit' => 200]);
    //     $translations = $this->Activities->Translations->find('list', ['limit' => 200]);
    //     $this->set(compact('activity', 'addresses', 'providers', 'categories', 'tags', 'targetGroups', 'translations'));
    //     $this->set('_serialize', ['activity']);
    // }

    /**
     * Edit method
     *
     * @param string|null $id Activity id.
     * @return \Cake\Http\Response|null Redirects on successful edit, renders view otherwise.
     * @throws \Cake\Network\Exception\NotFoundException When record not found.
     */
    // public function edit($id = null)
    // {
    //     $activity = $this->Activities->get($id, [
    //         'contain' => ['Tags', 'TargetGroups', 'Translations']
    //     ]);
    //     if ($this->request->is(['patch', 'post', 'put'])) {
    //         $activity = $this->Activities->patchEntity($activity, $this->request->getData());
    //         if ($this->Activities->save($activity)) {
    //             $this->Flash->success(__('The activity has been saved.'));
    //
    //             return $this->redirect(['action' => 'index']);
    //         }
    //         $this->Flash->error(__('The activity could not be saved. Please, try again.'));
    //     }
    //     $addresses = $this->Activities->Addresses->find('list', ['limit' => 200]);
    //     $providers = $this->Activities->Providers->find('list', ['limit' => 200]);
    //     $categories = $this->Activities->Categories->find('list', ['limit' => 200]);
    //     $tags = $this->Activities->Tags->find('list', ['limit' => 200]);
    //     $targetGroups = $this->Activities->TargetGroups->find('list', ['limit' => 200]);
    //     $translations = $this->Activities->Translations->find('list', ['limit' => 200]);
    //     $this->set(compact('activity', 'addresses', 'providers', 'categories', 'tags', 'targetGroups', 'translations'));
    //     $this->set('_serialize', ['activity']);
    // }

    /**
     * Delete method
     *
     * @param string|null $id Activity id.
     * @return \Cake\Http\Response|null Redirects to index.
     * @throws \Cake\Datasource\Exception\RecordNotFoundException When record not found.
     */
    // public function delete($id = null)
    // {
    //     $this->request->allowMethod(['post', 'delete']);
    //     $activity = $this->Activities->get($id);
    //     if ($this->Activities->delete($activity)) {
    //         $this->Flash->success(__('The activity has been deleted.'));
    //     } else {$query =
    //         $this->Flash->error(__('The activity could not be deleted. Please, try again.'));
    //     }
    //
    //     return $this->redirect(['action' => 'index']);
    // }

    /**
     * Process query helper method
     *
     * @param \Cake\ORM\Query $query The query to hide the user from.
     */
    private function processQuery($query)
    {
        if ($this->Auth->user()) return $query->toArray();

        return $query->map(function($r) {
            if (!$r['show_user']) {
                $r['provider']['user'] = null;
                $r['provider']['user_id'] = null;
            }
            return $r;
        })->toArray();
    }
}
