'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

const tableName = 'Flora';

async function createVegetable(event) {
  let responseBody = "";
  let statusCode = 0;

  const { id, typeName, name, quantity } = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Item: {
      id: id,
      type: typeName,
      name: name,
      quantity: quantity
    }
  };

  try {
    const data = await documentClient.put(params).promise();

    responseBody = JSON.stringify(data);
    statusCode = 201;

  } catch (err) {
    responseBody = `Unable to put vegetable: ${err}`;
    statusCode = 403;
  }

  const response = {
    headers: {
      "Content-Type": "application/json"
    },
    statusCode: statusCode,
    body: responseBody
  };

  return response;
};

module.exports = {
  handler: createVegetable,
};
