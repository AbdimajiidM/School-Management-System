const express = require('express');
const stageController = require('./../controllers/stageController');

const router = express.Router();


router
  .route('/')
  .get(stageController.getAllStages)
  .post(stageController.createStage);

router
  .route('/:id')
  .get(stageController.getStage)
  .patch(stageController.updateStage)
  .delete(stageController.deleteStage);



module.exports = router;
