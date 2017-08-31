<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * ActivitiesTargetGroups Model
 *
 * @property \App\Model\Table\ActivitiesTable|\Cake\ORM\Association\BelongsTo $Activities
 * @property \App\Model\Table\TargetGroupsTable|\Cake\ORM\Association\BelongsTo $TargetGroups
 *
 * @method \App\Model\Entity\ActivitiesTargetGroup get($primaryKey, $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\ActivitiesTargetGroup findOrCreate($search, callable $callback = null, $options = [])
 */
class ActivitiesTargetGroupsTable extends Table
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

        $this->setTable('activities_target_groups');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Activities', [
            'foreignKey' => 'activity_id',
            'joinType' => 'INNER'
        ]);
        $this->belongsTo('TargetGroups', [
            'foreignKey' => 'target_group_id',
            'joinType' => 'INNER'
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
        $rules->add($rules->existsIn(['activity_id'], 'Activities'));
        $rules->add($rules->existsIn(['target_group_id'], 'TargetGroups'));

        return $rules;
    }
}
