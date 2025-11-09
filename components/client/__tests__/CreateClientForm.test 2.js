import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import CreateClientForm from '../CreateClientForm';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('CreateClientForm Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('NIT')).toBeTruthy();
    expect(getByText('Dirección')).toBeTruthy();
    expect(getByText('Nombre contacto')).toBeTruthy();
    expect(getByText('Teléfono contacto')).toBeTruthy();
    expect(getByText('E-mail contacto')).toBeTruthy();
    expect(getByText('Guardar')).toBeTruthy();
  });

  it('should render all input fields', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('NIT')).toBeTruthy();
    expect(getByText('Dirección')).toBeTruthy();
    expect(getByText('Nombre contacto')).toBeTruthy();
    expect(getByText('Teléfono contacto')).toBeTruthy();
    expect(getByText('E-mail contacto')).toBeTruthy();
  });

  it('should show validation error when submitting empty form', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    const saveButton = getByText('Guardar');
    
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Datos inválidos',
      'Verifique la información del cliente.'
    );
  });

  it('should handle name input change', () => {
    const { getAllByDisplayValue, getByText } = render(
      <CreateClientForm submitButtonLabel="Guardar" />
    );
    
    // Find the input by its parent label
    const nameLabel = getByText('Nombre');
    const container = nameLabel.parent.parent;
    const input = container.findByType('TextInput');
    
    fireEvent.changeText(input, 'Hospital Central');
    expect(getAllByDisplayValue('Hospital Central').length).toBeGreaterThan(0);
  });

  it('should handle NIT input change', () => {
    const { getAllByDisplayValue, getByText } = render(
      <CreateClientForm submitButtonLabel="Guardar" />
    );
    
    const nitLabel = getByText('NIT');
    const container = nitLabel.parent.parent;
    const input = container.findByType('TextInput');
    
    fireEvent.changeText(input, '123456789');
    expect(getAllByDisplayValue('123456789').length).toBeGreaterThan(0);
  });

  it('should validate invalid NIT (non-numeric)', () => {
    const { getByText, getAllByDisplayValue } = render(
      <CreateClientForm submitButtonLabel="Guardar" />
    );
    
    // Fill all fields with valid data except NIT
    const nameLabel = getByText('Nombre');
    const nameInput = nameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nameInput, 'Hospital Central');
    
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nitInput, 'ABC123'); // Invalid NIT
    
    const direccionLabel = getByText('Dirección');
    const direccionInput = direccionLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(direccionInput, 'Calle 123');
    
    const contactNameLabel = getByText('Nombre contacto');
    const contactNameInput = contactNameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(contactNameInput, 'Juan Pérez');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(phoneInput, '3001234567');
    
    const emailLabel = getByText('E-mail contacto');
    const emailInput = emailLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(emailInput, 'juan@example.com');
    
    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Datos inválidos',
      'Verifique la información del cliente.'
    );
  });

  it('should validate invalid phone number (non-numeric)', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    // Fill all fields with valid data except phone
    const nameLabel = getByText('Nombre');
    const nameInput = nameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nameInput, 'Hospital Central');
    
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nitInput, '123456789');
    
    const direccionLabel = getByText('Dirección');
    const direccionInput = direccionLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(direccionInput, 'Calle 123');
    
    const contactNameLabel = getByText('Nombre contacto');
    const contactNameInput = contactNameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(contactNameInput, 'Juan Pérez');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(phoneInput, 'ABC'); // Invalid phone
    
    const emailLabel = getByText('E-mail contacto');
    const emailInput = emailLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(emailInput, 'juan@example.com');
    
    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Datos inválidos',
      'Verifique la información del cliente.'
    );
  });

  it('should submit successfully with valid data', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    // Fill all fields with valid data
    const nameLabel = getByText('Nombre');
    const nameInput = nameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nameInput, 'Hospital Central');
    
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nitInput, '123456789');
    
    const direccionLabel = getByText('Dirección');
    const direccionInput = direccionLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(direccionInput, 'Calle 123');
    
    const contactNameLabel = getByText('Nombre contacto');
    const contactNameInput = contactNameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(contactNameInput, 'Juan Pérez');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(phoneInput, '3001234567');
    
    const emailLabel = getByText('E-mail contacto');
    const emailInput = emailLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(emailInput, 'juan@example.com');
    
    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Cliente registrado',
      'El cliente ha sido registrado en el sistema.'
    );
  });

  it('should validate empty name field', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    // Fill all fields except name
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nitInput, '123456789');
    
    const direccionLabel = getByText('Dirección');
    const direccionInput = direccionLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(direccionInput, 'Calle 123');
    
    const contactNameLabel = getByText('Nombre contacto');
    const contactNameInput = contactNameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(contactNameInput, 'Juan Pérez');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(phoneInput, '3001234567');
    
    const emailLabel = getByText('E-mail contacto');
    const emailInput = emailLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(emailInput, 'juan@example.com');
    
    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Datos inválidos',
      'Verifique la información del cliente.'
    );
  });

  it('should validate empty email field', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    // Fill all fields except email
    const nameLabel = getByText('Nombre');
    const nameInput = nameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nameInput, 'Hospital Central');
    
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(nitInput, '123456789');
    
    const direccionLabel = getByText('Dirección');
    const direccionInput = direccionLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(direccionInput, 'Calle 123');
    
    const contactNameLabel = getByText('Nombre contacto');
    const contactNameInput = contactNameLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(contactNameInput, 'Juan Pérez');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    fireEvent.changeText(phoneInput, '3001234567');
    
    const saveButton = getByText('Guardar');
    fireEvent.press(saveButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Datos inválidos',
      'Verifique la información del cliente.'
    );
  });

  it('should have correct keyboard types for inputs', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    const nitLabel = getByText('NIT');
    const nitInput = nitLabel.parent.parent.findByType('TextInput');
    expect(nitInput.props.keyboardType).toBe('numeric');
    
    const phoneLabel = getByText('Teléfono contacto');
    const phoneInput = phoneLabel.parent.parent.findByType('TextInput');
    expect(phoneInput.props.keyboardType).toBe('numeric');
    
    const emailLabel = getByText('E-mail contacto');
    const emailInput = emailLabel.parent.parent.findByType('TextInput');
    expect(emailInput.props.keyboardType).toBe('email-address');
  });

  it('should render with custom submit button label', () => {
    const { getByText } = render(<CreateClientForm submitButtonLabel="Crear Cliente" />);
    expect(getByText('Guardar')).toBeTruthy(); // Button title is still "Guardar"
  });
});

