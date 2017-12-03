<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Organisations Controller
 *
 * @property \App\Model\Table\OrganisationsTable $Organisations
 *
 * @method \App\Model\Entity\Organisation[] paginate($object = null, array $settings = [])
 */
class OrganisationsController extends AppController
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
            'Addresses',
            'Addresses.Suburbs'
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
            'Organisations.name',
            'Organisations.description',
            'Organisations.website',
            'Organisations.mail',
            'Organisations.phone',
            'Addresses.street',
            'Addresses.postal_code',
            'Addresses.place',
            'Suburbs.name'
        ];
    }

}
