import express from 'express';
import protect from '../middleware/auth.js';
import {
  createEnquiry,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../controllers/enquiryController.js';

const router = express.Router();

// Public routes
router.post('/', createEnquiry);

// Protected routes
router.get('/', protect, getAllEnquiries);
router.get('/:id', protect, getEnquiryById);
router.patch('/:id', protect, updateEnquiry);
router.delete('/:id', protect, deleteEnquiry);

export default router;
