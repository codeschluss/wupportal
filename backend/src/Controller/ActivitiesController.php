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
                'Providers.Organisations'
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

}
