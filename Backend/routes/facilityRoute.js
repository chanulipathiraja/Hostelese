import express from 'express';
import {
  getFacility,
  postFacility,
  deleteFacility,
  updateFacility,
  

} from '../controllers/facilityController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', getFacility);
router.delete('/register', deleteFacility);
router.post('/:id', updateFacility);
router.post('/login', postFacility);

/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;