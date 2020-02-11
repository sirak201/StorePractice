const Buyer = require("../Models/Buyer");

const isEmpty = passString => {
  if (passString === undefined) return true;

  if (passString.trim() === "") {
    return true;
  } else {
    return false;
  }
};

const isEmail = email => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

exports.validateNewCustomer = data => {
  let error = {};

  if (isEmpty(data.email)) {
    error.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    error.email = "Email must be a valid Email";
  }

  if (isEmpty(data.firstName) || isEmpty(data.lastName)) {
    error.name = "Enter proper name";
  }

  return {
    error: error,
    valid: Object.keys(error).length === 0 ? true : false
  };
};
