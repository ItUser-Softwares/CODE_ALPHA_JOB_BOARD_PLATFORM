var express = require('express');
var router = express.Router();
var { Job } = require('../models');

//Jobs Listing
router.get('/', async function (req, res) {
  await Job.sync();
  
  Job.findAll().then(jobInstances => {
   
    const jobs = jobInstances.map(jobInstance => jobInstance.toJSON());

    res.render('index', { jobs });
  }).catch(error => {
    console.error('Error fetching jobs:', error);
    res.status(500).send('Error fetching jobs');
  });
});

module.exports = router;
