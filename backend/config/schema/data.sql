INSERT INTO `configurations` (`id`, `item`, `value`) VALUES
(1, 'mapcenterLongitude', '7.1756'),
(2, 'mapcenterLatitude', '51.2640'),
(3, 'zoomfactor', '13.5'),
(4, 'mapProjection', 'EPSG:4326'),
(5, 'portalName', 'Wupportal'),
(6, 'portalSubtitle', 'Integrationsportal');

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
(1, 'sport', 'Sportaktivitaet'),
(2, 'sprache', 'Sprachkurs'),
(3, 'jung', 'Fuer junge Leute'),
(4, 'alt', 'Fuer alte Leute'),
(5, 'lernen', 'Lernen'),
(6, 'jungundalt', 'jungundalt'),
(7, 'bla', 'bla'),
(8, 'blabla', 'blabla');

INSERT INTO `target_groups` (`id`, `name`, `description`) VALUES
(1, 'Adults', 'Adult target group'),
(2, 'Kids', 'Kid target group');

INSERT INTO `users` (`id`, `admin`, `username`, `password`, `fullname`, `phone`) VALUES
(1, 1, 'john@doe.com', 'password', 'John Doe\'s', '01234567890'),
(2, 0, 'max@mustermann.de', 'password', 'Max Mustermann', '09876543210');

INSERT INTO `suburbs` (`id`, `name`) VALUES
(1, 'Elberfeld'),
(2, 'Barmen');

INSERT INTO `addresses` (`id`, `longitude`, `latitude`, `street`, `house_number`, `postal_code`, `place`, `suburb_id`) VALUES
(1, 7.14733123779296900000, 51.25588989257812500000, 'schlossbleiche', '20', '42103', 'wuppertal', 1),
(2, 7.2, 51.25505828857422000000, 'islandufer', '15', '42103', 'wuppertal', 1);

INSERT INTO `categories` (`id`, `name`, `description`, `color`) VALUES
(1, 'sportaktivität', 'sportliche aktivitäten', 'blau'),
(2, 'Sprachkurs', 'Sprachkurse', 'rot');

INSERT INTO `organisations` (`id`, `name`, `description`, `website`, `mail`, `phone`, `image`, `address_id`) VALUES
(1, 'Muster Organisation', 'Wir bieten Sportaktivitäten an', 'www.domain.de', 'muster@organisatzion.de', '01234567890', null, 1),
(2, 'Doe\'s Organisation', 'Wir bieten Sprachkurse an', 'www.domain.com', 'does@organisatzion.com', '09876543210', null, 2);

INSERT INTO `providers` (`id`, `organisation_id`, `user_id`) VALUES
(1, 2, 1),
(2, 1, 2);

INSERT INTO `activities` (`id`, `name`, `description`, `schedule`, `show_user`, `address_id`, `provider_id`, `category_id`) VALUES
(1, 'Sprachkurs', 'Englisch Sprachkurs fuer Jung und Alt', '2017-08-31', 1, 1, 1, 2),
(2, 'Sportaktivitaet', 'Sportaktivitaet für Jung und Alt', '2017-08-31', 1, 1, 2, 2),
(3, 'Sprachkurs', 'Deutsch Sprachkurs fuer Alt und Jung', '2017-08-30', 1, 2, 1, 2),
(4, 'Sprachkurs', 'Englisch', '2017-09-30', 1, 2, 1, 2);

INSERT INTO `activities_tags` (`id`, `tag_id`, `activity_id`) VALUES
(1, 1, 2),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1),
(5, 5, 1),
(6, 6, 1),
(7, 7, 1),
(8, 8, 1),
(9, 2, 3),
(10, 3, 3),
(11, 4, 3),
(12, 5, 3),
(13, 6, 3),
(14, 7, 3),
(15, 8, 3),
(16, 2, 4);

INSERT INTO `activities_target_groups` (`id`, `target_group_id`, `activity_id`) VALUES
(1, 2, 2),
(2, 1, 2),
(3, 2, 1),
(4, 1, 1);

commit;
