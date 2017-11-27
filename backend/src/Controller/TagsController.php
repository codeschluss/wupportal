<?php
namespace App\Controller;

use App\Controller\AppController;

/**
 * Tags Controller
 *
 * @property \App\Model\Table\TagsTable $Tags
 *
 * @method \App\Model\Entity\Tag[] paginate($object = null, array $settings = [])
 */
class TagsController extends AppController
{

    /**
     * filter helper.
     *
     * @return array Fields to use for filter
     */
    protected function fieldsTofilter()
    {
        return [
            'name'
        ];
    }

}
