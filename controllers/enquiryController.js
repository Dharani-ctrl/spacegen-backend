import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    console.log("Incoming Enquiry:", req.body);

    const {
      studentName,
      parentName,
      email,
      phone,
      schoolName,
      currentClass,
      programInterest,
      message,
    } = req.body;

    // Required field validation
    if (
      !studentName ||
      !parentName ||
      !email ||
      !phone ||
      !schoolName ||
      !currentClass ||
      !programInterest
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check duplicate email
    const existingEnquiry = await Enquiry.findOne({ email });

    if (existingEnquiry) {
      return res.status(409).json({
        success: false,
        message: "This email has already submitted an enquiry",
      });
    }

    // Create enquiry
    const enquiry = await Enquiry.create({
      studentName,
      parentName,
      email,
      phone,
      schoolName,
      currentClass,
      programInterest,
      message,
    });

    console.log(`✅ Enquiry saved from ${email}`);

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });

  } catch (error) {
    console.error("❌ Enquiry Creation Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating enquiry",
    });
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
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      enquiries,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export const getEnquiryById = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      enquiry,
    });

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
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry updated",
      enquiry,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    res.json({
      success: true,
      message: "Enquiry deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};