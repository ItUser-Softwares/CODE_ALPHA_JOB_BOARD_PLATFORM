var express = require('express');
var router = express.Router();
const multer = require('multer');

//Routers
const loginRouter = require('./auth/login');
const signupRouter = require('./auth/signup');
const logoutRouter = require('./auth/logout');

//Databases
const { Notification, User, Job } = require('../models');
const { Op } = require('sequelize');



// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

//Use Routes
router.use('/', loginRouter);
router.use('/', signupRouter);
router.use('/', logoutRouter);

//! /Profile methods
router.get('/', async function (req, res) {

  Notification.sync();
  User.sync();
  if (req.session.user) {
    const notifications = await Notification.findAll({
      where: {
        [Op.and]: [
          { isAccepted: 0 },
          { userId: req.session.user.email }
        ]
      }
    });
    const user = await User.findOne({ where: { email: req.session.user.email } });
    return res.render('profile', { notifications: notifications.length, user: user });
  } else {
    return res.redirect('/profile/login');// Redirect if not logged in
  }
});


router.post('/', upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async function (req, res) {
  User.sync();
  const { name, info, age } = req.body;

  // Access uploaded files
  const profileImage = req.files['profileImage'] ? req.files['profileImage'][0].path : null;
  const resume = req.files['resume'] ? req.files['resume'][0].path : null;

  // Update user with file paths
  const user = await User.update(
    { name: name, age: age, info: info, imagePath: profileImage, resumePath: resume },
    { where: { email: req.session.user.email } }
  );

  res.redirect('/profile');
});


//! /Profile/notifications
router.get('/notifications', function (req, res) {
  Notification.sync();
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }

  // Fetch all notifications for the logged in user
  Notification.findAll({
    where: {
      [Op.or]: [
        { receiverEmail: req.session.user.email },
        { userId: req.session.user.email }
      ]
    }
  }).then((notifications) => {
    const isReceiver = notifications.some(notification => notification.receiverEmail === req.session.user.email);
    res.render('notification', { notifications: notifications, isReceiver: isReceiver });
  }).catch((error) => {
    console.error('Error fetching notifications:', error);
    res.status(500).send('Internal Server Error');
  });
});


//! /Profile/listings
router.get('/listings', async function (req, res) {
  Job.sync();
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }

  const jobs = await Job.findAll({ where: { uploadId: req.session.user.email } });

  return res.render('listings', { jobs: jobs });
});

//! /Profile/uploads
router.get('/uploads/:fileName', function (req, res) {
  const { fileName } = req.params;
  if (!fileName) {
    return res.status(400).send('File name is required');
  }
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }
  res.sendFile(fileName, { root: 'uploads' });

});

//! /Profile/JobID/accepted || rejected
router.get('/:jobID/accepted', function (req, res) {
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }
  Notification.sync();
  const { jobID } = req.params;
  Notification.update({ isAccepted: 1 }, { where: { id: jobID } });
  res.redirect('/profile/notifications');

});

router.get('/:jobID/rejected', async function (req, res) {
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }
  Notification.sync();
  const { jobID } = req.params;
  await Notification.update({ isAccepted: -1 }, { where: { id: jobID } });
  res.redirect('/profile/notifications');
});

//! /Profile/JobID
router.get('/:jobId', async function (req, res) {
  if (!req.session.user) {
    return res.redirect('/profile/login');
  }
  const { jobId } = req.params;
  Notification.sync();
  User.sync();
  const notification = await Notification.findOne({ where: { id: jobId } });
  if(!notification)
    return res.status(404).send('Notification not found');
  const user = await User.findOne({ where: { email: notification.userId } });
  res.render('profileView', { user: user });

});

module.exports = router;
