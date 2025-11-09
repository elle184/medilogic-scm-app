/**
 * Tests for validation utilities
 */
import {
    validateNotEmpty,
    validateNumeric,
    validatePositiveNumber,
    validateEmail,
    validateNIT,
    validatePhone,
    validateClientForm,
    createClientData
} from '../validation';

describe('Validation Utilities', () => {
    describe('validateNotEmpty', () => {
        test('returns true for non-empty string', () => {
            expect(validateNotEmpty('Test')).toBe(true);
            expect(validateNotEmpty('Hello World')).toBe(true);
        });

        test('returns false for empty string', () => {
            expect(validateNotEmpty('')).toBe(false);
        });

        test('returns false for whitespace only', () => {
            expect(validateNotEmpty('   ')).toBe(false);
            expect(validateNotEmpty('\t\n')).toBe(false);
        });

        test('returns false for null/undefined', () => {
            expect(validateNotEmpty(null)).toBeFalsy();
            expect(validateNotEmpty(undefined)).toBeFalsy();
        });
    });

    describe('validateNumeric', () => {
        test('returns true for numeric strings', () => {
            expect(validateNumeric('123')).toBe(true);
            expect(validateNumeric('900123456')).toBe(true);
            expect(validateNumeric('0')).toBe(true);
        });

        test('returns false for non-numeric strings', () => {
            expect(validateNumeric('abc')).toBe(false);
            expect(validateNumeric('12a')).toBe(false);
        });

        test('returns false for empty string', () => {
            expect(validateNumeric('')).toBe(false);
        });
    });

    describe('validatePositiveNumber', () => {
        test('returns true for positive numbers', () => {
            expect(validatePositiveNumber('123')).toBe(true);
            expect(validatePositiveNumber('1')).toBe(true);
            expect(validatePositiveNumber('3001234567')).toBe(true);
        });

        test('returns false for zero', () => {
            expect(validatePositiveNumber('0')).toBe(false);
        });

        test('returns false for negative numbers', () => {
            expect(validatePositiveNumber('-5')).toBe(false);
            expect(validatePositiveNumber('-100')).toBe(false);
        });

        test('returns false for non-numeric', () => {
            expect(validatePositiveNumber('abc')).toBe(false);
        });
    });

    describe('validateEmail', () => {
        test('returns true for valid emails', () => {
            expect(validateEmail('test@example.com')).toBe(true);
            expect(validateEmail('user@domain.co')).toBe(true);
            expect(validateEmail('admin@company.org')).toBe(true);
        });

        test('returns false for invalid emails', () => {
            expect(validateEmail('invalid')).toBe(false);
            expect(validateEmail('test@')).toBe(false);
            expect(validateEmail('@domain.com')).toBe(false);
            expect(validateEmail('test@domain')).toBe(false);
        });
    });

    describe('validateNIT', () => {
        test('returns true for valid NIT (9-10 digits)', () => {
            expect(validateNIT('900123456')).toBe(true);
            expect(validateNIT('1234567890')).toBe(true);
        });

        test('returns false for invalid NIT', () => {
            expect(validateNIT('12345678')).toBe(false); // 8 digits
            expect(validateNIT('12345678901')).toBe(false); // 11 digits
            expect(validateNIT('abcdefghi')).toBe(false); // letters
        });
    });

    describe('validatePhone', () => {
        test('returns true for valid phone (7-10 digits)', () => {
            expect(validatePhone('1234567')).toBe(true);
            expect(validatePhone('3001234567')).toBe(true);
        });

        test('returns false for invalid phone', () => {
            expect(validatePhone('123456')).toBe(false); // 6 digits
            expect(validatePhone('12345678901')).toBe(false); // 11 digits
            expect(validatePhone('abc')).toBe(false); // letters
        });
    });

    describe('validateClientForm', () => {
        test('returns valid for correct data', () => {
            const inputValues = {
                name: 'Test Company',
                nit: '900123456',
                address: 'Calle 123',
                contactName: 'Juan Pérez',
                contactPhoneNumber: '3001234567',
                contactEmailAddress: 'test@company.com'
            };

            const result = validateClientForm(inputValues);
            expect(result.isValid).toBe(true);
            expect(result.errors.name).toBe(false);
            expect(result.errors.nit).toBe(false);
            expect(result.errors.address).toBe(false);
        });

        test('returns invalid for empty name', () => {
            const inputValues = {
                name: '',
                nit: '900123456',
                address: 'Calle 123',
                contactName: 'Juan',
                contactPhoneNumber: '3001234567',
                contactEmailAddress: 'test@company.com'
            };

            const result = validateClientForm(inputValues);
            expect(result.isValid).toBe(false);
            expect(result.errors.name).toBe(true);
        });

        test('returns invalid for non-numeric NIT', () => {
            const inputValues = {
                name: 'Company',
                nit: 'ABC',
                address: 'Calle 123',
                contactName: 'Juan',
                contactPhoneNumber: '3001234567',
                contactEmailAddress: 'test@company.com'
            };

            const result = validateClientForm(inputValues);
            expect(result.isValid).toBe(false);
            expect(result.errors.nit).toBe(true);
        });

        test('returns invalid for zero phone', () => {
            const inputValues = {
                name: 'Company',
                nit: '900123456',
                address: 'Calle 123',
                contactName: 'Juan',
                contactPhoneNumber: '0',
                contactEmailAddress: 'test@company.com'
            };

            const result = validateClientForm(inputValues);
            expect(result.isValid).toBe(false);
            expect(result.errors.contactPhoneNumber).toBe(true);
        });
    });

    describe('createClientData', () => {
        test('creates correct client object', () => {
            const inputValues = {
                name: 'Test Company',
                nit: '900123456',
                address: 'Calle 123',
                contactName: 'Juan',
                contactPhoneNumber: '3001234567',
                contactEmailAddress: 'test@company.com'
            };

            const clientData = createClientData(inputValues);

            expect(clientData).toEqual({
                name: 'Test Company',
                nit: '900123456',
                address: 'Calle 123',
                contactName: 'Juan',
                contactPhoneNumber: '3001234567',
                contactEmailAddress: 'test@company.com'
            });
        });

        test('has all required fields', () => {
            const inputValues = {
                name: 'Test',
                nit: '123',
                address: 'Addr',
                contactName: 'Name',
                contactPhoneNumber: '123',
                contactEmailAddress: 'email'
            };

            const clientData = createClientData(inputValues);

            expect(clientData).toHaveProperty('name');
            expect(clientData).toHaveProperty('nit');
            expect(clientData).toHaveProperty('address');
            expect(clientData).toHaveProperty('contactName');
            expect(clientData).toHaveProperty('contactPhoneNumber');
            expect(clientData).toHaveProperty('contactEmailAddress');
            expect(Object.keys(clientData)).toHaveLength(6);
        });
    });
});

