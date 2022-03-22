const express = require('express');
const backupController = require('./../controllers/backupController');

const router = express.Router();


router
  .route('/')
  .get(backupController.createBackup)

router.route('/restore').get(backupController.restore);

router.route('/schedule');
  
module.exports = router;

