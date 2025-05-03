import express from 'express';
import { getPrograms, addProgram, deleteProgram, updateProgram} from '../controllers/programController';
import { allowMarketingAndAdmins } from '../middleware/roleCheck';

const router = express.Router();

router.get('/', getPrograms);
router.post('/', allowMarketingAndAdmins, addProgram);
router.put('/:id', allowMarketingAndAdmins, updateProgram);
router.delete('/:id', allowMarketingAndAdmins, deleteProgram);


export default router;
