const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateLoginInput = (data) => {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email address';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'You must enter a valid email address';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'You must enter a password';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateLoginInput;