<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\ORM\Behavior\Translate\TranslateTrait;

/**
 * Activity Entity
 *
 * @property string $id
 * @property string $name
 * @property string $description
 * @property bool $show_user
 * @property string $address_id
 * @property string $provider_id
 * @property string $category_id
 * @property \Cake\I18n\FrozenTime $created
 * @property \Cake\I18n\FrozenTime $modified
 *
 * @property \App\Model\Entity\Address $address
 * @property \App\Model\Entity\Provider $provider
 * @property \App\Model\Entity\Category $category
 * @property \App\Model\Entity\Schedule[] $schedules
 * @property \App\Model\Entity\Tag[] $tags
 * @property \App\Model\Entity\TargetGroup[] $target_groups
 */
class Activity extends Entity
{

	use TranslateTrait;

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
		'name' => true,
		'description' => true,
		'show_user' => true,
		'address_id' => true,
		'provider_id' => true,
		'category_id' => true,
		'created' => true,
		'modified' => true,
		'address' => true,
		'provider' => true,
		'category' => true,
		'schedules' => true,
		'tags' => true,
		'target_groups' => true
	];
}
