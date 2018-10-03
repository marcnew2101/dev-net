const Validator = require('validator');
const isEmpty = require('./is-empty');

const validateRegisterInput = (data) => {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name, {min: 2, max: 30})) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'You must enter a name';
    }
    if(Validator.isEmpty(data.email)) {
        errors.email = 'You must enter a valid email address';
    }
    if(!Validator.isEmail(data.email)) {
        errors.email = 'Not a valid email address';
    }
    if(Validator.isEmpty(data.password)) {
        errors.password = 'You must enter a password';
    }
    if(!Validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be between 6 and 30 characters';
    }
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = 'You must confirm the password';
    }
    if(!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Password does not match';
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput;