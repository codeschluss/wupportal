<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Activities Model
 *
 * @property \App\Model\Table\AddressesTable|\Cake\ORM\Association\BelongsTo $Addresses
 * @property \App\Model\Table\ProvidersTable|\Cake\ORM\Association\BelongsTo $Providers
 * @property \App\Model\Table\CategoriesTable|\Cake\ORM\Association\BelongsTo $Categories
 * @property \App\Model\Table\SchedulesTable|\Cake\ORM\Association\HasMany $Schedules
 * @property \App\Model\Table\TagsTable|\Cake\ORM\Association\BelongsToMany $Tags
 * @property \App\Model\Table\TargetGroupsTable|\Cake\ORM\Association\BelongsToMany $TargetGroups
 * @property \App\Model\Table\TranslationsTable|\Cake\ORM\Association\BelongsToMany $Translations
 *
 * @method \App\Model\Entity\Activity get($primaryKey, $options = [])
 * @method \App\Model\Entity\Activity newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Activity[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Activity|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Activity patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Activity[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Activity findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ActivitiesTable extends Table
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

		$this->setTable('activities');
		$this->setDisplayField('name');
		$this->setPrimaryKey('id');

		$this->addBehavior('Timestamp');

		$this->belongsTo('Addresses', [
			'foreignKey' => 'address_id'
		]);
		$this->belongsTo('Providers', [
			'foreignKey' => 'provider_id',
			'joinType' => 'INNER'
		]);
		$this->belongsTo('Categories', [
			'foreignKey' => 'category_id',
			'joinType' => 'INNER'
		]);
		$this->hasMany('Schedules', [
			'foreignKey' => 'activity_id'
		]);
		$this->belongsToMany('Tags', [
			'foreignKey' => 'activity_id',
			'targetForeignKey' => 'tag_id',
			'joinTable' => 'activities_tags'
		]);
		$this->belongsToMany('TargetGroups', [
			'foreignKey' => 'activity_id',
			'targetForeignKey' => 'target_group_id',
			'joinTable' => 'activities_target_groups'
		]);
		$this->belongsToMany('Translations', [
			'foreignKey' => 'activity_id',
			'targetForeignKey' => 'translation_id',
			'joinTable' => 'activities_translations'
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
			->scalar('name')
			->requirePresence('name', 'create')
			->notEmpty('name');

		$validator
			->scalar('description')
			->allowEmpty('description');

		$validator
			->boolean('show_user')
			->requirePresence('show_user', 'create')
			->notEmpty('show_user');

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
		$rules->add($rules->existsIn(['provider_id'], 'Providers'));
		$rules->add($rules->existsIn(['category_id'], 'Categories'));

		return $rules;
	}

	/**
	 * check if the specified activity is owned by one of the provided providers
	 *
	 * @param $providers list or subquery for providers
	 * @param $activityId activity ID of the activity to check
	 * @return Boolean
	 */
	public function isOwnedByValidProvider($providers, $activityId)
	{
	return
		$this->exists([
			'Activities.id' => $activityId,
			function ($exp, $q) use ($providers) {
				return $exp->in('Activities.provider_id', $providers);
			}
		]);
	}

	public function getByProviders($providers)
	{
		return
			$this->find()
			->select(['id'])
			->where(function ($exp, $q) use ($providers) {
					return $exp->in('Activities.provider_id', $providers);
			});
	}
}
