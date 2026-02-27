export const validateEnquiry = (data) => {
  const { studentName, parentName, email, phone, schoolName, currentClass, programInterest } = data;

  if (!studentName || studentName.trim().length < 2) {
    return { valid: false, error: 'Student name must be at least 2 characters' };
  }

  if (!parentName || parentName.trim().length < 2) {
    return { valid: false, error: 'Parent name must be at least 2 characters' };
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
  if (!email || !emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phone || !phoneRegex.test(phone)) {
    return { valid: false, error: 'Invalid 10-digit phone number' };
  }

  if (!schoolName || schoolName.trim().length < 2) {
    return { valid: false, error: 'School name is required' };
  }

  if (!currentClass) {
    return { valid: false, error: 'Current class is required' };
  }

  const validPrograms = ['Level 1', 'Level 2', 'Both'];
  if (!programInterest || !validPrograms.includes(programInterest)) {
    return { valid: false, error: 'Invalid program selected' };
  }

  return { valid: true };
};

export default validateEnquiry;
