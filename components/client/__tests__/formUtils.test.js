/**
 * Tests for form utilities
 */
import {
    createInitialFormState,
    updateFormField,
    resetForm,
    hasFormChanges,
    getFormErrors,
    isFormValid,
    sanitizeInput,
    formatPhoneNumber,
    formatNIT,
    validateFieldOnChange
} from '../formUtils';

describe('Form Utilities', () => {
    describe('createInitialFormState', () => {
        test('creates initial state for fields', () => {
            const fields = ['name', 'email', 'phone'];
            const state = createInitialFormState(fields);
            
            expect(state).toEqual({
                name: '',
                email: '',
                phone: ''
            });
        });

        test('handles empty fields array', () => {
            const state = createInitialFormState([]);
            expect(state).toEqual({});
        });
    });

    describe('updateFormField', () => {
        test('updates single field', () => {
            const currentState = { name: '', email: '' };
            const newState = updateFormField(currentState, 'name', 'John');
            
            expect(newState.name).toBe('John');
            expect(newState.email).toBe('');
        });

        test('does not mutate original state', () => {
            const currentState = { name: 'John' };
            const newState = updateFormField(currentState, 'name', 'Jane');
            
            expect(currentState.name).toBe('John');
            expect(newState.name).toBe('Jane');
        });
    });

    describe('resetForm', () => {
        test('resets form to initial state', () => {
            const initialState = { name: '', email: '' };
            const resetState = resetForm(initialState);
            
            expect(resetState).toEqual(initialState);
        });

        test('creates new object', () => {
            const initialState = { name: '' };
            const resetState = resetForm(initialState);
            
            expect(resetState).not.toBe(initialState);
            expect(resetState).toEqual(initialState);
        });
    });

    describe('hasFormChanges', () => {
        test('detects changes', () => {
            const initial = { name: '', email: '' };
            const current = { name: 'John', email: '' };
            
            expect(hasFormChanges(current, initial)).toBe(true);
        });

        test('returns false when no changes', () => {
            const initial = { name: '', email: '' };
            const current = { name: '', email: '' };
            
            expect(hasFormChanges(current, initial)).toBe(false);
        });
    });

    describe('getFormErrors', () => {
        test('returns errors for empty required fields', () => {
            const values = { name: '', email: 'test@test.com' };
            const rules = {
                name: { required: true, message: 'Name is required' },
                email: { required: true }
            };
            
            const errors = getFormErrors(values, rules);
            expect(errors.name).toBe('Name is required');
            expect(errors.email).toBeUndefined();
        });

        test('returns empty object when all fields valid', () => {
            const values = { name: 'John', email: 'test@test.com' };
            const rules = {
                name: { required: true },
                email: { required: true }
            };
            
            const errors = getFormErrors(values, rules);
            expect(Object.keys(errors)).toHaveLength(0);
        });

        test('handles whitespace-only values', () => {
            const values = { name: '   ' };
            const rules = { name: { required: true } };
            
            const errors = getFormErrors(values, rules);
            expect(errors.name).toBeDefined();
        });
    });

    describe('isFormValid', () => {
        test('returns true for empty errors', () => {
            expect(isFormValid({})).toBe(true);
        });

        test('returns false when errors exist', () => {
            const errors = { name: 'Required' };
            expect(isFormValid(errors)).toBe(false);
        });
    });

    describe('sanitizeInput', () => {
        test('trims whitespace', () => {
            expect(sanitizeInput('  test  ')).toBe('test');
        });

        test('replaces multiple spaces with single space', () => {
            expect(sanitizeInput('test    value')).toBe('test value');
        });

        test('handles non-string values', () => {
            expect(sanitizeInput(123)).toBe(123);
            expect(sanitizeInput(null)).toBe(null);
        });
    });

    describe('formatPhoneNumber', () => {
        test('formats 10-digit phone', () => {
            const formatted = formatPhoneNumber('3001234567');
            expect(formatted).toBe('(300) 123-4567');
        });

        test('removes non-digits', () => {
            const formatted = formatPhoneNumber('(300) 123-4567');
            expect(formatted).toBe('(300) 123-4567');
        });

        test('returns cleaned number for invalid length', () => {
            expect(formatPhoneNumber('123')).toBe('123');
        });
    });

    describe('formatNIT', () => {
        test('formats 9-digit NIT', () => {
            const formatted = formatNIT('900123456');
            expect(formatted).toBe('900.123.456');
        });

        test('formats 10-digit NIT with verification digit', () => {
            const formatted = formatNIT('9001234567');
            expect(formatted).toBe('900.123.456-7');
        });

        test('returns cleaned number for invalid length', () => {
            expect(formatNIT('123')).toBe('123');
        });
    });

    describe('validateFieldOnChange', () => {
        test('validates required field', () => {
            const rules = {
                name: { required: true, message: 'Name required' }
            };
            
            const result = validateFieldOnChange('name', '', rules);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Name required');
        });

        test('validates pattern', () => {
            const rules = {
                email: {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    patternMessage: 'Invalid email'
                }
            };
            
            const result = validateFieldOnChange('email', 'invalid', rules);
            expect(result.isValid).toBe(false);
            expect(result.error).toBe('Invalid email');
        });

        test('returns valid for correct input', () => {
            const rules = {
                name: { required: true }
            };
            
            const result = validateFieldOnChange('name', 'John', rules);
            expect(result.isValid).toBe(true);
            expect(result.error).toBe(null);
        });

        test('returns valid when no rule exists', () => {
            const result = validateFieldOnChange('unknown', 'value', {});
            expect(result.isValid).toBe(true);
        });
    });
});

