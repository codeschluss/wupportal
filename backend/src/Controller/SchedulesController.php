<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Schedules Controller
 *
 * @property \App\Model\Table\SchedulesTable $Schedules
 *
 * @method \App\Model\Entity\Schedule[] paginate($object = null, array $settings = [])
 */
class SchedulesController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['list','view', 'index']);
    }


    /**
     * Contain helper.
     *
     * @return array Contained models
     */
    protected function contain()
    {
        return [
            'Recurrences',
        ];
    }

}
