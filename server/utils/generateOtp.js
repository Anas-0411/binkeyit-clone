const generateOpt = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
  return otp.toString(); // Convert to string for consistency
};

export default generateOpt;
