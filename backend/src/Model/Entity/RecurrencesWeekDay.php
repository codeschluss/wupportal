<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * RecurrencesWeekDay Entity
 *
 * @property string $id
 * @property string $recurrence_id
 * @property string $week_day_id
 *
 * @property \App\Model\Entity\Recurrence $recurrence
 * @property \App\Model\Entity\WeekDay $week_day
 */
class RecurrencesWeekDay extends Entity
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
        'recurrence_id' => true,
        'week_day_id' => true,
        'recurrence' => true,
        'week_day' => true
    ];
}
