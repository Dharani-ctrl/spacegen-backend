import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
    },
    parentName: {
      type: String,
      required: [true, 'Parent name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/, 'Please provide valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      match: [/^[0-9]{10}$/, 'Please provide valid 10-digit phone number'],
    },
    schoolName: {
      type: String,
      required: [true, 'School name is required'],
      trim: true,
    },
    currentClass: {
      type: String,
      required: [true, 'Current class is required'],
    },
    programInterest: {
      type: String,
      enum: ['Level 1', 'Level 2', 'Both'],
      required: [true, 'Program interest is required'],
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'reviewed', 'contacted', 'enrolled', 'rejected'],
      default: 'new',
    },
    notes: {
      type: String,
      trim: true,
    },
    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
enquirySchema.index({ email: 1 });
enquirySchema.index({ status: 1 });
enquirySchema.index({ createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;
