const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const { Movie, validate } = require('../modules/movies');

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort('name')
    res.send(movies);
});
router.get('/:id', async (req, res) => {
    let movie = await Movie.findById(req.params.id);
    if (!movie) res.status(404).send('movie with the given id not found....')
    res.send(movie);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    let movie = await new Movie({ name: req.body.name });
    movie = await movie.save();



    res.send(movie);

});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);

    if (error)
        res.status(400).send(error.details[0].message);
    const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });
    if (!movie) res.status(404).send('movie with the given id not found....');
    res.send(movie)

});
router.delete('/:id', async (req, res) => {
    let movie = await Movie.findByIdAndDelete(req.params.id)

    // const courseLocation = courses.find(c => c.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send('movie not found');

    // const index = courses.indexOf(courseLocation);
    // courses.splice(index, 1);
    res.send(movie);

});



module.exports = router
