const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const { Course, validate } = require('../modules/courses');

router.get('/', async (req, res) => {
    const course = await Course.find().select('name');
    res.send(course);
});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');
    res.send(course);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);
    let course = await new Course({ name: req.body.name });
    course = await course.save();

    // const course = {
    //     id: courses.length + 1,
    //     name: req.body.name
    // };
    // courses.push(course);
    res.send(course);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);


    if (error)
        return res.status(400).send(error.details[0].message);
    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');
    res.send(course);


    // courseLocation.name = req.body.name;


});

router.delete('/:id', async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id)

    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('course not found');

    // const index = courses.indexOf(courseLocation);
    // courses.splice(index, 1);
    res.send(course);

})



module.exports = router;