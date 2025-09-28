import express from 'express';
import {
  getRoom,
  postRoom,
  deleteRoom,
  updateRoom,
  getRoomById

} from '../controllers/roomController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();
router.get('/:id', getRoomById);
router.get('/', getRoom);
router.post('/register', postRoom);
router.delete('/refresh', deleteRoom);
router.post('/refresh', updateRoom);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;