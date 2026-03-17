import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema(
  {
    section: {
      type: String,
      required: [true, 'Section name is required'],
      unique: true,
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, 'Content data is required'],
    },
    lastUpdatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model('Content', contentSchema);

export default Content;
