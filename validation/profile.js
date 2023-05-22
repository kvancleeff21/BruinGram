const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
  
  let errors = {};

  if(!Validator.isLength(data.handle, {min:2, max: 40})){
    errors.handle = "Username needs to be between 2 and 40 characters";
  }
  if (isEmpty(data.handle)) {
    errors.handle = "Username is required";
  }

  if (!isEmpty(data.phone)) {
    if (!Validator.isMobilePhone(data.phone)){
      errors.phone = "Invalid phone number";
    }
  }
  
  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

