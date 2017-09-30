<?php
namespace App\Controller\Component;

use Cake\Controller\Component;
use Cake\Controller\ComponentRegistry;

/**
 * Syncronize component
 */
class SyncronizeComponent extends Component
{
    /**
     * Get method
     *
     * @param string $modelClass The model class to syncronize.
     * @param int $since Timestamp for syncronization.
     * @return \Cake\Datasource\ResultSetInterface Query results
     */
    public function get(string $modelClass, int $since)
    {
        $controller = $this->_registry->getController();
        $model = $controller->{$modelClass};

        $records = $model->find('all', [ 'conditions' => [
            'modified >' => $since
        ]]);

        $controller->set(strtolower($modelClass), $records);
        $controller->set('_serialize', strtolower($modelClass));
    }
}
