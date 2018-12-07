/*!40101 SET character_set_client = utf8 */;

INSERT INTO `activity_translatables` (`id`, `name`, `description`, `modified`, `created`, `language_id`, `parent_id`)
SELECT UUID(), activities.name, activities.description, activities.modified, activities.created, languages.id, activities.id
FROM `activities`, `languages`
WHERE languages.locale = 'de';
