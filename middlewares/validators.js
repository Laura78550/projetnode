const Joi  = require("joi");
const validator = require('express-joi-validation').createValidator({})

module.exports.SongsValidation = {
    // Get with id params
    getSongsWithId: validator.params(Joi.object({
        id: Joi.string().min(2).regex(new RegExp("^[:0-9]*$")).required().description('Id of the song')
    })),

    // Delete with id params
    deleteSongsWithId: validator.params(Joi.object({
        id: Joi.string().min(2).regex(new RegExp("^[:0-9]*$")).required().description('Id of the song')
    })),

    // Response
    responseSongs: validator.response(Joi.object({
        message: Joi.string().required().description("Response message")
    })),
}

module.exports.AuthValidation = {
    login: validator.headers(Joi.object({
        email: Joi.string().email().required().description('Email of the user'),
        password: Joi.string().required().description('Password of the user')
    })),

    responseAuth: validator.response(Joi.object({
        access_token: Joi.string().required().description("Response access_token")
    })),
}