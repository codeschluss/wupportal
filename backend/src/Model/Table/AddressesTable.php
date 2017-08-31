<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Addresses Model
 *
 * @property \App\Model\Table\SuburbsTable|\Cake\ORM\Association\BelongsTo $Suburbs
 * @property \App\Model\Table\ActivitiesTable|\Cake\ORM\Association\HasMany $Activities
 * @property \App\Model\Table\OrganisationsTable|\Cake\ORM\Association\HasMany $Organisations
 * @property \App\Model\Table\UsersTable|\Cake\ORM\Association\HasMany $Users
 *
 * @method \App\Model\Entity\Address get($primaryKey, $options = [])
 * @method \App\Model\Entity\Address newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Address[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Address|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Address patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Address[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Address findOrCreate($search, callable $callback = null, $options = [])
 */
class AddressesTable extends Table
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

        $this->setTable('addresses');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Suburbs', [
            'foreignKey' => 'suburb_id'
        ]);
        $this->hasMany('Activities', [
            'foreignKey' => 'address_id'
        ]);
        $this->hasMany('Organisations', [
            'foreignKey' => 'address_id'
        ]);
        $this->hasMany('Users', [
            'foreignKey' => 'address_id'
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
            ->numeric('latitude')
            ->allowEmpty('latitude');

        $validator
            ->numeric('longitude')
            ->allowEmpty('longitude');

        $validator
            ->scalar('street')
            ->allowEmpty('street');

        $validator
            ->scalar('house_number')
            ->allowEmpty('house_number');

        $validator
            ->scalar('postal_code')
            ->allowEmpty('postal_code');

        $validator
            ->scalar('place')
            ->allowEmpty('place');

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
        $rules->add($rules->existsIn(['suburb_id'], 'Suburbs'));

        return $rules;
    }
}
