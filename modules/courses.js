
const mongoose = require('mongoose');
const Joi = require('Joi');

// const courses = [
//     { id: 1, name: 'course1' },
//     { id: 2, name: 'course2' },
//     { id: 3, name: 'course3' },
//     { id: 4, name: 'course4' }

// ];

courseSchema = new mongoose.Schema({
    name: String
});

const Course = mongoose.model('Course', new mongoose.Schema({
    name: String
})
);


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}

exports.Course = Course;
exports.validate = validateCourse;