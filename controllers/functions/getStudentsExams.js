const Mark = require("../../models/markModel");
const APIFeatures = require('../../utils/apiFeatures')
async function getStudentExamsFn(marks, courses, student, summary = false) {
    let totolMarks = 0;
    let subjects = [];
    // looping courses to get courses exams
    for (let i = 0; i < courses.length; i++) {
        const course = courses[i]; // current course
        let courseExams = []; // current course exams Note: if not summary
        let courseMarks = 0; // current course Marks Note: if summary
        // looping marks 
        for (let index = 0; index < marks.length; index++) {
            // getting current course exam marks and storing in courseExams variable 
            if (marks[index].course.name == course.name) {
                totolMarks += marks[index].marks;
                if (!summary) {
                    courseExams.push({
                        exam: marks[index].exam,
                        marks: marks[index].marks
                    })
                } else {
                    courseMarks += marks[index].marks;
                }
            }
        }
        // adding course and it's exams in subjects variable
        if(!summary){
            subjects.push({
                subject: course.name,
                exams: courseExams
            });
        } else {
            subjects.push({
                subject: course.name,
                marks: courseMarks
            });
        }
       
        // clearing courseExams, to store next course exam
        courseExams = []
    }
    const percentage = `${(100 * totolMarks) / 1000}%`;
    const studentName = student.fullName;
   
    const className = student.class ? student.class.name : 'No Class';

    return {
        studentName,
        totolMarks,
        className,
        percentage,
        subjects
    };
}
async function getStudentsExamsFn(students, courses, query) {
    let studentsExams = [];

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        let filter = {};
        if (student._id) filter = { student: student._id };
        const features = new APIFeatures(Mark.find(filter).populate('course').populate('student').populate('class'), query).filter().sort().limitFields().paginate()
        const marks = await features.query;
        const exams = await getStudentExamsFn(marks, courses, student);
        if (exams) studentsExams.push(exams);
    }

    return studentsExams;
}

async function getStudentsExamsSummary(students, courses, query) {
    let studentsExams = [];

    for (let i = 0; i < students.length; i++) {
        const student = students[i];
        let filter = {};
        if (student._id) filter = { student: student._id };
        const features = new APIFeatures(Mark.find(filter).populate('course').populate('student').populate('class'), query).filter().sort().limitFields().paginate()
        const marks = await features.query;
        
        const exams = await getStudentExamsFn(marks, courses, student, true);
        if (exams) studentsExams.push(exams);
    }

    return studentsExams;
}



module.exports = { getStudentsExamsFn, getStudentExamsFn, getStudentsExamsSummary };