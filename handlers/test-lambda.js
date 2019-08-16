// --------------------------------------
// getFruitData

'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  const params = {
    TableName: "Fruits",
    Key: {
      id: "001"
    }
  }

  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

}


// --------------------------------------
// putFruitData

'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  // const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

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


// ----------------------------------------------------------------
// deleteFruitData

'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  let responseBody = "";
  let statusCode = 0;

  const { id } = event.pathParameters;

  const params = {
    TableName: "Fruits",
    Key: {
      id: id
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

