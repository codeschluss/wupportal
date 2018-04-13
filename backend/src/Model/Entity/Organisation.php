<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;
use Cake\ORM\Behavior\Translate\TranslateTrait;

/**
 * Organisation Entity
 *
 * @property string $id
 * @property string $name
 * @property string $description
 * @property string $website
 * @property string $mail
 * @property string $phone
 * @property string|resource $image
 * @property string $address_id
 * @property \Cake\I18n\FrozenTime $created
 * @property \Cake\I18n\FrozenTime $modified
 *
 * @property \App\Model\Entity\Address $address
 * @property \App\Model\Entity\Provider[] $providers
 */
class Organisation extends Entity
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
        '*' => true,
				'id' => false
    ];
}
