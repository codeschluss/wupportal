<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * WeekDays Model
 *
 * @property \App\Model\Table\RecurrenceWeekDaysTable|\Cake\ORM\Association\HasMany $RecurrenceWeekDays
 *
 * @method \App\Model\Entity\WeekDay get($primaryKey, $options = [])
 * @method \App\Model\Entity\WeekDay newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\WeekDay[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\WeekDay|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\WeekDay patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\WeekDay[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\WeekDay findOrCreate($search, callable $callback = null, $options = [])
 */
class WeekDaysTable extends Table
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

        $this->setTable('week_days');
        $this->setDisplayField('name');
        $this->setPrimaryKey('id');

        // $this->hasMany('RecurrenceWeekDays', [
        //     'foreignKey' => 'week_day_id'
        // ]);

        $this->belongsToMany('Recurrences', [
            'foreignKey' => 'week_day_id',
            'targetForeignKey' => 'recurrence_id',
            'joinTable' => 'recurrences_week_days'
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
            ->uuid('name')
            ->allowEmpty('name');

        return $validator;
    }
}
