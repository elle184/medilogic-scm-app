/**
 * Utility functions for form handling
 */

/**
 * Creates initial form state
 */
export function createInitialFormState(fields) {
    return fields.reduce((state, field) => {
        state[field] = '';
        return state;
    }, {});
}

/**
 * Updates form field value
 */
export function updateFormField(currentState, fieldName, value) {
    return {
        ...currentState,
        [fieldName]: value
    };
}

/**
 * Resets form to initial state
 */
export function resetForm(initialState) {
    return { ...initialState };
}

/**
 * Checks if form has changes
 */
export function hasFormChanges(currentState, initialState) {
    return Object.keys(currentState).some(
        key => currentState[key] !== initialState[key]
    );
}

/**
 * Gets form errors
 */
export function getFormErrors(values, validationRules) {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
        const rule = validationRules[field];
        const value = values[field];
        
        if (rule.required && (!value || value.trim() === '')) {
            errors[field] = rule.message || `${field} is required`;
        }
    });
    
    return errors;
}

/**
 * Checks if form is valid
 */
export function isFormValid(errors) {
    return Object.keys(errors).length === 0;
}

/**
 * Sanitizes form input
 */
export function sanitizeInput(value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value.trim().replace(/\s+/g, ' ');
}

/**
 * Formats phone number
 */
export function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return cleaned;
}

/**
 * Formats NIT
 */
export function formatNIT(nit) {
    const cleaned = nit.replace(/\D/g, '');
    if (cleaned.length >= 9) {
        return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}${cleaned.slice(9) ? '-' + cleaned.slice(9) : ''}`;
    }
    return cleaned;
}

/**
 * Validates form field on change
 */
export function validateFieldOnChange(fieldName, value, validationRules) {
    const rule = validationRules[fieldName];
    
    if (!rule) {
        return { isValid: true, error: null };
    }
    
    if (rule.required && (!value || value.trim() === '')) {
        return {
            isValid: false,
            error: rule.message || `${fieldName} is required`
        };
    }
    
    if (rule.pattern && !rule.pattern.test(value)) {
        return {
            isValid: false,
            error: rule.patternMessage || `${fieldName} format is invalid`
        };
    }
    
    return { isValid: true, error: null };
}

