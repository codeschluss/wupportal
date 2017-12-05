<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Providers Controller
 *
 * @property \App\Model\Table\ProvidersTable $Providers
 *
 * @method \App\Model\Entity\Provider[] paginate($object = null, array $settings = [])
 */
class ProvidersController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['add','index', 'view']);
    }

    /**
     * Contain helper.
     *
     * @return array Contained models
     */
    public function contain()
    {
        return [
            'Users',
            'Organisations'
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
            'Users.username',
            'Users.fullname',
            'Users.phone'
        ];
    }


    public function getByOrganisation()
    {
        // var_dump($request); exit;
        $query = $this->table()->find()->group($this->name . '.id');
        $request = $this->request->input('json_decode');
        if (is_null($request)) return;
        if (is_null($request->organisation)) return;

        $this->setPagination($request);
        $this->setJoins($query);
        $this->setSorting($query, $request);
        $this->setFiltering($query, $request);
        $this->setByOrganisation($query, $request);
        $this->data($this->paginate($query));
    }

    private function setByOrganisation($query, $request) {
        $query->where([$this->name . '.organisation_id' => $request->organisation]);
    }



}
