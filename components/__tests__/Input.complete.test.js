/**
 * Tests completos de Input con RNTL 13.3.0 (React 19 compatible)
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Input from '../Input';

describe('Input - Tests completos con React 19', () => {
  test('renderiza con label y textInput', () => {
    render(
      <Input 
        label="Nombre" 
        textInputConfig={{ value: 'Juan', placeholder: 'Ingrese nombre' }} 
      />
    );
    
    expect(screen.getByText('Nombre')).toBeOnTheScreen();
  });

  test('muestra el label proporcionado', () => {
    render(
      <Input 
        label="Email" 
        textInputConfig={{ value: '' }} 
      />
    );
    
    const label = screen.getByText('Email');
    expect(label).toBeTruthy();
  });

  test('puede renderizar con diferentes labels', () => {
    const { rerender } = render(
      <Input label="Campo 1" textInputConfig={{}} />
    );
    
    expect(screen.getByText('Campo 1')).toBeOnTheScreen();
    
    rerender(<Input label="Campo 2" textInputConfig={{}} />);
    
    expect(screen.getByText('Campo 2')).toBeOnTheScreen();
  });

  test('acepta configuración de textInput', () => {
    render(
      <Input 
        label="Teléfono" 
        textInputConfig={{ 
          keyboardType: 'numeric',
          value: '123456',
          placeholder: 'Ingrese teléfono'
        }} 
      />
    );
    
    expect(screen.getByText('Teléfono')).toBeOnTheScreen();
  });

  test('snapshot del componente', () => {
    const { toJSON } = render(
      <Input 
        label="Test Label" 
        textInputConfig={{ value: 'test value' }} 
      />
    );
    
    expect(toJSON()).toMatchSnapshot();
  });

  test('estructura del componente es correcta', () => {
    const { toJSON } = render(
      <Input 
        label="Estructura" 
        textInputConfig={{ value: '' }} 
      />
    );
    
    const tree = toJSON();
    expect(tree).toBeTruthy();
    expect(tree.type).toBe('RCTView'); // React Native internal component
    expect(tree.children).toHaveLength(2); // Label + TextInput
  });

  test('acepta múltiples configuraciones de textInput', () => {
    render(
      <Input 
        label="Email" 
        textInputConfig={{ 
          keyboardType: 'email-address',
          autoCapitalize: 'none',
          value: 'test@example.com'
        }} 
      />
    );
    
    expect(screen.getByText('Email')).toBeOnTheScreen();
  });
});

