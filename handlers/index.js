'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

const fetchFruits = async () => {
  const params = {
    TableName: "Fruits"
  }

  let items;
  let data = [];
  let responseBody = '';
  let statusCode = '';

  try {
    do {
      items = await documentClient.scan(params).promise();
      items.Items.forEach((item) => data.push(item));
      params.ExclusiveStartKey = items.LastEvaluatedKey;
    } while (typeof items.LastEvaluatedKey != "undefined");
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

module.exports = {
  handler: fetchFruits,
};
