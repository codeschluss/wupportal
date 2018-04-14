<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * ActivitiesTargetGroup Entity
 *
 * @property string $id
 * @property string $activity_id
 * @property string $target_group_id
 *
 * @property \App\Model\Entity\Activity $activity
 * @property \App\Model\Entity\TargetGroup $target_group
 */
class ActivitiesTargetGroup extends Entity
{

	/**
	 * Fields that can be mass assigned using newEntity() or patchEntity().
	 *
	 * Note that when '*' is set to true, this allows all unspecified fields to
	 * be mass assigned. For security purposes, it is advised to set '*' to false
	 * (or remove it), and explicitly make individual fields accessible as needed.
	 *
	 * @var array
	 */
	protected $_accessible = [
		'*' => true,
		'id' => false
	];
}
