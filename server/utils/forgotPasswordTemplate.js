const forgotPasswordTemplate = ({ name, opt }) => {
  return `
    <html>
      <body>
        <h1>Reset Your Password</h1>
        <p>Hi ${name},</p>
        <p>We received a request to reset your password. Use the following OTP to reset your password:</p>
        <h2 style="background: yellow; padding:20px; text-align:center; font-weight:800">${opt}</h2>
        <p>This OTP is valid for 1 hour.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you!</p>
        <p>Best regards, Binkeyit.</p>
      </body>
    </html>
  `;
};

export default forgotPasswordTemplate;
