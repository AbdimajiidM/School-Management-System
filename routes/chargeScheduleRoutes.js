const express = require('express');
const chargeScheduleController = require('./../controllers/chargeScheduleController');

const router = express.Router();


router
  .route('/')
  .get(chargeScheduleController.getScheduleCharges)
  .post(chargeScheduleController.createScheduleCharge)

router.route('/:id').get(chargeScheduleController.getScheduleCharege)

module.exports = router;
