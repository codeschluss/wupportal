<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Organisations Model
 *
 * @property \App\Model\Table\AddressesTable|\Cake\ORM\Association\BelongsTo $Addresses
 * @property \App\Model\Table\ProvidersTable|\Cake\ORM\Association\HasMany $Providers
 *
 * @method \App\Model\Entity\Organisation get($primaryKey, $options = [])
 * @method \App\Model\Entity\Organisation newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Organisation[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Organisation|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Organisation patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Organisation[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Organisation findOrCreate($search, callable $callback = null, $options = [])
 */
class OrganisationsTable extends Table
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

        $this->setTable('organisations');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        $this->belongsTo('Addresses', [
            'foreignKey' => 'address_id'
        ]);
        $this->hasMany('Providers', [
            'foreignKey' => 'organisation_id'
        ]);
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
            ->requirePresence('name', 'create')
            ->notEmpty('name');

        $validator
            ->allowEmpty('description');

        $validator
            ->allowEmpty('website');

        $validator
            ->allowEmpty('mail');

        $validator
            ->allowEmpty('phone');

        $validator
            ->allowEmpty('image');

        return $validator;
    }

    /**
     * Returns a rules checker object that will be used for validating
     * application integrity.
     *
     * @param \Cake\ORM\RulesChecker $rules The rules object to be modified.
     * @return \Cake\ORM\RulesChecker
     */
    public function buildRules(RulesChecker $rules)
    {
        $rules->add($rules->existsIn(['address_id'], 'Addresses'));

        return $rules;
    }
}
