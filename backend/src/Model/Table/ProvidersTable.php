<?php
namespace App\Model\Table;

use Cake\ORM\Query;
use Cake\ORM\RulesChecker;
use Cake\ORM\Table;
use Cake\Validation\Validator;

/**
 * Providers Model
 *
 * @property \App\Model\Table\OrganisationsTable|\Cake\ORM\Association\BelongsTo $Organisations
 * @property \App\Model\Table\UsersTable|\Cake\ORM\Association\BelongsTo $Users
 * @property \App\Model\Table\ActivitiesTable|\Cake\ORM\Association\HasMany $Activities
 *
 * @method \App\Model\Entity\Provider get($primaryKey, $options = [])
 * @method \App\Model\Entity\Provider newEntity($data = null, array $options = [])
 * @method \App\Model\Entity\Provider[] newEntities(array $data, array $options = [])
 * @method \App\Model\Entity\Provider|bool save(\Cake\Datasource\EntityInterface $entity, $options = [])
 * @method \App\Model\Entity\Provider patchEntity(\Cake\Datasource\EntityInterface $entity, array $data, array $options = [])
 * @method \App\Model\Entity\Provider[] patchEntities($entities, array $data, array $options = [])
 * @method \App\Model\Entity\Provider findOrCreate($search, callable $callback = null, $options = [])
 *
 * @mixin \Cake\ORM\Behavior\TimestampBehavior
 */
class ProvidersTable extends Table
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

		$this->setTable('providers');
		$this->setDisplayField('id');
		$this->setPrimaryKey('id');

		$this->addBehavior('Timestamp');

		$this->belongsTo('Organisations', [
			'foreignKey' => 'organisation_id'
		]);
		$this->belongsTo('Users', [
			'foreignKey' => 'user_id',
			'joinType' => 'INNER'
		]);
		$this->hasMany('Activities', [
			'foreignKey' => 'provider_id'
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
			->boolean('admin')
			->allowEmpty('admin');

		$validator
			->boolean('approved')
			->allowEmpty('approved');

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
		$rules->add($rules->existsIn(['organisation_id'], 'Organisations'));
		$rules->add($rules->existsIn(['user_id'], 'Users'));

		return $rules;
	}

	/**
	 *	returns provider for a given user ID and provider ID
	 *
	 * @param $userId
	 * @param $providerId
	 * @return app\Model\Entity\Provider
	 */
	public function getByUser($userId, $providerId)
	{
		return
			$this->find()
				->where([
					'Providers.user_id' => $userId,
					'Providers.id' => $providerId
				])
				->first();
	}

	public function getProviderQuery($userId)
	{
		return
			$this->find()
			->select(['id'])
			->where([
				'Providers.user_id' => $userId,
				'Providers.approved' => true
			]);
	}

	public function getProviderOrganisationQuery($userId, $organisations)
	{
		return
			$this->find()
			->select(['id'])
			->where(function ($exp, $q) use ($organisations) {
					return $exp->in('Providers.organisation_id', $organisations);
			});
	}

	public function isOwnProvider($userId, $providerId)
	{
		return
			$this->exists([
				'Providers.user_id' => $userId,
				'Providers.id' => $providerId
			]);
	}

	public function isOrgaAdminUser($ownUserId, $organisationId)
	{
		return
			$this->exists([
				'Providers.user_id' => $ownUserId,
				'Providers.organisation_id' => $organisationId,
				'Providers.admin' => true
			]);
	}

	public function isApprovedProvider($userId, $providerId = null)
	{
		return $providerId
			? $this->exists([
					'Providers.user_id' => $userId,
					'Providers.id' => $providerId,
					'Providers.approved' => true
				])
			: $this->exists([
					'Providers.user_id' => $userId,
					'Providers.approved' => true
				]);
	}

	public function isOrgaAdminProvider($userId, $providerId, $organisationAdmins)
	{
		return
			$this->exists([
				'id' => $providerId,
				function ($exp, $q) use ($organisationAdmins) {
        	return $exp->in('organisation_id', $organisationAdmins);
				}
			]);
	}

}
