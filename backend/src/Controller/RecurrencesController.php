<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Recurrences Controller
 *
 * @property \App\Model\Table\RecurrencesTable $Recurrences
 *
 * @method \App\Model\Entity\Recurrence[] paginate($object = null, array $settings = [])
 */
class RecurrencesController extends AppController
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
            'RecurrencesWeekDays.WeekDays',
        ];
    }
}
