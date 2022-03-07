const Course = require("../../models/courseModel");
const Stage = require("../../models/stageModel");
const catchAsync = require("../../utils/catchAsync");


async function assignCourseToStageFn(courseId, stageId) {
    const stage = await Stage.findById(stageId);
    const course = await Course.findById(courseId);


    // update course stage to the new stage
    await Course.updateOne({ _id: courseId },{ $set: { stage: stage._id } });

    // remove course from stage's courses field
    const courseIndex = stage.courses.indexOf(courseId);
    stage.courses.splice(courseIndex, 1);
    await stage.save();


  return `${course.name} is assigned to ${stage.name} Stage `;
}

module.exports = assignCourseToStageFn;
