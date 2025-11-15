import express from 'express';
import {
  getPayment,
  postPayment,
  deletePayment,
  updatePayment,
  getPaymentById
 


} from '../controllers/paymentController.js';
//import { authenticateToken } from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/ ', getPayment);
router.get('/:id', getPaymentById);
router.post('/add', postPayment);
router.delete('/refresh', deletePayment);
router.post('/refresh', updatePayment);


/*router.get('/users', authenticateToken, getstudentName);
router.get('/users/:id', authenticateToken, getAdminById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.get('/profile', authenticateToken, getAdminProfile);*/

export default router;

