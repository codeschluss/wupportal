<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Recurrence Entity
 *
 * @property string $id
 * @property int $weekly_period
 * @property \Cake\I18n\FrozenDate $beginnBy
 * @property \Cake\I18n\FrozenDate $endBy
 *
 * @property \App\Model\Entity\RecurrencesWeekDay[] $recurrence_week_days
 * @property \App\Model\Entity\Schedule[] $schedules
 */
class Recurrence extends Entity
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
        'weekly_period' => true,
        'beginn_by' => true,
        'end_by' => true,
        'recurrences_week_days' => true,
        'schedules' => true
    ];
}
