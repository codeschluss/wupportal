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
        $request = $this->request->input('json_decode');
        if (is_null($request)) return;
        if (!isset($request->organisation)) return;

        if(isset($request->filter) || isset($request->sort)) {
            $query = $this->table()->find()->group($this->name . '.id');
            $this->setPagination($request);
            $this->setJoins($query);
            $this->setSorting($query, $request);
            $this->setFiltering($query, $request);
            $this->setByOrganisation($query, $request);
            $this->data($this->paginate($query));
        } else {
            $query = $this->table()->find()->contain($this->contain());
            $this->setByOrganisation($query, $request);
            $this->data($query->all()->toArray());
        }
    }

    private function setByOrganisation($query, $request) {
        $query->where([$this->name . '.organisation_id' => $request->organisation]);
    }



}
