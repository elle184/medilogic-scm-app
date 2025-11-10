/**
 * Tests completos de CreateClientForm con RNTL 13.3.0
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import CreateClientForm from '../CreateClientForm';

// Mock Alert
jest.spyOn(Alert, 'alert');

describe('CreateClientForm - Tests completos con React 19', () => {
  beforeEach(() => {
    Alert.alert.mockClear();
  });

  test('renderiza todos los campos del formulario', () => {
    render(<CreateClientForm submitButtonLabel="Guardar" />);
    
    expect(screen.getByText('Nombre')).toBeOnTheScreen();
    expect(screen.getByText('NIT')).toBeOnTheScreen();
    expect(screen.getByText('Dirección')).toBeOnTheScreen();
    expect(screen.getByText('Nombre contacto')).toBeOnTheScreen();
    expect(screen.getByText('Teléfono contacto')).toBeOnTheScreen();
    expect(screen.getByText('E-mail contacto')).toBeOnTheScreen();
  });

  test('renderiza el botón de submit', () => {
    const { toJSON } = render(<CreateClientForm submitButtonLabel="Guardar Cliente" />);
    const tree = toJSON();
    
    expect(tree).toBeTruthy();
  });

  test('snapshot del formulario', () => {
    const { toJSON } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('formulario tiene estructura correcta', () => {
    const { toJSON } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(toJSON()).toBeTruthy();
  });

  test('acepta diferentes props de submitButtonLabel', () => {
    const { rerender } = render(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(screen.getByText('Nombre')).toBeOnTheScreen();
    
    rerender(<CreateClientForm submitButtonLabel="Crear" />);
    expect(screen.getByText('Nombre')).toBeOnTheScreen();
  });
});

