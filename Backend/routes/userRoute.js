import express from 'express';
import {
  getUser,
  postUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserById,
  deleteUserById
  

} from '../controllers/userController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getUser);
router.get('/:id', getUserById);

router.delete('/:id', deleteUserById);
router.post('/register', postUser);
router.delete('/:id', deleteUser);
router.put('/refresh', updateUser);
router.post('/login', loginUser);


/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;