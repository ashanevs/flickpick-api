// const express = require("express");
const jwt = require("jwt-simple");
// const passport = require("../config/passport");
const config = require("../config/config");
const mongoose = require("../models/User");
const User = mongoose.model("User");
const Movie = mongoose.model("Movie");

module.exports = {
  signUp: (req, res) => {
    if (req.body.email && req.body.password) {
      let newUser = {
        email: req.body.email,
        password: req.body.password
      };
      User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
          User.create(newUser).then(user => {
            if (user) {
              var payload = {
                id: newUser.id
              };
              var token = jwt.encode(payload, config.jwtSecret);
              newUser.id = token;
              res.json({
                token: token
              });
            } else {
              res.sendStatus(401);
            }
          });
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  },
  logIn: (req, res) => {
    if (req.body.email && req.body.password) {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          if (user.password === req.body.password) {
            var payload = {
              id: user.id
            };
            var token = jwt.encode(payload, config.jwtSecret);
            res.json({
              token: token
            });
          } else {
            res.sendStatus(401);
          }
        } else {
          res.sendStatus(401);
        }
      });
    } else {
      res.sendStatus(401);
    }
  },
  addMovie: (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    User.findById(userId).then(user => {
      Movie.findById(movieId).then(movie => {
        user.favorites.push(movie._id);
        user.save();
        res.json(user);
      });
    });
  },
  removeMovie: (req, res) => {
    const userId = req.params.userId;
    const movieId = req.params.movieId;
    User.findById(userId).then(user => {
      if (user.favorites.includes(movieId)) {
        let index = user.favorites.indexOf(movieId);
        user.favorites.splice(index, 1);
        user.save();
        res.json(user);
      }
    });
  }
};