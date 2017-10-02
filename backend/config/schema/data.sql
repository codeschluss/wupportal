INSERT INTO `configurations` (`id`, `item`, `value`) VALUES
('config1', 'mapcenterLongitude', '7.1756'),
('config2', 'mapcenterLatitude', '51.2640'),
('config3', 'zoomfactor', '13.5'),
('config4', 'mapProjection', 'EPSG:4326'),
('config5', 'portalName', 'Wupportal'),
('config6', 'portalSubtitle', 'Integrationsportal');

INSERT INTO `tags` (`id`, `name`, `description`) VALUES
('tag1', 'sport', 'Sportaktivitaet'),
('tag2', 'sprache', 'Sprachkurs'),
('tag3', 'jung', 'Fuer junge Leute'),
('tag4', 'alt', 'Fuer alte Leute'),
('tag5', 'lernen', 'Lernen'),
('tag6', 'jungundalt', 'jungundalt'),
('tag7', 'bla', 'bla'),
('tag8', 'blabla', 'blabla');

INSERT INTO `target_groups` (`id`, `name`, `description`) VALUES
('tgroup1', 'Adults', 'Adult target group'),
('tgroup2', 'Kids', 'Kid target group');

INSERT INTO `users` (`id`, `admin`, `username`, `password`, `fullname`, `phone`) VALUES
('user1', 1, 'john@doe.com', 'password', 'John Doe\'s', '01234567890'),
('user2', 0, 'max@mustermann.de', 'password', 'Max Mustermann', '09876543210');

INSERT INTO `suburbs` (`id`, `name`) VALUES
('urb1', 'Elberfeld'),
('urb2', 'Barmen');

INSERT INTO `addresses` (`id`, `longitude`, `latitude`, `street`, `house_number`, `postal_code`, `place`, `suburb_id`) VALUES
('addr1', 7.14733123779296900000, 51.25588989257812500000, 'schlossbleiche', '20', '42103', 'wuppertal', 'urb1'),
('addr2', 7.2, 51.25505828857422000000, 'islandufer', '15', '42103', 'wuppertal', 'urb1');

INSERT INTO `categories` (`id`, `name`, `description`, `color`) VALUES
('cat1', 'sportaktivität', 'sportliche aktivitäten', 'blau'),
('cat2', 'Sprachkurs', 'Sprachkurse', 'rot');

INSERT INTO `organisations` (`id`, `name`, `description`, `website`, `mail`, `phone`, `image`, `address_id`) VALUES
('orga1', 'Muster Organisation', 'Wir bieten Sportaktivitäten an', 'www.domain.de', 'muster@organisatzion.de', '01234567890', null, 'addr1'),
('orga2', 'Doe\'s Organisation', 'Wir bieten Sprachkurse an', 'www.domain.com', 'does@organisatzion.com', '09876543210', null, 'addr2');

INSERT INTO `providers` (`id`, `organisation_id`, `user_id`) VALUES
('prov1', 'orga2', 'user1'),
('prov2', 'orga1', 'user2');

INSERT INTO `activities` (`id`, `name`, `description`, `schedule`, `show_user`, `address_id`, `provider_id`, `category_id`) VALUES
('act1', 'Sprachkurs', 'Englisch Sprachkurs fuer Jung und Alt', '2017-08-31', 1, 'addr1', 'prov1', 'cat2'),
('act2', 'Sportaktivitaet', 'Sportaktivitaet für Jung und Alt', '2017-08-31', 1, 'addr1', 'prov2', 'cat2'),
('act3', 'Sprachkurs', 'Deutsch Sprachkurs fuer Alt und Jung', '2017-08-30', 1, 'addr2', 'prov1', 'cat2'),
('act4', 'Sprachkurs', 'Englisch', '2017-09-30', 1, 'addr2', 'prov1', 'cat2');

INSERT INTO `activities_tags` (`id`, `tag_id`, `activity_id`) VALUES
('actag1', 'tag1', 'act2'),
('actag2', 'tag2', 'act1'),
('actag3', 'tag3', 'act1'),
('actag4', 'tag4', 'act1'),
('actag5', 'tag5', 'act1'),
('actag6', 'tag6', 'act1'),
('actag7', 'tag7', 'act1'),
('actag8', 'tag8', 'act1'),
('actag9', 'tag2', 'act3'),
('actag10', 'tag3', 'act3'),
('actag11', 'tag4', 'act3'),
('actag12', 'tag5', 'act3'),
('actag13', 'tag6', 'act3'),
('actag14', 'tag7', 'act3'),
('actag15', 'tag8', 'act3'),
('actag16', 'tag2', 'act4');

INSERT INTO `activities_target_groups` (`id`, `target_group_id`, `activity_id`) VALUES
('actgroup1', 'tgroup2', 'act2'),
('actgroup2', 'tgroup1', 'act2'),
('actgroup3', 'tgroup2', 'act1'),
('actgroup4', 'tgroup1', 'act1');

commit;
