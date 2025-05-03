import { dynamoDB } from '../utils/db';
import { Program } from '../models/program';

const TABLE_NAME = process.env.TABLE_NAME || 'Programs';

export const getAllPrograms = async (): Promise<Program[]> => {
  const result = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
  return result.Items as Program[];
};

export const addProgram = async (program: Program): Promise<void> => {
  const params = {
    TableName: TABLE_NAME,
    Item: program
  };
  await dynamoDB.put(params).promise();
};

export const updateProgram = async (id: number, updates: Partial<Program>): Promise<void> => {
  const keys = Object.keys(updates);
  if (keys.length === 0) return;

  const UpdateExpression = 'set ' + keys.map((key, i) => `${key} = :val${i}`).join(', ');
  const ExpressionAttributeValues = keys.reduce((acc, key, i) => {
    acc[`:val${i}`] = (updates as any)[key];
    return acc;
  }, {} as Record<string, any>);

  await dynamoDB.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression,
    ExpressionAttributeValues
  }).promise();
};


export const deleteProgram = async (id: number): Promise<void> => {
  await dynamoDB
    .delete({
      TableName: TABLE_NAME,
      Key: { id },
    })
    .promise();
};

export const getProgram = async (id: number): Promise<Program | null> => {
  const params = {
    TableName: TABLE_NAME,
    Key: { id }
  };
  const result = await dynamoDB.get(params).promise();
  return (result.Item as Program) || null;
};

