const Joi  = require("joi");
const validator = require('express-joi-validation').createValidator({})

module.exports.SongsValidation = {
    // Get with id params
    getSongWithId: validator.params(Joi.object({
        id: Joi.string().min(2).guid().required().description('Id of the lyrics')
    })),

    // Delete with id params
    deleteSongsWithId: validator.params(Joi.object({
        id:Joi.string().guid().required().description('Id of the lyrics')
        //id: Joi.string().min(2).regex(new RegExp("^[:0-9]*$")).required().description('Id of the song')
    })),

    // Response String
    responseSongs: validator.response(Joi.object({
        message: Joi.string().required().description("Response message")
    })),

    // Response Object
    responseSongsOne: validator.response(Joi.object({
        message: Joi.object().required().description("Response lyric")
    })),

    // Response Array Object
    responseSongsAll: validator.response(Joi.object({
        message: Joi.array().required().description("Response lyric")
    })),
    
}

module.exports.AuthValidation = {
    login: validator.headers(Joi.object({
        email: Joi.string().email().required().description('Email of the user'),
        password: Joi.string().required().description('Password of the user')
    })),

    responseAuth: validator.response(Joi.object({
        message: Joi.string().required().description("Response access_token")
    })),
}