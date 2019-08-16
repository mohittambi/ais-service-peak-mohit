'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "eu-west-1" });

exports.handler = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });

  const params = {
    TableName: "Fruits",
    Key: {
      id: "101"
    }
  }

  try {
    const data = await documentClient.get(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }

}

let data = [{
  id: 1,
  name: "apple",
  quantity: "10"
},
{
  id: 2,
  name: "orange",
  quantity: "3"
}];

async function storeData(event) {
  // console.log(event);
  console.log("HELLO Mr");
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}

module.exports = {
  handler: storeData,
};
