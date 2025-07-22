const verifyEmailTemplate = ({ name, url }) => {
  return `
  <p>Dear ${name}</p>
  <p>Thankyou for registering Binkeyit.</p>
  <a href=${url}>Verify Email</a>`;
};

export default verifyEmailTemplate;
