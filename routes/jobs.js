var express = require('express');
var router = express.Router();
var { Job, Notification } = require('../models');
const shortid = require('shortid');
const multer = require('multer');

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    
    cb(null, Date.now() + '-' + file.originalname);
  }
});


const upload = multer({ storage: storage });

// Create a new job 
router.get('/', function (req, res) {
  if (req.session.user)
    return res.render('create');
  else
    return res.redirect('/profile/login');
});



router.post('/', async function (req, res) {
  const { jobTitle, companyName, salary, jobDescription, requirements, jobImage } = req.body;
  Job.sync();
  const shortId = shortid.generate().substring(0, 6);
  const job = await Job.create({ shortId: shortId, uploadId: req.session.user.email, companyName: companyName, title: jobTitle, description: jobDescription, salary: salary, requirements: requirements });
  res.send('Successfully uploaded');
});

// View job details and apply - GET route
router.get('/:jobID', async function (req, res) {
  if (req.session.user) {
    const { jobID } = req.params;
    Job.sync();
    const job = await Job.findOne({ where: { shortId: jobID } });
    if (!job)
      return res.status(404).send('Job not found');
    if (job.uploadId == req.session.user.email)
      return res.render('apply', { job: job, isUploader: true });
    return res.render('apply', { job: job, isUploader: false });
  } else {
    return res.redirect('/profile/login');
  }
});

// Apply for Job - POST route with file upload
router.post('/:jobID', upload.single('resume'), async function (req, res) {
  const { jobID } = req.params;
  const { applicantName, applicantEmail } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  Job.sync();
  Notification.sync();
  const job = await Job.findOne({ where: { shortId: jobID } });

  // Create notification after applying
  const notification = await Notification.create({
    jobId: job.shortId,
    userId: req.session.user.email,
    userName: applicantName,
    userEmail: applicantEmail,
    receiverEmail: job.uploadId,
    uploadPath: 'uploads/' + req.file.filename,
  });

  res.send('Successfully applied');
});

module.exports = router;
