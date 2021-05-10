//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Post = require('./models/post');

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Post,
  },
};
