const catchAsync = require("./catchAsync");
const Stage = require("../models/stageModel");
const Course = require("../models/courseModel");
const Class = require("../models/classModel");
const Day = require("../models/dayModel");
const Month = require("../models/monthModel");

const defatulCourses = require("./default_courses");
const defaultClasses = require("./default_classes");

createDefaultStages = catchAsync(async () => {
  const stages = await Stage.find();
  if (stages.length <= 0) {
    const primaryStage = await Stage.create({
      name: "Primary",
    });
    const secondaryStage = await Stage.create({
      name: "Secondary",
    });
    const sharedStage = await Stage.create({
      name: "Shared",
    });

    console.log("Default Stages Sucessfully Created!");
  }
  createDaysAndMonths();

});

createDaysAndMonths = catchAsync(async () => {
  const days = await Day.find();
  if (days.length <= 0) {
    const daysArray = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    daysArray.forEach(async (day) => {
      await Day.create({ name: day })
    });
  }

  const months = await Month.find();
  if (months.length <= 0) {
    const monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthsArray.forEach(async (month) => {
      await Month.create({ name: month })
    });
  }

  createDefaultCourses();
})

createDefaultCourses = catchAsync(async () => {
  const courses = await Course.find();

  if (courses.length <= 0) {
    // creating default courses like languages
    for (let index = 0; index < defatulCourses.default.length; index++) {
      // creating course
      const stage = await Stage.findOne({ name: "Shared" });
      const stageId = stage._id;
      const defatulCourse = await Course.create({
        name: defatulCourses.default[index],
        stage: stageId, // storing stage id in course stage field
      });
      // adding course id in the stage's courses field
      stage.courses.push(defatulCourse._id);
      await stage.save();
    }
    // createing primary Courses
    for (let index = 0; index < defatulCourses.primary.length; index++) {
      // creating course
      const stage = await Stage.findOne({ name: "Primary" });
      const stageId = stage._id;
      const primaryCourse = await Course.create({
        name: defatulCourses.primary[index],
        stage: stageId, // storing stage id in course stage field
      });
      // adding course id in the stage's courses field
      stage.courses.push(primaryCourse._id);
      await stage.save();
    }
    // creating Secondary Courses
    for (let index = 0; index < defatulCourses.secondary.length; index++) {
      // creating course
      const stage = await Stage.findOne({ name: "Secondary" });
      const stageId = stage._id;
      const secondaryCourse = await Course.create({
        name: defatulCourses.secondary[index],
        stage: stageId, // storing stage id in course stage field
      });
      // adding course id in the stage's courses field
      stage.courses.push(secondaryCourse._id);
      await stage.save();
    }

    console.log("Default Courses Sucessfully Created!");
  }

  createDefaultClasses();
});

createDefaultClasses = catchAsync(async () => {
  const _classess = await Class.find();
  if (_classess.length <= 0) {
    // create primary classes
    for (let index = 0; index < defaultClasses.primary.length; index++) {
      const stage = await Stage.findOne({ name: "Primary" });
      await Class.create({
        name: defaultClasses.primary[index],
        stage: stage._id,
        fee: 12
      });
    }
    // create secondary classes
    for (let index = 0; index < defaultClasses.secondary.length; index++) {
      const stage = await Stage.findOne({ name: "Secondary" });
      await Class.create({
        name: defaultClasses.secondary[index],
        stage: stage._id,
        fee: 18
      });
    }

    console.log("Default Classes Sucessfully Created!");
  }
});
createStudentCharge = catchAsync(async (req, res, next) => {
  const studentCharges = await mongoose.find();
  console.log(studentCharges)
})

const createDefaulties = catchAsync(async () => {
  createDefaultStages();
});

module.exports = createDefaulties;
