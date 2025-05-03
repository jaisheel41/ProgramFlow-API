import { Request, RequestHandler, Response } from 'express';
import * as ProgramService from '../services/programService';
import { isValidProgram } from '../utils/validateProgram';

export const getPrograms: RequestHandler = async (_req, res) => {
  try {
    const programs = await ProgramService.getAllPrograms();
    res.json(programs);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching programs', error: err });
  }
};


export const addProgram: RequestHandler = async (req, res) => {
  const newProgram = req.body;

  if (!isValidProgram(newProgram)) {
    res.status(400).json({ message: 'Invalid program data' });
    return;
  }

  try {
    await ProgramService.addProgram(newProgram);
    res.status(201).json({ message: 'Program added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding program', error: err });
  }
};


export const updateProgram: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);
  const updates = req.body;

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  if (!updates || typeof updates !== 'object') {
    res.status(400).json({ message: 'Invalid update payload' });
    return;
  }

  try {
    await ProgramService.updateProgram(id, updates);
    res.status(200).json({ message: `Program with ID ${id} updated.` });
  } catch (err) {
    res.status(500).json({ message: 'Error updating program', error: err });
  }
};


export const deleteProgram: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  try {
    await ProgramService.deleteProgram(id);
    res.status(200).json({ message: `Program with ID ${id} deleted.` });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting program', error: err });
  }
};

