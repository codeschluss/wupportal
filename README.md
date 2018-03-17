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
generate app.php in backend\config by duplicating app.default.php and configure it

#### Step 3. 
[Composer](https://getcomposer.org/) install

#### Step 4. 
go to frontend and 
```npm run install```

#### Step 5. 
start DB and [insert data](https://github.com/codeschluss/wupportal/tree/master/backend/config/schema)

#### Step 6. 
go to backend\webroot and 
start development server (example: ```php -S 0.0.0.0:4200```)

#### Step 7.
go to frontend and
```npm run build```


