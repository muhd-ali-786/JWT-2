const Joi = require('@hapi/joi')

//Register Validation

const registerValidation = (user)=>{
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
    }

    
    return Joi.object(schema).validate(user)
}


const loginValidation = (user)=>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(8).required(),
    }

    
    return Joi.object(schema).validate(user)
}


module.exports = {
    registerValidation,
    loginValidation
}