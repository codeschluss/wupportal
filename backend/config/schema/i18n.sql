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
