import express from 'express';
import {
  getHostel,
  postHostel,
  updateHostel,
  getHostelById,
  deleteHostelById


} from '../controllers/hostelController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getHostel);
router.get('/:id', getHostelById);
router.delete('/:id', deleteHostelById);
router.post('/register', postHostel);
router.post('/refresh', updateHostel);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;