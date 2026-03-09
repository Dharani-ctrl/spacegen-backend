import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    parentName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    currentClass: {
      type: String,
      required: true,
    },
    programInterest: {
      type: String,
      enum: ["Level 1", "Level 2", "Both"],
      required: true,
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "enrolled", "rejected"],
      default: "new",
    },
    notes: String,
    followUpDate: Date,
  },
  { timestamps: true }
);

enquirySchema.index({ email: 1 });
enquirySchema.index({ status: 1 });

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;