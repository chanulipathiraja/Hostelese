import express from 'express';
import {
  getEmergency,
  postEmergency,
  deleteEmergency,
  updateEmergency
  

} from '../controllers/emergencyController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/call', getEmergency);
router.post('/register', postEmergency);
router.delete('/edit', deleteEmergency);
router.post('/update', updateEmergency);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;