<?php
namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\Network\Exception\UnauthorizedException;
use Cake\Utility\Security;
use Firebase\JWT\JWT;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 *
 * @method \App\Model\Entity\User[] paginate($object = null, array $settings = [])
 */
class UsersController extends AppController
{

    public function initialize()
    {
        parent::initialize();
        $this->Auth->allow(['add','login']);
    }

    /**
     * Contain helper.
     *
     * @return array Contained models
     */
    protected function contain()
    {
        return [
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
            'username',
            'fullname',
            'phone'
        ];
    }

    /**
     * Add method
     *
     * @return \Cake\Http\Response|null Redirects on successful add, renders view otherwise.
     */
    public function add()
    {
        $request = json_decode($this->request->input(), true);



        // var_dump($user); exit;
        $this->data($this->table()->save(
            $this->table()->patchEntity(
                $this->table()->newEntity(),
                json_decode($this->request->input(), true),
                ['associated' => $this->contain()]
            )
        ));
    }


    /**
     * login method
     *
     * @return \Cake\Http\Response|void
     */
    public function login()
    {
        $user = $this->Auth->identify();
        if (!$user) {
            $this->viewBuilder()->className('Json');
            $this->set([
                'success' => false,
                'data' => null,
                '_serialize' => ['success', 'data']
            ]);
        } else {
            $this->viewBuilder()->className('Json');
            $this->set([
                'success' => true,
                'data' => $user,
                '_serialize' => ['success', 'data']
            ]);
        }
    }

    // public function isAuthorized($user = null)
    // {
    //     // Any registered user can access public functions
    //     if (!$this->request->getParam('prefix')) {
    //         return true;
    //     }

    //     // Only admins can access admin functions
    //     if ($this->request->getParam('prefix') === 'admin') {
    //         return (bool)($user['role'] === 'admin');
    //     }

    //     // Default deny
    //     return false;
    // }

}
