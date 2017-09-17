# Passport-Intuit-OAuth

[Passport](http://passportjs.org/) strategy for authenticating with [Intuit](http://www.intuit.com/)
using the OAuth 1.0a API.

This module lets you authenticate using Intuit in your Node.js applications.
By plugging into Passport, Intuit authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-intuit-oauth

## Usage

#### Configure Strategy

The Intuit authentication strategy authenticates users using a Intuit
account and OAuth tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a consumer key, consumer secret, and callback URL.

    passport.use(new IntuitStrategy({
        consumerKey: INTUIT_CONSUMER_KEY,
        consumerSecret: INTUIT_CONSUMER_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/intuit/callback"
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ intuitId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'intuit'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/intuit',
      passport.authenticate('intuit'));
    
    app.get('/auth/intuit/callback', 
      passport.authenticate('intuit', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-intuit-oauth/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-intuit-oauth.png)](http://travis-ci.org/jaredhanson/passport-intuit-oauth)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2012-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-intuit-oauth'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/vK9dyjRnnWsMzzJTQ57fRJpH/jaredhanson/passport-intuit-oauth.svg' /></a>
