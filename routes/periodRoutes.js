const express = require("express");
const periodController = require("./../controllers/periodController");

const router = express.Router();

router
  .route("/")
  .get(periodController.getAllPeriods)
  .post(periodController.createPeriod);

router
  .route("/:id")
  .get(periodController.getPeriod)
  .patch(periodController.updatePeriod)
  .delete(periodController.deletePeriod);

router.route('/classPeriods/:classId').get(periodController.getPeriodsByClass)


module.exports = router;
