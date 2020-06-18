const mongoose = require('mongoose');
const Joi = require('Joi');
const express = require('express');
const { Customers, validate } = require('../modules/customers');
const router = express.Router()

router.get('/', async (req, res) => {
    const customers = await Customers.find().select('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customers.findById(req.params.id)
    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('customer not found');
    res.send(customer);
});
router.post('/', async (req, res) => {
    const { error } = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);
    let customer = await new Customers({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await customer.save();

    // const course = {
    //     id: courses.length + 1,
    //     name: req.body.name
    // };
    // courses.push(course);
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);


    if (error)
        return res.status(400).send(error.details[0].message);
    const customer = await Customers.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, {
        new: true
    });
    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('customer not found');
    res.send(customer);


    // courseLocation.name = req.body.name;


});
router.delete('/:id', async (req, res) => {
    const customer = await Customers.findByIdAndDelete(req.params.id)

    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!customer) return res.status(404).send('customer not found');

    // const index = courses.indexOf(courseLocation);
    // courses.splice(index, 1);
    res.send(customer);

})


module.exports = router