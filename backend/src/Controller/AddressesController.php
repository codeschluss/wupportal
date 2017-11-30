<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Addresses Controller
 *
 * @property \App\Model\Table\AddressesTable $Addresses
 *
 * @method \App\Model\Entity\Address[] paginate($object = null, array $settings = [])
 */
class AddressesController extends AppController
{
 /**
     * Contain helper.
     *
     * @return array Contained models
     */
    protected function contain()
    {
        return [
            'Suburbs'
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
            'latitude',
            'longitude',
            'street',
            'postal_code',
            'place',
            'Suburbs.name'
        ];
    }



}
