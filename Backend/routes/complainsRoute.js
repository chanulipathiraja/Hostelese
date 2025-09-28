import express from 'express';
import {
  getComplains,
  postComplains,
  deleteComplains,
  updateComplains,
  getComplainsById,
 

} from '../controllers/complainsController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getComplains);
router.get('/:id', getComplainsById);
router.post('/register', postComplains);
router.delete('/refresh', deleteComplains);
router.post('/refresh', updateComplains);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;