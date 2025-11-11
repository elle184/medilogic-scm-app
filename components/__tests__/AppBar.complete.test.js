/**
 * Test con @testing-library/react-native 13.3.0 (compatible con React 19)
 * Probando si ahora funciona el renderizado completo
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AppBar from '../AppBar';

describe('AppBar - Con RNTL 13.3.0 + React 19', () => {
  test('renderiza y encuentra texto con getByText', () => {
    render(<AppBar title="Test con React 19" />);
    
    const element = screen.getByText('Test con React 19');
    expect(element).toBeTruthy();
  });

  test('encuentra elemento por testID', () => {
    render(<AppBar title="Test testID" />);
    
    const appbar = screen.getByTestId('appbar');
    expect(appbar).toBeTruthy();
  });

  test('verifica que el título se muestra correctamente', () => {
    render(<AppBar title="Mi Aplicación" />);
    
    expect(screen.getByText('Mi Aplicación')).toBeOnTheScreen();
  });

  test('puede rerenderizar con diferentes props', () => {
    const { rerender } = render(<AppBar title="Título 1" />);
    
    expect(screen.getByText('Título 1')).toBeOnTheScreen();
    
    rerender(<AppBar title="Título 2" />);
    
    expect(screen.getByText('Título 2')).toBeOnTheScreen();
  });

  test('snapshot del componente', () => {
    const { toJSON } = render(<AppBar title="Snapshot Test" />);
    expect(toJSON()).toMatchSnapshot();
  });
});

