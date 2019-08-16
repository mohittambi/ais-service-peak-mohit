'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

async function createFruit(event) {
  let responseBody = "";
  let statusCode = 0;

  console.log(event.body);
  const { id, name, quantity } = JSON.parse(event.body);

  const params = {
    TableName: "Fruits",
    Item: {
      id: id,
      name: name,
      quantity: quantity
    }
  };

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put product: ${err}`;
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
  handler: createFruit,
};
