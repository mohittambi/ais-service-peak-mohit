'use strict';
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

async function fetchFruits(event) {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  const params = {
    TableName: "Fruits",
    Key: {
      id: "101"
    }
  }

  try {
    const data = await documentClient.get(params).promise();

    return {
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err);
  }

}

module.exports = {
  handler: fetchFruits,
};
