INSERT INTO `configurations` (`id`, `item`, `value`) VALUES
(1, 'map_center_longitude', '7.1756'),
(2, 'map_center_latitude', '51.2640'),
(3, 'zoomfactor', '13.5'),
(4, 'map_projection', 'EPSG:4326'),
(5, 'portal_name', 'Wupportal'),
(6, 'portal_subtitle', 'Integrationsportal');

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
(1, 'sport', 'Sportaktivität'),
(5, 'sprache', 'Sprachkurs');

INSERT INTO `target_groups` (`id`, `name`, `description`) VALUES
(1, 'Adults', 'Adult target group'),
(5, 'Kids', 'Kid target group');

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
(1, 'Sprachkurs', 'Englisch Sprachkurs für Jung und Alt', '2017-08-31', 1, 1, 1, 2),
(2, 'Sportaktivität', 'Sportaktivität für Jung und Alt', '2017-08-31', 1, 1, 2, 2),
(3, 'Sprachkurs', 'Deutsch Sprachkurs für Alt und Jung', '2017-08-30', 2, 1, 1, 2);

INSERT INTO `activities_tags` (`id`, `tag_id`, `activity_id`) VALUES
(1, 1, 2),
(2, 5, 1);

INSERT INTO `activities_target_groups` (`id`, `target_group_id`, `activity_id`) VALUES
(1, 5, 2),
(2, 1, 2),
(3, 5, 1),
(4, 1, 1);

commit;
