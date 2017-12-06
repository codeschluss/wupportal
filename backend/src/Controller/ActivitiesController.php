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
     * Contain helper.
     *
     * @return array Contained models
     */
    protected function contain()
    {
        return [
            'Addresses',
            'Addresses.Suburbs',
            'Tags',
            'Categories',
            'TargetGroups',
            'Providers.Organisations',
            'Schedules',
            'Schedules.Recurrences.WeekDays',
        ];
    }

    /**
     * filter helper.
     *
     * @return array Fields to use for filter
     */
    protected function fieldsTofilter()
    {
        return [
            'Activities.name',
            'Activities.description',
            'Organisations.name',
            'Categories.name',
            'Tags.name',
            'Suburbs.name'
        ];
    }

    public function getByProviders()
    {
        // var_dump($request); exit;
        $query = $this->table()->find()->group($this->name . '.id');
        $request = $this->request->input('json_decode');
        if (is_null($request)) return;
        if (empty($request->providers)) return;

        $this->setPagination($request);
        $this->setJoins($query);
        $this->setSorting($query, $request);
        $this->setFiltering($query, $request);
        $this->setByProviders($query, $request);
        $this->data($this->paginate($query));
    }

    private function setByProviders($query, $request) {
        $query->where(['OR' => function($exp, $q) use (&$field, &$request) {
            $whereClause = [];
            foreach ($request->providers as $provider) {
                $whereClause[] = ['Providers.id' => $provider];
            }
            return $whereClause;
        }]);
    }

}
