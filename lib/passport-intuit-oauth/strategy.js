/**
 * Module dependencies.
 */
var util = require('util')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Intuit authentication strategy authenticates requests by delegating to
 * Intuit using the OAuth protocol.
 *
 * Applications must supply a `verify` callback which accepts a `token`,
 * `tokenSecret` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `consumerKey`     identifies client to Intuit
 *   - `consumerSecret`  secret used to establish ownership of the consumer key
 *   - `callbackURL`     URL to which Intuit will redirect the user after obtaining authorization
 *
 * Examples:
 *
 *     passport.use(new IntuitStrategy({
 *         consumerKey: '123-456-789',
 *         consumerSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/intuit/callback'
 *       },
 *       function(token, tokenSecret, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.requestTokenURL = options.requestTokenURL || 'https://oauth.intuit.com/oauth/v1/get_request_token';
  options.accessTokenURL = options.accessTokenURL || 'https://oauth.intuit.com/oauth/v1/get_access_token';
  options.userAuthorizationURL = options.userAuthorizationURL || 'https://appcenter.intuit.com/Connect/Begin';
  options.sessionKey = options.sessionKey || 'oauth:intuit';

  OAuthStrategy.call(this, options, verify);
  this.name = 'intuit';
}

/**
 * Inherit from `OAuthStrategy`.
 */
util.inherits(Strategy, OAuthStrategy);

/**
 * Authenticate request by delegating to Intuit using OAuth.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req) {
  // When Intuit redirects the user back to the application, they include two
  // extra query parameters: `realmId` and `dataSource`.  We stash them away
  // now so that we can attach them to the user profile later.
  this._realmId = req.query.realmId;
  this._dataSource = req.query.dataSource;
  
  // Call the base class for standard OAuth authentication.
  OAuthStrategy.prototype.authenticate.call(this, req);
}

/**
 * Retrieve user profile from Intuit.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `realmId`
 *   - `dataSource`
 *
 * @param {String} token
 * @param {String} tokenSecret
 * @param {Object} params
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(token, tokenSecret, params, done) {
  var profile = { provider: 'intuit' };
  profile.realmId = this._realmId;
  profile.dataSource = this._dataSource;

  return done(null, profile);
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
