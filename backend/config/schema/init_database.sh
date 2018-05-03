#!/bin/sh
# in order to execute put local ../xampp/mysql/bin folder in path
mysql -u root -p < ./database.sql;
mysql -u root -p wupportal < ./tables.sql
mysql -u root -p wupportal < ./testdata.sql
