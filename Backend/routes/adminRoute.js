import express from 'express';
import {
  getAdmin,
  postAdmin,
  deleteAdmin,
  updateAdmin,
  loginAdmin

} from '../controllers/adminController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getAdmin);
router.post('/register', postAdmin);
router.delete('/:id', deleteAdmin);
router.post('/:id', updateAdmin);
router.post('/login', loginAdmin);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;