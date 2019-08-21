'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

const tableName = 'Flora';
const typeName = 'Vegetable';

async function fetchVegetables() {
  let responseBody = "";
  let statusCode = 0;
  let items;
  let data = [];

  const params = {
    TableName: tableName,
    IndexName: 'typeGSI',
    KeyConditionExpression: "#type = :typeValue",
    ExpressionAttributeNames: {
      "#type": "type"
    },
    ExpressionAttributeValues: {
      ":typeValue": `${typeName}`
    }
  }

  try {
    do {
      items = await documentClient.query(params).promise();
      items.Items.forEach((item) => data.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
    responseBody = JSON.stringify(data);
    statusCode = 201;

  } catch (err) {
    responseBody = `Unable to get vegetable data: ${err}`;
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

module.exports = {
  handler: fetchVegetables,
};
