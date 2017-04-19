'use strict';
var Db = require('tingodb')().Db;
var db = new Db('./db', {});
var BearerStrategy = require('passport-http-bearer').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var uuid = require('uuid/v4');

module.exports = function (passport) {
    passport.use('bearer', new BearerStrategy(
        function (token, done) {
            db.collection("users").findOne({
                token: token
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user || user.active !== true || user.expires_at < (new Date().getTime())) {
                    return done(null, false);
                }

                user.id = user._id;
                delete user._id;
                return done(null, user, {
                    scope: 'all'
                });
            });
        }
    ));

    // =========================================================================
    // GitHub ==================================================================
    // =========================================================================
    passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: process.env.GITHUB_CALLBACK_URL
        },
        function (accessToken, refreshToken, profile, done) {
            db.collection("users").findOne({
                githubId: profile.id
            }, function (err, user) {
                if (err) {
                    return done(err);
                }

                if (user) {
                    var token = uuid();
                    user.token = token;
                    user.expires_at = (new Date().getTime()) + (3600 * 1000);
                    db.collection("users").update({
                        _id: user._id
                    }, user, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });

                    user.id = user._id;
                    delete user._id;
                    return done(null, user);
                } else {
                    // save the user
                    db.collection("users").find().toArray(function (err, items) {
                        if (err) {
                            console.log(err);
                        }

                        db.collection("users").insert({
                            githubId: profile.id,
                            name: profile.username,
                            token: uuid(),
                            avatarUrl: profile.photos[0].value,
                            expires_at: (new Date().getTime()) + (3600 * 1000),
                            active: items.length > 0 ? false : true
                        }, function (err, newUser) {
                            newUser = newUser[0];
                            if (err) {
                                throw err;
                            }
                            delete newUser._id;
                            return done(null, newUser);
                        });
                    });
                }
            });
        }));
};
