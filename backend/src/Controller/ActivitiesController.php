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
                'Schedules.Recurrences'
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
                'Activities.schedule',
                'Organisations.name',
                'Categories.name',
                'Tags.name',
                'Suburbs.name'
            ];
        }

        /**
         * getByProvider TODO: Duplicate code
         *
         */
        public function getByProviders()
        {
            // var_dump($request); exit;
            $query = $this->table()->find()->group($this->name . '.id');
            $request = $this->request->input('json_decode');
            if (is_null($request)) return;
            if (empty($request->providers)) return;

            $this->paginate = [
                'limit' => $request->pageSize,
                'page' => $request->page,
            ];

            foreach ($this->contain() as $contain) {
                $query->leftJoinWith($contain)->contain($contain);
            }

            if (!empty($request->sort->direction)) {
                $query
                    ->group($request->sort->active)
                    ->order([$request->sort->active => $request->sort->direction]);
            }

            $query->where(['OR' => function($exp, $q) use (&$field, &$request) {
                $whereClause = [];
                foreach ($request->providers as $provider) {
                    $whereClause[] = ['Providers.id' => $provider];
                }
                return $whereClause;
            }]);

            if (!empty($request->filter)) {
                $query->where(['OR' => function($exp, $q) use (&$field, &$request) {
                    $whereClause = [];
                    foreach ($this->fieldsTofilter() as $field) {
                        $whereClause[] = $field . ' LIKE "%' . $request->filter . '%" COLLATE utf8_general_ci';
                    }
                    return $whereClause;
                }]);
            }

            $this->data($this->paginate($query));
        }

}
