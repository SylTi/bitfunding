'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'bitcrowdfunds-secret',
  BLOCKCHAIN_API:   '', //The API code must be requested to blockchain.info
  SECRET_KEY: '', //Random key used to secure blockchain.info callbacks
  BTC_ADDR: '', // Your master Bitcoin addresse : every BTC send to user is forwarded there. This address should never touch the internet for increased security.
  MY_SITE: '', //domain of you site
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
