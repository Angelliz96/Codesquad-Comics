const bcrypt = require("bcrypt");
const { request, response } = require("express");
const passport = require("passport");
// const Users = require("../models/userModel")


const loginLocalFailed = (request, response, next) => {
    response.status(401).json({
        error: {
            message: "Username or password is incorrect.",
            statusCode: 401
        }
    });
};
const logoutRequest = (request, response, next) => {
    request.logout();
    if (request.error) {
      response.status(400).json({
        error: {
          message: "Something went wrong!",
          statusCode: 400
        }
      });
    } else {
      response.status(200).json({
        success: {
          message: "User logged out!",
          statusCode: 200
        }
      });
    }
  };
  
  const signupRequest = async (request, response, next) => {
    const { firstName, lastName, username, password } = req.body;
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
      if (error) {
        return next(error);
      } else {
        const newUser = new User({
          firstName,
          lastName,
          username,
          password: hashedPassword
        });
        try {
          await newUser.save();
          login(newUser, (err) => {
            if (err) {
              res.status(400).json({
                error: {
                  message: "Something went wrong while signing up!",
                  statusCode: 400
                }
              });
            }
          });
        } catch (err) {
          if (err.code === 11000 && err.keyPattern.username) {
            response.status(400).json({
              error: {
                message: "Username already exists",
                statusCode: 400
              }
            });
          } else {
            res.status(500).json({
              error: {
                message: "Internal server error",
                statusCode: 500
              }
            });
          }
        }
      }
    });
  };
  
  module.exports = { loginLocalFailed, logoutRequest, signupRequest };