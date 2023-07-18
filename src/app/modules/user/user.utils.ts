export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // Regular expression pattern for Bangladeshi phone numbers
  const bdPhoneNumberPattern = /^\+8801\d{9}$/;
  return bdPhoneNumberPattern.test(phoneNumber);
};
