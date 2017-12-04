<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * RecurrencesWeekDays Model
 *
 * @property \App\Model\Table\RecurrencesTable|\Cake\ORM\Association\BelongsTo $Recurrences
 * @property \App\Model\Table\WeekDaysTable|\Cake\ORM\Association\BelongsTo $WeekDays
 *
 * @method \App\Model\Entity\RecurrencesWeekDay get($primaryKey, $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\RecurrencesWeekDay findOrCreate($search, callable $callback = null, $options = [])
 */
class RecurrencesWeekDaysTable extends Table
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

        $this->setTable('recurrences_week_days');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsTo('Recurrences', [
            'foreignKey' => 'recurrence_id'
        ]);
        $this->belongsTo('WeekDays', [
            'foreignKey' => 'week_day_id'
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
        $rules->add($rules->existsIn(['recurrence_id'], 'Recurrences'));
        $rules->add($rules->existsIn(['week_day_id'], 'WeekDays'));

        return $rules;
    }
}
