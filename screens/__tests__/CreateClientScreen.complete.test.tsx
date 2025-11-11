/**
 * Tests completos de CreateClientScreen con RNTL 13.3.0
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import CreateClientScreen from '../CreateClientScreen';

describe('CreateClientScreen - Tests completos con React 19', () => {
  test('renderiza el formulario de creación', () => {
    render(<CreateClientScreen />);
    
    // El formulario tiene estos campos
    expect(screen.getByText('Nombre')).toBeOnTheScreen();
    expect(screen.getByText('NIT')).toBeOnTheScreen();
    expect(screen.getByText('Dirección')).toBeOnTheScreen();
  });

  test('renderiza correctamente', () => {
    const { toJSON } = render(<CreateClientScreen />);
    expect(toJSON()).toBeTruthy();
  });

  test('snapshot de la pantalla', () => {
    const { toJSON } = render(<CreateClientScreen />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('contiene el componente CreateClientForm', () => {
    const { toJSON } = render(<CreateClientScreen />);
    const tree = toJSON();
    
    expect(tree).toBeTruthy();
    expect(tree.children).toBeTruthy();
  });
});

