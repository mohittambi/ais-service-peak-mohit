'use strict';

module.exports.handler = async (event) => {
  const response = {
    event,
    message: 'Hello World!',
  };
  return response;
};
