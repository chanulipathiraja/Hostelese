import express from 'express';
import {
  getUser,
  postUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserById

} from '../controllers/userController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/register', postUser);
router.delete('/refresh', deleteUser);
router.post('/refresh', updateUser);
router.post('/login', loginUser);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;