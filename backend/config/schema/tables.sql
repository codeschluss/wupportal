DROP TABLE IF EXISTS `i18n`;
DROP TABLE IF EXISTS `activities_translations`;
DROP TABLE IF EXISTS `activities_target_groups`;
DROP TABLE IF EXISTS `activities_tags`;
DROP TABLE IF EXISTS `activities`;
DROP TABLE IF EXISTS `providers`;
DROP TABLE IF EXISTS `organisations`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `addresses`;
DROP TABLE IF EXISTS `suburbs`;
DROP TABLE IF EXISTS `target_groups`;
DROP TABLE IF EXISTS `tags`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `translations`;
DROP TABLE IF EXISTS `configurations`;

CREATE TABLE `configurations` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`item` VARCHAR(255) NOT NULL,
	`value` VARCHAR(255) NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `translations` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`locale` VARCHAR(6) UNIQUE NOT NULL,
	`name` VARCHAR(255) UNIQUE NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `categories` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) UNIQUE NOT NULL,
	`description` TEXT,
	`color` VARCHAR(16) UNIQUE NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `tags` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) UNIQUE NOT NULL,
	`description` TEXT,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `target_groups` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) UNIQUE NOT NULL,
	`description` TEXT,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `suburbs` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) UNIQUE NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `addresses` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`latitude` Float(16, 10),
	`longitude` Float(16, 10),
	`street` VARCHAR(255),
	`house_number` VARCHAR(8),
	`postal_code` VARCHAR(8),
	`place` VARCHAR(255),
	`suburb_id` CHAR(36),

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW(),

	CONSTRAINT `fkey_address_suburb`
		FOREIGN KEY (`suburb_id`) REFERENCES `suburbs` (`id`)
		ON UPDATE CASCADE
);

CREATE TABLE `users` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`superuser` BOOLEAN DEFAULT FALSE,
	`username` VARCHAR(255) UNIQUE NOT NULL,
	`password` VARCHAR(255) NOT NULL,
	`fullname` VARCHAR(255),
	`phone` VARCHAR(255),

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `organisations` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT,
	`website` VARCHAR(255),
	`mail` VARCHAR(255),
	`phone` VARCHAR(255),
	`image` MEDIUMBLOB,
	`address_id` CHAR(36),

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW(),

	CONSTRAINT `fkey_organisation_address`
		FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
		ON UPDATE CASCADE
);

CREATE TABLE `providers` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`admin` BOOLEAN DEFAULT FALSE,
	`organisation_id` CHAR(36),
	`user_id` CHAR(36) NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW(),

	CONSTRAINT `fkey_provider_organisation`
		FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT `fkey_provider_user`
		FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `recurrences` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`weekly_period` INT UNSIGNED,
	`beginn_by` DATE, 
	`end_by` DATE
);

CREATE TABLE `week_days` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name`CHAR(36)
);

CREATE TABLE `recurrences_week_days` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`recurrence_id` CHAR(36),
	`week_day_id` CHAR(36),

	CONSTRAINT `fkey_recurrence_week_days_recurrence`
		FOREIGN KEY (`recurrence_id`) REFERENCES `recurrences` (`id`)
		ON UPDATE CASCADE,

	CONSTRAINT `fkey_recurrence_week_days_week_days`
		FOREIGN KEY (`week_day_id`) REFERENCES `week_days` (`id`)
		ON UPDATE CASCADE
);

CREATE TABLE `schedules` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`start_date` DATETIME,
	`end_date` DATETIME,
	`recurrence_id` CHAR(36),

	CONSTRAINT `fkey_schedule_recurrence`
		FOREIGN KEY (`recurrence_id`) REFERENCES `recurrences` (`id`)
		ON UPDATE CASCADE
);

CREATE TABLE `activities` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`name` VARCHAR(255) NOT NULL,
	`description` TEXT,
	`schedule_id` CHAR(36),
	`show_user` BOOLEAN NOT NULL DEFAULT 0,
	`address_id` CHAR(36),
	`provider_id` CHAR(36) NOT NULL,
	`category_id` CHAR(36) NOT NULL,

	`created` DATETIME NOT NULL DEFAULT NOW(),
	`modified` DATETIME NOT NULL DEFAULT NOW(),

	CONSTRAINT `fkey_activity_schedule`
		FOREIGN KEY (`schedule_id`) REFERENCES `schedules` (`id`)
		ON UPDATE CASCADE,

	CONSTRAINT `fkey_activity_address`
		FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
		ON UPDATE CASCADE,

	CONSTRAINT `fkey_activity_provider`
		FOREIGN KEY (`provider_id`) REFERENCES `providers` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT `fkey_activity_category`
		FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
		ON UPDATE CASCADE
);

CREATE TABLE `activities_tags` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`activity_id` CHAR(36) NOT NULL,
	`tag_id` CHAR(36) NOT NULL,

	CONSTRAINT `uniq_activity_tag`
		UNIQUE (`activity_id`, `tag_id`),

	CONSTRAINT `fkey_activity_tag`
		FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT `fkey_tag_activity`
		FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `activities_target_groups` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`activity_id` CHAR(36) NOT NULL,
	`target_group_id` CHAR(36) NOT NULL,

	CONSTRAINT `uniq_activity_target_group`
		UNIQUE (`activity_id`, `target_group_id`),

	CONSTRAINT `fkey_activity_target_group`
		FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT `fkey_target_group_activity`
		FOREIGN KEY (`target_group_id`) REFERENCES `target_groups` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `activities_translations` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`activity_id` CHAR(36) NOT NULL,
	`translation_id` CHAR(36) NOT NULL,

	CONSTRAINT `uniq_activity_translation`
		UNIQUE (`activity_id`, `translation_id`),

	CONSTRAINT `fkey_activity_translation`
		FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE,

	CONSTRAINT `fkey_translation_activity`
		FOREIGN KEY (`translation_id`) REFERENCES `translations` (`id`)
		ON UPDATE CASCADE ON DELETE CASCADE
);

-- TODO
CREATE TABLE `i18n` (
	`id` CHAR(36) NOT NULL PRIMARY KEY,
	`locale` VARCHAR(6) NOT NULL,
	`model` varchar(255) NOT NULL,
	`foreign_key` CHAR(36) NOT NULL,
	`field` VARCHAR(255) NOT NULL,
	`content` TEXT,

	UNIQUE INDEX I18N_LOCALE_FIELD (`locale`, `model`, `foreign_key`, `field`),
	INDEX I18N_FIELD (`model`, `foreign_key`, `field`)
);

