<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Configitems Model
 *
 * @method \App\Model\Entity\Configitem get($primaryKey, $options = [])
 * @method \App\Model\Entity\Configitem newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Configitem[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Configitem|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Configitem patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Configitem[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Configitem findOrCreate($search, callable $callback = null, $options = [])
 */
class ConfigitemsTable extends Table
{

    /**
     * Initialize method
     *
     * @param array $config The configuration for the Table.
     * @return void
     */
    public function initialize(array $config)
    {
        parent::initialize($config);

        $this->setTable('configitems');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');
    }

    /**
     * Default validation rules.
     *
     * @param \Cake\Validation\Validator $validator Validator instance.
     * @return \Cake\Validation\Validator
     */
    public function validationDefault(Validator $validator)
    {
        $validator
            ->uuid('id')
            ->allowEmpty('id', 'create');

        $validator
            ->scalar('item')
            ->requirePresence('item', 'create')
            ->notEmpty('item');

        $validator
            ->scalar('value')
            ->requirePresence('value', 'create')
            ->notEmpty('value');

        return $validator;
    }
}
