const Joi  = require("joi");
const validator = require('express-joi-validation').createValidator({})

module.exports = SongsValidation = {
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