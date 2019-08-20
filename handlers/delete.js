'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

async function deleteFruit(event) {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  let responseBody = "";
  let statusCode = 0;

  const id = event.pathParameters.id;

  const params = {
    TableName: "Flora",
    Key: {
      id,
      "type": "Fruit"
    }
  };

  try {
    const data = await documentClient.delete(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 204;
  } catch (err) {
    responseBody = `Unable to delete fruit: ${err}`;
    statusCode = 403;
  }

  const response = {
    statusCode: statusCode,
    headers: {
      "Content-Type": "application/json"
    },
    body: responseBody
  };

  return response;
};

module.exports = {
  handler: deleteFruit
};