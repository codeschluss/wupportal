<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Schedule Entity
 *
 * @property string $id
 * @property \Cake\I18n\FrozenTime $start_date
 * @property \Cake\I18n\FrozenTime $end_date
 * @property string $recurrence_id
 *
 * @property \App\Model\Entity\Recurrence $recurrence
 * @property \App\Model\Entity\Activity[] $activities
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
        'start_date' => true,
        'end_date' => true,
        'recurrence_id' => true,
        'recurrence' => true,
        'activities' => true
    ];
}
