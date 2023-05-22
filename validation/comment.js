const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateComment(data) {
  let errors = {};

  if (isEmpty(data.text)) {
    errors.text = "Text field is required";
  } 
  // else if (!Validator.isLength(data.text, { min: 5, max: 300 })) {
  //   errors.text = "Comment must be between 5 and 300 characters";
  // }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}