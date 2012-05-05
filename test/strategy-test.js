var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IntuitStrategy = require('passport-intuit-oauth/strategy');


vows.describe('IntuitStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new IntuitStrategy({
        consumerKey: 'ABC123',
        consumerSecret: 'secret'
      },
      function() {});
    },
    
    'should be named intuit': function (strategy) {
      assert.equal(strategy.name, 'intuit');
    },
  },
  
  'strategy that handles a callback from Intuit': {
    topic: function() {
      var self = this;
      var strategy =  new IntuitStrategy({
          consumerKey: 'ABC123',
          consumerSecret: 'secret'
        },
        function(token, tokenSecret, profile, done) {
          done(null, profile);
        }
      );
      
      // mock
      strategy._oauth.getOAuthAccessToken = function(token, tokenSecret, verifier, callback) {
        callback(null, 'access-token', 'access-token-secret', {});
      }
      
      strategy.success = function(profile) {
        self.callback(null, profile);
      }
      strategy.fail = function() {
        self.callback(new Error('should not be called'));
      }
      strategy.error = function(e) {
        self.callback(new Error('should not be called'));
      }
      
      
      var req = {};
      req.query = {};
      req.query['oauth_token'] = 'token';
      req.query['realmId'] = '111111111';
      req.query['dataSource'] = 'QBO';
      req.session = {};
      req.session['oauth:intuit'] = {};
      req.session['oauth:intuit']['oauth_token'] = 'token';
      req.session['oauth:intuit']['oauth_token_secret'] = 'token-secret';
      process.nextTick(function () {
        console.log('authenticate')
        strategy.authenticate(req);
      });
    },
    
    'should not error' : function(err, req) {
      assert.isNull(err);
    },
    'should set query params on profile': function (err, profile) {
      assert.isObject(profile);
      assert.equal(profile.realmId, '111111111');
      assert.equal(profile.dataSource, 'QBO');
    },
  },

}).export(module);
