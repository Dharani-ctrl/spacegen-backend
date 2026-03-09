import Enquiry from '../models/Enquiry.js';
import { validateEnquiry } from '../utils/validators.js';

export const createEnquiry = async (req, res) => {
  try {
    const { studentName, parentName, email, phone, schoolName, currentClass, programInterest, message } = req.body;

    // Validate
    const validation = validateEnquiry(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    // Check if enquiry already exists
    const existingEnquiry = await Enquiry.findOne({ email });
    if (existingEnquiry) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Create enquiry
    const enquiry = new Enquiry({
      studentName,
      parentName,
      email,
      phone,
      schoolName,
      currentClass,
      programInterest,
      message,
    });

    await enquiry.save();

    console.log(`[Enquiry] New enquiry saved successfully from: ${email}`);

    res.status(201).json({
      message: 'Enquiry submitted successfully',
      enquiry,
    });
  } catch (error) {
    console.error('[Enquiry] Creation Error:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getAllEnquiries = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = status ? { status } : {};
    const skip = (page - 1) * limit;

    const enquiries = await Enquiry.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Enquiry.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      enquiries,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateEnquiry = async (req, res) => {
  try {
    const { status, notes, followUpDate } = req.body;

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status, notes, followUpDate },
      { new: true, runValidators: true }
    );

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json({ message: 'Enquiry updated', enquiry });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    res.json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
