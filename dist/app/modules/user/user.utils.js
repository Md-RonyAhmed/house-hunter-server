"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePhoneNumber = void 0;
const validatePhoneNumber = (phoneNumber) => {
    // Regular expression pattern for Bangladeshi phone numbers
    const bdPhoneNumberPattern = /^\+8801\d{9}$/;
    return bdPhoneNumberPattern.test(phoneNumber);
};
exports.validatePhoneNumber = validatePhoneNumber;
