<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Recurrences Model
 *
 * @property \App\Model\Table\RecurrenceWeekDaysTable|\Cake\ORM\Association\HasMany $RecurrenceWeekDays
 * @property \App\Model\Table\SchedulesTable|\Cake\ORM\Association\HasMany $Schedules
 *
 * @method \App\Model\Entity\Recurrence get($primaryKey, $options = [])
 * @method \App\Model\Entity\Recurrence newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Recurrence[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Recurrence|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Recurrence patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Recurrence[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Recurrence findOrCreate($search, callable $callback = null, $options = [])
 */
class RecurrencesTable extends Table
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

        $this->setTable('recurrences');
        $this->setDisplayField('id');
        $this->setPrimaryKey('id');

        $this->belongsToMany('WeekDays', [
            'foreignKey' => 'recurrence_id',
            'targetForeignKey' => 'week_day_id',
            'joinTable' => 'recurrences_week_days'
        ]);

        // $this->hasMany('RecurrencesWeekDays', [
        //     'foreignKey' => 'recurrence_id'
        // ]);
        $this->hasMany('Schedules', [
            'foreignKey' => 'recurrence_id'
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
            ->integer('weekly_period')
            ->allowEmpty('weekly_period');

        $validator
            ->date('beginn_by')
            ->allowEmpty('beginn_by');

        $validator
            ->date('end_by')
            ->allowEmpty('end_by');

        return $validator;
    }
}
