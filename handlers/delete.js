'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  let responseBody = "";
  let statusCode = 0;

  const id = JSON.parse(event.pathParameters.id);

  const params = {
    TableName: "Fruits",
    Key: {
      id: `${id}`
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
