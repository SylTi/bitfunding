Bitcoin Crowdfunding Platform
=============================

> MEAN Stack Technologies  
> Blockchain.info API


### IN PROGRESS
* Demo @ http://bitfunding.herokuapp.com/

## Installation 

* npm install && bower install 

#### Developpement

1. rename /server/config/local.env.sample.js into local.env.js
2. set the variables.
3. if you want your database to be pre seeded open config/environment/developpement.js and set seedDB: true

#### Production
* Set the same variables directly in your env.

##### Variables values
* BLOCKCHAIN_API: string, The API code must be requested to blockchain.info
* SECRET_KEY: string, Random key used to secure blockchain.info callbacks
* BTC_ADDR: string, Your master Bitcoin address : every BTC send to a user address is forwarded there. 
  This address should never touch the internet for increased security.
* MY_SITE: string, domain of you site
* FEE_WEBSITE: number, representing fee % for the service (at withdraw when project is done)
* FEE_WITHDRAW: number, fee % on user withdraw 

##### Client Configuration
You can configure:

* Google Analytics ID in the **/client/index.html** file
* Addthis user ID in the **/client/index.html** file
* Disquss App name in the **/client/app/app.js** file
* $scope.fee Withdrawal fee in the **/client/app/account/settings/settings.controller.js** file

## Platform Workflow : User
1. A user create is account
2. Blochain.info API call to get a BTC Address
3. User deposit to that address
4. After 6 confirmations, auto forward of the funds to the BTC Master address and the funds are added to the balance of the user so he can contribibute to any project present on the platform

## Platform Workflow : Project
1. Create a user.
2. Create a project, enter details and valid BTC Address
3. Wait for a contribution
4. When the deadline is met, admin manually either send the bitcoin from is offline wallet to the address specified on the project if the goal is met. Or send back the money to the contributors.


## Coding / Contributing

* Fork and make pull request.
* Use the generator to follow the app conventions doc @ https://github.com/DaftMonk/generator-angular-fullstack
* To lunch coding webserver : `grunt serve`
* HotFix : create a new branch from master, push it for review & then merge to master.
* To publish the app on Heroku : `grunt build && cd dist && grunt buildcontrol:heroku`


