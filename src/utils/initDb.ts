import AWS from 'aws-sdk';
import { dynamoDB } from './db';

const createProgramsTable = async () => {
  const dynamodb = new AWS.DynamoDB({
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
    region: process.env.DYNAMODB_REGION || 'us-east-1'
  });

  const params = {
    TableName: process.env.TABLE_NAME || 'Programs',
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
    AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'N' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    }
  };

  try {
    await dynamodb.createTable(params).promise();
    console.log('Programs table created successfully');
  } catch (err: any) {
    if (err.code === 'ResourceInUseException') {
      console.log('Table already exists');
    } else {
      console.error('Error creating table:', err);
    }
  }
};

export { createProgramsTable };