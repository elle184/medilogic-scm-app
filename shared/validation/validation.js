/**
 * Validation utilities for form inputs
 */

/**
 * Validates if a string is not empty after trimming
 */
export function validateNotEmpty(value) {
    return !!(value && value.trim().length > 0);
}

/**
 * Validates if a value is numeric
 */
export function validateNumeric(value) {
    return !isNaN(value) && value.trim().length > 0;
}

/**
 * Validates if a numeric value is positive
 */
export function validatePositiveNumber(value) {
    return !isNaN(value) && Number(value) > 0;
}

/**
 * Validates email format
 */
export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates NIT format (9-10 digits)
 */
export function validateNIT(nit) {
    const nitRegex = /^\d{9,10}$/;
    return nitRegex.test(nit);
}

/**
 * Validates phone format (7-10 digits)
 */
export function validatePhone(phone) {
    const phoneRegex = /^\d{7,10}$/;
    return phoneRegex.test(phone);
}

/**
 * Validates all client form fields
 */
export function validateClientForm(inputValues) {
    const nameIsValid = validateNotEmpty(inputValues.name);
    const nitIsValid = validateNumeric(inputValues.nit);
    const addressIsValid = validateNotEmpty(inputValues.address);
    const contactNameIsValid = validateNotEmpty(inputValues.contactName);
    const contactPhoneNumberIsValid = validatePositiveNumber(inputValues.contactPhoneNumber);
    const contactEmailAddressIsValid = validateNotEmpty(inputValues.contactEmailAddress);

    return {
        isValid: nameIsValid && nitIsValid && addressIsValid && 
                 contactNameIsValid && contactPhoneNumberIsValid && 
                 contactEmailAddressIsValid,
        errors: {
            name: !nameIsValid,
            nit: !nitIsValid,
            address: !addressIsValid,
            contactName: !contactNameIsValid,
            contactPhoneNumber: !contactPhoneNumberIsValid,
            contactEmailAddress: !contactEmailAddressIsValid,
        }
    };
}

/**
 * Creates a client data object from input values
 */
export function createClientData(inputValues) {
    return {
        name: inputValues.name,
        nit: inputValues.nit,
        address: inputValues.address,
        contactName: inputValues.contactName,
        contactPhoneNumber: inputValues.contactPhoneNumber,
        contactEmailAddress: inputValues.contactEmailAddress
    };
}

