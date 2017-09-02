<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Activity Entity
 *
 * @property string $id
 * @property string $name
 * @property string $description
 * @property string $schedule
 * @property bool $show_user
 * @property string $address_id
 * @property string $provider_id
 * @property string $category_id
 *
 * @property \App\Model\Entity\Address $address
 * @property \App\Model\Entity\Provider $provider
 * @property \App\Model\Entity\Category $category
 * @property \App\Model\Entity\Tag[] $tags
 * @property \App\Model\Entity\TargetGroup[] $target_groups
 * @property \App\Model\Entity\Translation[] $translations
 */
class Activity extends Entity
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
