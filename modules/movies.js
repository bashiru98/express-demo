const mongoose = require('mongoose');
const Joi = require('joi');

const Movie = mongoose.model('Movie', new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 50,
        require: true

    }
}));



function validateMovies(movie) {
    const schema = {
        name: Joi.string().min(4).max(50).required()
    };
    return Joi.validate(movie, schema);
};
exports.validate = validateMovies;
exports.validate = Movie;