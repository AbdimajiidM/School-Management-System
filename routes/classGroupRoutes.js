const express = require('express');
const classGroupController = require('./../controllers/classGroupController');

const router = express.Router();


router
    .route('/')
    .get(classGroupController.getAllClassGroups)
    .post(classGroupController.createClassGroup);

router
    .route('/:id')
    .patch(classGroupController.updateClassGroup)
    .delete(classGroupController.deleteClassGroup);



module.exports = router;
