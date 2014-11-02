/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Claude Allegre',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Gogson',
    email: 'root@gogs.fr',
    bitcoinAddr: '1Bssfhhghijfskdf',
    balance: 55325400000,
    password: '42coin'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    bitcoinAddr: '1Bssfhhghijfskdf',
    balance: 25325400000,
    password: 'admin'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'SylTi',
    email: 'sylti@gogs.fr',
    bitcoinAddr: '1Bssfhhghijfskdf',
    balance: 42325400000,
    password: '42coin'
  }, function() {
      console.log('finished populating users');
    }
  );
});

Project.find({}).remove(function() {
  Project.create({
    name : 'Shaping Sound',
    dateCreat : Date.now(),
    description : 'Shaping Sound is producing a new short film, and we want to collaborate with you! Through our Kickstarter page, you can contribute to our project, receive Shaping Sound apparel and other rewards, and we\'ll share the process with you every step of the way.  Below is a description of the project, and how YOU can help Shaping Sound create a unique independent film!',
    dateEndCampaign: new Date('2015-01-01'),
    amountToRaise: 5000000000,
    amountRaised: 420000000,
    Owner: 'Gogson',
    OwnerBTCKey: '1Bfdfeeeffeefsefes',
    active: true
  }, {
    name : 'The Pocket Drone',
    description : 'The Pocket Drone is the personal flying robot that enables anyone to capture amazing video and photos from the sky. The year 2014 is going to be the “Year of the Drone.” Personal and professional photography is literally beginning to take off. Everybody can already take great looking photos and videos with their camera phones and share them online, but they have been limited to what could be seen from the ground. Now with the Pocket Drone, it\'s never been easier to capture spectacular aerial images that open up a whole new perspective and insight that had previously been unseen.',
    dateCreat : Date.now(),
    dateEndCampaign: new Date('2015-05-31'),
    amountToRaise: 10000000000,
    amountRaised: 10000000,
    Owner: 'Claude Allegre',
    OwnerBTCKey: '1Bfdfeeeffeefsefes',
    active: true
  }, {
    name : 'Mars 2042',
    description : 'Our goal is to travel to Mars in the 2042 year',
    dateCreat : Date.now(),
    dateEndCampaign: new Date('2042-04-01'),
    amountToRaise: 30000000000000,
    amountRaised: 0,
    Owner: 'Claude Allegre',
    OwnerBTCKey: '1Bfdfeeeffeefsefes',
    active: true
  });
});
