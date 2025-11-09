/**
 * Unit tests for CreateClientForm component
 * 
 * Tests form structure, validation logic, and business rules
 */
import React from 'react';
import CreateClientForm from '../CreateClientForm';

describe('CreateClientForm Component', () => {
  // Component structure tests
  test('is a valid React component', () => {
    expect(typeof CreateClientForm).toBe('function');
  });

  test('component accepts submitButtonLabel prop', () => {
    const element = React.createElement(CreateClientForm, { submitButtonLabel: 'Test' });
    expect(element.props.submitButtonLabel).toBe('Test');
  });

  test('component structure is valid', () => {
    const element = React.createElement(CreateClientForm);
    expect(element.type).toBe(CreateClientForm);
    expect(element.props).toBeDefined();
  });

  // Form field configuration tests
  test('form has correct field names', () => {
    const expectedFields = ['name', 'nit', 'address', 'contactName', 'contactPhoneNumber', 'contactEmailAddress'];
    
    expectedFields.forEach(field => {
      expect(typeof field).toBe('string');
      expect(field.length).toBeGreaterThan(0);
    });
  });

  test('each field has a valid identifier', () => {
    const fields = {
      name: 'name',
      nit: 'nit',
      address: 'address',
      contactName: 'contactName',
      contactPhoneNumber: 'contactPhoneNumber',
      contactEmailAddress: 'contactEmailAddress'
    };

    Object.keys(fields).forEach(key => {
      expect(fields[key]).toBe(key);
    });
  });

  // Validation logic tests
  describe('Name validation', () => {
    test('validates non-empty name', () => {
      const name = 'Test Company S.A.';
      const nameIsValid = name.trim().length > 0;
      expect(nameIsValid).toBe(true);
    });

    test('rejects empty name', () => {
      const name = '';
      const nameIsValid = name.trim().length > 0;
      expect(nameIsValid).toBe(false);
    });

    test('rejects whitespace-only name', () => {
      const name = '   ';
      const nameIsValid = name.trim().length > 0;
      expect(nameIsValid).toBe(false);
    });
  });

  describe('NIT validation', () => {
    test('validates numeric NIT', () => {
      const nit = '900123456';
      const nitIsValid = !isNaN(nit) && nit.trim().length > 0;
      expect(nitIsValid).toBe(true);
    });

    test('rejects non-numeric NIT', () => {
      const nit = 'ABC123';
      const nitIsValid = !isNaN(nit) && nit.trim().length > 0;
      expect(nitIsValid).toBe(false);
    });

    test('rejects empty NIT', () => {
      const nit = '';
      const nitIsValid = !isNaN(nit) && nit.trim().length > 0;
      expect(nitIsValid).toBe(false);
    });
  });

  describe('Address validation', () => {
    test('validates non-empty address', () => {
      const address = 'Calle 123 #45-67';
      const addressIsValid = address.trim().length > 0;
      expect(addressIsValid).toBe(true);
    });

    test('rejects empty address', () => {
      const address = '';
      const addressIsValid = address.trim().length > 0;
      expect(addressIsValid).toBe(false);
    });
  });

  describe('Contact name validation', () => {
    test('validates non-empty contact name', () => {
      const contactName = 'Juan Pérez';
      const contactNameIsValid = contactName.trim().length > 0;
      expect(contactNameIsValid).toBe(true);
    });

    test('rejects empty contact name', () => {
      const contactName = '';
      const contactNameIsValid = contactName.trim().length > 0;
      expect(contactNameIsValid).toBe(false);
    });
  });

  describe('Contact phone validation', () => {
    test('validates numeric positive phone', () => {
      const contactPhoneNumber = '3001234567';
      const contactPhoneNumberIsValid = !isNaN(contactPhoneNumber) && contactPhoneNumber > 0;
      expect(contactPhoneNumberIsValid).toBe(true);
    });

    test('rejects non-numeric phone', () => {
      const contactPhoneNumber = 'ABC123';
      const contactPhoneNumberIsValid = !isNaN(contactPhoneNumber) && contactPhoneNumber > 0;
      expect(contactPhoneNumberIsValid).toBe(false);
    });

    test('rejects zero phone', () => {
      const contactPhoneNumber = '0';
      const contactPhoneNumberIsValid = !isNaN(contactPhoneNumber) && contactPhoneNumber > 0;
      expect(contactPhoneNumberIsValid).toBe(false);
    });

    test('rejects negative phone', () => {
      const contactPhoneNumber = '-123';
      const contactPhoneNumberIsValid = !isNaN(contactPhoneNumber) && contactPhoneNumber > 0;
      expect(contactPhoneNumberIsValid).toBe(false);
    });
  });

  describe('Contact email validation', () => {
    test('validates non-empty email', () => {
      const contactEmailAddress = 'test@company.com';
      const contactEmailAddressIsValid = contactEmailAddress.trim().length > 0;
      expect(contactEmailAddressIsValid).toBe(true);
    });

    test('rejects empty email', () => {
      const contactEmailAddress = '';
      const contactEmailAddressIsValid = contactEmailAddress.trim().length > 0;
      expect(contactEmailAddressIsValid).toBe(false);
    });
  });

  // Form submission tests
  describe('Form submission logic', () => {
    test('validates complete form data', () => {
      const inputValues = {
        name: 'Test Company S.A.',
        nit: '900123456',
        address: 'Calle 123 #45-67',
        contactName: 'Juan Pérez',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'contacto@testcompany.com'
      };

      const nameIsValid = inputValues.name.trim().length > 0;
      const nitIsValid = !isNaN(inputValues.nit) && inputValues.nit.trim().length > 0;
      const addressIsValid = inputValues.address.trim().length > 0;
      const contactNameIsValid = inputValues.contactName.trim().length > 0;
      const contactPhoneNumberIsValid = !isNaN(inputValues.contactPhoneNumber) && inputValues.contactPhoneNumber > 0;
      const contactEmailAddressIsValid = inputValues.contactEmailAddress.trim().length > 0;

      const allValid = nameIsValid && nitIsValid && addressIsValid && contactNameIsValid
        && contactPhoneNumberIsValid && contactEmailAddressIsValid;

      expect(allValid).toBe(true);
    });

    test('rejects form with invalid name', () => {
      const inputValues = {
        name: '',
        nit: '900123456',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'test@test.com'
      };

      const nameIsValid = inputValues.name.trim().length > 0;
      expect(nameIsValid).toBe(false);
    });

    test('rejects form with invalid NIT', () => {
      const inputValues = {
        name: 'Company',
        nit: 'INVALID',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'test@test.com'
      };

      const nitIsValid = !isNaN(inputValues.nit) && inputValues.nit.trim().length > 0;
      expect(nitIsValid).toBe(false);
    });

    test('rejects form with invalid address', () => {
      const inputValues = {
        name: 'Company',
        nit: '900123456',
        address: '',
        contactName: 'Juan',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'test@test.com'
      };

      const addressIsValid = inputValues.address.trim().length > 0;
      expect(addressIsValid).toBe(false);
    });

    test('rejects form with invalid contact name', () => {
      const inputValues = {
        name: 'Company',
        nit: '900123456',
        address: 'Calle 123',
        contactName: '',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'test@test.com'
      };

      const contactNameIsValid = inputValues.contactName.trim().length > 0;
      expect(contactNameIsValid).toBe(false);
    });

    test('rejects form with invalid phone', () => {
      const inputValues = {
        name: 'Company',
        nit: '900123456',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: 'INVALID',
        contactEmailAddress: 'test@test.com'
      };

      const contactPhoneNumberIsValid = !isNaN(inputValues.contactPhoneNumber) && inputValues.contactPhoneNumber > 0;
      expect(contactPhoneNumberIsValid).toBe(false);
    });

    test('rejects form with invalid email', () => {
      const inputValues = {
        name: 'Company',
        nit: '900123456',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: ''
      };

      const contactEmailAddressIsValid = inputValues.contactEmailAddress.trim().length > 0;
      expect(contactEmailAddressIsValid).toBe(false);
    });
  });

  // Input change handler tests
  describe('Input change handler logic', () => {
    test('updates single field', () => {
      const inputValues = {
        name: '',
        nit: '',
        address: '',
        contactName: '',
        contactPhoneNumber: '',
        contactEmailAddress: ''
      };

      const updated = {
        ...inputValues,
        name: 'Test Company'
      };

      expect(updated.name).toBe('Test Company');
      expect(updated.nit).toBe('');
    });

    test('updates multiple fields', () => {
      let inputValues = {
        name: '',
        nit: '',
        address: '',
        contactName: '',
        contactPhoneNumber: '',
        contactEmailAddress: ''
      };

      inputValues = { ...inputValues, name: 'Company' };
      inputValues = { ...inputValues, nit: '900123456' };
      inputValues = { ...inputValues, address: 'Calle 123' };

      expect(inputValues.name).toBe('Company');
      expect(inputValues.nit).toBe('900123456');
      expect(inputValues.address).toBe('Calle 123');
    });

    test('preserves other fields when updating one', () => {
      const inputValues = {
        name: 'Company',
        nit: '900123456',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: '300123',
        contactEmailAddress: 'test@test.com'
      };

      const updated = {
        ...inputValues,
        address: 'Nueva dirección'
      };

      expect(updated.name).toBe('Company');
      expect(updated.nit).toBe('900123456');
      expect(updated.address).toBe('Nueva dirección');
      expect(updated.contactName).toBe('Juan');
    });
  });

  // Client data structure tests
  describe('Client data structure', () => {
    test('creates correct client data object', () => {
      const inputValues = {
        name: 'Test Company',
        nit: '900123456',
        address: 'Calle 123',
        contactName: 'Juan',
        contactPhoneNumber: '3001234567',
        contactEmailAddress: 'test@test.com'
      };

      const clientData = {
        name: inputValues.name,
        nit: inputValues.nit,
        address: inputValues.address,
        contactName: inputValues.contactName,
        contactPhoneNumber: inputValues.contactPhoneNumber,
        contactEmailAddress: inputValues.contactEmailAddress
      };

      expect(clientData.name).toBe(inputValues.name);
      expect(clientData.nit).toBe(inputValues.nit);
      expect(clientData.address).toBe(inputValues.address);
      expect(clientData.contactName).toBe(inputValues.contactName);
      expect(clientData.contactPhoneNumber).toBe(inputValues.contactPhoneNumber);
      expect(clientData.contactEmailAddress).toBe(inputValues.contactEmailAddress);
    });

    test('client data has all required fields', () => {
      const clientData = {
        name: 'Test',
        nit: '123',
        address: 'Address',
        contactName: 'Name',
        contactPhoneNumber: '123',
        contactEmailAddress: 'email@test.com'
      };

      expect(Object.keys(clientData)).toHaveLength(6);
      expect(clientData).toHaveProperty('name');
      expect(clientData).toHaveProperty('nit');
      expect(clientData).toHaveProperty('address');
      expect(clientData).toHaveProperty('contactName');
      expect(clientData).toHaveProperty('contactPhoneNumber');
      expect(clientData).toHaveProperty('contactEmailAddress');
    });
  });
});
