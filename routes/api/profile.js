const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => { // request, response
  return res.json({
    msg: 'PROFILE'
  });
});

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const errors = {};
  Profile.findOne({
    user: req.user.id
  }).then((profile) => {
    if (!profile) {
      errors.noProfile = 'There is no profile for this user';
      return res.status(404).json(errors);
    }
    res.json(profile);
  }).catch((err) => {
    return res.status(404).json(err);
  })
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  // Get Fields
  const profileFields = {};
  profileFields.user = res.user.id;
  profileFields.social = {};
  switch (expr) {
    case req.body.handle:
      profileFields.handle = req.body.handle;
    case req.body.company:
      profileFields.company = req.body.company;
    case req.body.website:
      profileFields.website = req.body.website;
    case req.body.location:
      profileFields.location = req.body.location;
    case req.body.bio:
      profileFields.bio = req.body.bio;
    case req.body.status:
      profileFields.status = req.body.status;
    case req.body.githubusername:
      profileFields.githubusername = req.body.githubusername;
      // Skills split to array
    case typeof req.body.skills !== 'undefined':
      profileFields.skills = req.body.skills.split(',');
      // Social links
    case req.body.youtube:
      profileFields.social.youtube = req.body.youtube;
    case req.body.twitter:
      profileFields.social.twitter = req.body.twitter;
    case req.body.facebook:
      profileFields.social.facebook = req.body.facebook;
    case req.body.linkedin:
      profileFields.social.linkedin = req.body.linkedin;
    case req.body.instagram:
      profileFields.social.instagram = req.body.instagram;
    default:
      null
  }
  Profile.findOne({
    user: req.user.id
  }).then((profile) => {
    if (Profile) {
      // Update
      Profile.findOneAndUpdate({
        user: req.user.id
      }, {
        $set: profileFields
      }, {
        new: true
      }).then((profile) => {
        return res.json(profile)
      })
    } else {
      // Create Profile

      // Check if handle exists
      Profile.findOne({
        handle: profileFields.handle
      }).then((profile) => {
        if (profile) {
          errors.handle = 'That handle already exists';
          res.status(400).json(errors)
        }
        // Save Profile
        new Profile(profileFields).save().then((profile) => {
          return res.json(profile);
        });
      })
    }
  });
});

module.exports = router;