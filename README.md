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

#### Production
* Set the same variables directly in your env.

##### Variables values
* BLOCKCHAIN_API: The API code must be requested to blockchain.info
* SECRET_KEY: Random key used to secure blockchain.info callbacks
* BTC_ADDR: Your master Bitcoin address : every BTC send to a user address is forwarded there. 
  This address should never touch the internet for increased security.
* MY_SITE: domain of you site


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
* To publish the app on Heroku : `grunt build && cd dist && grunt buildcontrol:heroku`


