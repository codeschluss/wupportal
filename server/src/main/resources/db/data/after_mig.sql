/*!40101 SET character_set_client = utf8 */;

INSERT INTO `organisations` (`id`, `approved`, `name`, `website`, `mail`, `phone`, `address_id`) VALUES
('00000001-0000-0000-0008-000000000000', 0, 'notApprovedOrga', 'www.notApprovedOrga.de', 'notApprovedOrga@1.de', '01234567890', '00000000-0000-0000-0006-100000000000'),
('00000002-0000-0000-0008-000000000000', 0, 'notApprovedOrga2', 'www.notApprovedOrga2.de', 'notApprovedOrga2@1.de', '01234567890', '00000000-0000-0000-0006-100000000000'),
('00000003-0000-0000-0008-000000000000', 0, 'notApprovedOrga3', 'www.notApprovedOrga3.de', 'notApprovedOrga3@1.de', '01234567890', '00000000-0000-0000-0006-100000000000');

INSERT INTO `users` (`id`, `superuser`, `username`, `password`, `name`, `phone`) VALUES
('00000001-0000-0000-0004-000000000000', 0, 'notapprovedorga@user', '$2a$10$0pLpBHF8gWe9UFz1eJzAHOwwUHMIjfkaImWTP1BX9wAmWLdcOvbNW', 'notapprovedorga', '01234567890'),
('00000002-0000-0000-0004-000000000000', 0, 'createorga@user', '$2a$10$0pLpBHF8gWe9UFz1eJzAHOwwUHMIjfkaImWTP1BX9wAmWLdcOvbNW', 'createorga', '01234567890'),
('00000003-0000-0000-0004-000000000000', 0, 'notapprovedorga2@user', '$2a$10$0pLpBHF8gWe9UFz1eJzAHOwwUHMIjfkaImWTP1BX9wAmWLdcOvbNW', 'notapprovedorga2', '01234567890');

INSERT INTO `providers` (`id`, `organisation_id`, `user_id`, `admin`, `approved`) VALUES
('00000001-0000-0000-0009-000000000000', '00000001-0000-0000-0008-000000000000', '00000001-0000-0000-0004-000000000000', 1, 1),
('00000002-0000-0000-0009-000000000000', '00000002-0000-0000-0008-000000000000', '00000003-0000-0000-0004-000000000000', 1, 1);
