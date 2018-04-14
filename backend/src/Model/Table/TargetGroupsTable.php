<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * TargetGroups Model
 *
 * @property \App\Model\Table\ActivitiesTable|\Cake\ORM\Association\BelongsToMany $Activities
 *
 * @method \App\Model\Entity\TargetGroup get($primaryKey, $options = [])
 * @method \App\Model\Entity\TargetGroup newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\TargetGroup[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\TargetGroup|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\TargetGroup patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\TargetGroup[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\TargetGroup findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class TargetGroupsTable extends Table
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

		$this->setTable('target_groups');
		$this->setDisplayField('name');
		$this->setPrimaryKey('id');

		$this->addBehavior('Timestamp');

		$this->belongsToMany('Activities', [
			'foreignKey' => 'target_group_id',
			'targetForeignKey' => 'activity_id',
			'joinTable' => 'activities_target_groups'
		]);

		$this->addBehavior('Translate', ['fields' => ['name']]);
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
			->scalar('name')
			->requirePresence('name', 'create')
			->notEmpty('name')
			->add('name', 'unique', ['rule' => 'validateUnique', 'provider' => 'table']);

		$validator
			->scalar('description')
			->allowEmpty('description');

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
		$rules->add($rules->isUnique(['name']));

		return $rules;
	}
}
