import { Program } from '../models/program';

export const isValidProgram = (obj: any): obj is Program => {
  return (
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.topic === 'string' &&
    Array.isArray(obj.learningFormats) &&
    typeof obj.bestseller === 'boolean' &&
    typeof obj.startDate === 'string'
  );
};
