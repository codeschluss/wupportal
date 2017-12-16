<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Schedule Entity
 *
 * @property string $id
 * @property \Cake\I18n\DateTime $start_date
 * @property \Cake\I18n\DateTime $end_date
 * @property string $activity_id
 * @property \Cake\I18n\FrozenTime $created
 * @property \Cake\I18n\FrozenTime $modified
 *
 * @property \App\Model\Entity\Activity $activity
 */
class Schedule extends Entity
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
        'id' => false,
        // 'start_date' => true,
        // 'end_date' => true,
        // 'activity_id' => true,
        // 'created' => true,
        // 'modified' => true,
        // 'activity' => true
    ];
}
