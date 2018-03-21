# Project "Wupportal"
__An informative portal for new citizens__

## Demo
A live demo will soon be available.

## Introduction






## Setup

### Prerequisites
In order to deploy this web based application you have to setup some dependencies, mainly a database with the appropriate schema and a [CakePHP](http://www.cakephp.org) compatible [PHP](https://secure.php.net) interpreter. Further requirements, for developing the frontend and once for AOT asset-building, are [NodeJS](https://nodejs.org) and its package management utility [NPM](https://www.npmjs.com).

#### Database and schema
As most applications, this one likewise depends on persisting data and therefore employs a relational database. [MySQL](https://www.mysql.com) and [MariaDB](https://mariadb.org) are both suitable. The shipped [SQL schema](https://github.com/codeschluss/wupportal/blob/master/backend/config/schema/app.sql) has to be imported and the [CakePHP configuration](https://github.com/codeschluss/wupportal/blob/master/backend/config/app.default.php) has to contain the correct database address.
When those prerequisites are met, at least one administrative user should be created. Currently there is no automatic way to do this, so the database CLI is the way to go.

### Step by step introduction

#### Step 1. 
Clone the repository

#### Step 2. 
Download and Install [NodeJS](https://nodejs.org)

#### Step 3. 
start DB and [insert data](https://github.com/codeschluss/wupportal/tree/master/backend/config/schema). You can use the init_database.bat (for example with [xampp](https://www.apachefriends.org/index.html)). 
If necessary add MySQL to your path environment.

#### Step 4.
generate app.php in backend\config by duplicating app.default.php (change name to app.php). Then configure it:
- change database settings in section Datasources of app.php: driver (most cases Cake\Database\Driver\Mysql), username (most cases root), password (most cases empty), database (should be 'wupportal') 
- generate security salt as follows ```php gen-salt.php``` in folder backend\config. Copy the output from the console and paste it in the corresponding security section of app.php. This generated hash value is especially necessary for hashing the user passwords in database. 

#### Step 5. 
[Composer](https://getcomposer.org/) and install it. Run ```composer install``` in folder \backend (where composer.json is)

#### Step 6. 
go to backend\webroot and 
start development server (example: ```php -S 0.0.0.0:4200```)
If necessary add php to your path environment.

#### Step 7. 
go to frontend and ```npm install```

#### Step 8.
go to frontend and
```npm run build```

#### Step 9.
open http://localhost:4200 (or whatever your port is) and open the app. 
