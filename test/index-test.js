var vows = require('vows');
var assert = require('assert');
var util = require('util');
var intuit = require('..');


vows.describe('passport-intuit-oauth').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(intuit.version);
    },
  },
  
}).export(module);
