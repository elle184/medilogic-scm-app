/**
 * Test real de renderizado para AppBar usando @testing-library/react-native
 * Compatible con React 19 y Expo
 */
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import AppBar from '../AppBar';

describe('AppBar - Renderizado Real', () => {
  test('renderiza correctamente con un título', () => {
    render(<AppBar title="Mi Aplicación" />);
    
    // Buscar el texto usando screen
    const titleElement = screen.getByText('Mi Aplicación');
    expect(titleElement).toBeTruthy();
  });

  test('renderiza con diferentes títulos', () => {
    const { rerender } = render(<AppBar title="Título 1" />);
    
    expect(screen.getByText('Título 1')).toBeTruthy();
    
    // Rerenderizar con un título diferente
    rerender(<AppBar title="Título 2" />);
    
    expect(screen.getByText('Título 2')).toBeTruthy();
  });

  test('muestra el título proporcionado por props', () => {
    render(<AppBar title="Test Title" />);
    
    const title = screen.getByText('Test Title');
    expect(title).toBeTruthy();
    expect(title.props.children).toBe('Test Title');
  });

  test('el componente tiene la estructura correcta', () => {
    const { toJSON } = render(<AppBar title="Test" />);
    const tree = toJSON();
    
    expect(tree).toBeTruthy();
    expect(tree.type).toBe('View');
    expect(tree.children).toBeTruthy();
  });
});

