'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

async function getData(event) {
  let responseBody = "";
  let statusCode = 0;

  const id = JSON.parse(event.pathParameters.id);

  const params = {
    TableName: "Fruits",
    KeyConditionExpression: "#id = :idValue",
    ExpressionAttributeNames: {
      "#id": "id"
    },
    ExpressionAttributeValues: {
      ":idValue": `${id}`
    }
  };

  try {
    const data = await documentClient.query(params).promise();
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to get fruit data: ${err}`;
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
}

async function postData(event) {

  let responseBody = "";
  let statusCode = 0;

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
    responseBody = JSON.stringify(data);
    statusCode = 201;
  } catch (err) {
    responseBody = `Unable to put fruits: ${err}`;
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
  getData,
  postData
};