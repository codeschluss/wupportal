/*
 * Database
 */

DROP DATABASE IF EXISTS `wupportal`;

CREATE DATABASE `wupportal`
  CHARACTER SET `utf8`
  COLLATE `utf8_general_ci`;

USE `wupportal`;

/*
 * Tables
 */

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

  `color` VARCHAR(16) UNIQUE NOT NULL,
  `description` TEXT,
  `name` VARCHAR(255) UNIQUE NOT NULL,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `tags` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `description` TEXT,
  `name` VARCHAR(255) UNIQUE NOT NULL,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `target_groups` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `description` TEXT,
  `name` VARCHAR(255) UNIQUE NOT NULL,

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

  `house_number` VARCHAR(8),
  `latitude` Float(16, 10),
  `longitude` Float(16, 10),
  `place` VARCHAR(255),
  `postal_code` VARCHAR(8),
  `street` VARCHAR(255),

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `suburb_id` CHAR(36),

  CONSTRAINT `fkey_address_suburb`
    FOREIGN KEY (`suburb_id`) REFERENCES `suburbs` (`id`)
    ON UPDATE CASCADE
);

CREATE TABLE `users` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `fullname` VARCHAR(255),
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255),
  `superuser` BOOLEAN DEFAULT FALSE,
  `username` VARCHAR(255) UNIQUE NOT NULL,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW()
);

CREATE TABLE `organisations` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `description` TEXT,
  `image` MEDIUMBLOB,
  `mail` VARCHAR(255),
  `name` VARCHAR(255) UNIQUE NOT NULL,
  `phone` VARCHAR(255),
  `website` VARCHAR(255),

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `address_id` CHAR(36),

  CONSTRAINT `fkey_organisation_address`
    FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
    ON UPDATE CASCADE
);

CREATE TABLE `providers` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `admin` BOOLEAN DEFAULT FALSE,
  `approved` BOOLEAN DEFAULT FALSE,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `organisation_id` CHAR(36) NOT NULL,
  `user_id` CHAR(36) NOT NULL,

  CONSTRAINT `fkey_provider_organisation`
    FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE,

  CONSTRAINT `fkey_provider_user`
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `activities` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `description` TEXT,
  `name` VARCHAR(255) NOT NULL,
  `show_user` BOOLEAN NOT NULL DEFAULT 0,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `address_id` CHAR(36) NOT NULL,
  `category_id` CHAR(36) NOT NULL,
  `provider_id` CHAR(36) NOT NULL,

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
  -- `id` CHAR(36) NOT NULL PRIMARY KEY,

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
  -- `id` CHAR(36) NOT NULL PRIMARY KEY,

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

CREATE TABLE `schedules` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `end_date` DATETIME,
  `start_date` DATETIME,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `activity_id` CHAR(36),

  CONSTRAINT `fkey_schedule_activity`
    FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`)
    ON UPDATE CASCADE ON DELETE CASCADE
);

/*
 * WORK IN PROGRESS
 *

CREATE TABLE `images` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `image` MEDIUMBLOB NOT NULL,
  `mime_type` TEXT,

  `created` DATETIME NOT NULL DEFAULT NOW(),
  `modified` DATETIME NOT NULL DEFAULT NOW(),

  `organisation_id` CHAR(36),

  CONSTRAINT `fkey_image_organisation`
    FOREIGN KEY (`organisation_id`) REFERENCES `organisations` (`id`)
    ON DELETE CASCADE
);

 */

CREATE TABLE `i18n` (
  `id` CHAR(36) NOT NULL PRIMARY KEY,

  `content` text,
  `field` VARCHAR(255) NOT NULL,
  `foreign_key` CHAR(36) NOT NULL,
  `locale` VARCHAR(6) NOT NULL,
  `model` VARCHAR(255) NOT NULL,

  UNIQUE INDEX I18N_LOCALE_FIELD(`locale`, `model`, `foreign_key`, `field`),
  INDEX I18N_FIELD(`model`, `foreign_key`, `field`)
);
