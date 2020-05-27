const express =require('express');

const router = express.Router();
const Joi =require('joi');

const courses = [
    {id:1, name: 'course1'},
    {id:2, name: 'course2'},
    {id:3, name: 'course3'},
    {id:4, name: 'course4'}
];
router.get('/', (req, res) => {
    res.send(courses);
});

router.get('/:id', (req, res) => {
    const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!courseLocation) return res.status(404).send('course not found');
    res.send(courseLocation);
});
router.post('/', (req,res) => {
    const {error} = validateCourse(req.body);

    if (error) 
        return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

router.put('/:id', (req, res) => {
    const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!courseLocation) return res.status(404).send('course not found');

    const {error} = validateCourse(req.body);


    if (error) 
        return res.status(400).send(error.details[0].message);
       
    courseLocation.name = req.body.name;
    res.send(courseLocation);


});

router.delete('/:id', (req, res) => {

    const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!courseLocation) return res.status(404).send('course not found');

    const index =courses.indexOf(courseLocation);
    courses.splice(index,1);
    res.send(courseLocation);

})

function validateCourse (courseLocation) {
    const schema = {
        name: Joi.string().min(3).required()
    };
   return Joi.validate(courseLocation, schema);

}


module.exports =router;