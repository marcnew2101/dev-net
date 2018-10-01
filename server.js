const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();

// Body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose.connect(db).then(() => {
  return console.log('MongoDB Connected');
}).catch((error) => {
  console.log(error);
});

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users); // set route to users
app.use('/api/profile', profile); // set route to profile
app.use('/api/posts', posts); // set route to posts


const port = process.env.PORT || 5000; // heroku || local

app.listen(port, () => {
  return console.log(`Server running on port ${port}`);
});