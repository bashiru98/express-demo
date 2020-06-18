const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');


const Computer = mongoose.model('Computer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    }
}))
// const computers = [
//     { id: 36, name: 'dell' },
//     { id: 37, name: 'macbook' },
//     { id: 38, name: 'Hp' },
//     { id: 39, name: 'toshiba' },
//     { id: 40, name: 'lenova' },
// ];

router.get('/', async (req, res) => {
    const computers = await Computer.find().select('name');
    res.send(computers);
});

router.get('/:id', async (req, res) => {
    const computer = await Computer.findById(req.params.id)
    // const computerLocation = computers.find(co => co.id === parseInt(req.params.id));
    if (!computer) res.status(404).send('the computer with the given id not found...');
    return res.send(computer);

});

router.post('/', async (req, res) => {
    const { error } = validateComputers(req.body);
    if (error) res.status(400).send(error.details[0].message);
    let computer = await new Computer({ name: req.body.name })
    // const computer = {
    //     id: computers.length + 1,
    //     name: req.body.name
    // };
    // computers.push(computer);
    computer = await computer.save()
    res.send(computer);
});
router.put('/:id', async (req, res) => {
    const { error } = validateComputers(req.body);


    if (error)
        return res.status(400).send(error.details[0].message);
    const computer = await Computer.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })
    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!computer) return res.status(404).send('computer not found');
    res.send(computer);


    // courseLocation.name = req.body.name;


});

router.delete('/:id', async (req, res) => {
    const computer = await Computer.findByIdAndDelete(req.params.id)

    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!computer) return res.status(404).send('course not found');

    // const index = courses.indexOf(courseLocation);
    // courses.splice(index, 1);
    res.send(computer);

})

function validateComputers(computer) {
    const schema = {
        name: Joi.string().min(5).max(50).required()
    };
    return Joi.validate(computer, schema);
}


module.exports = router