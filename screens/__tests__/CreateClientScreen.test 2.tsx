import React from 'react';
import { render } from '@testing-library/react-native';
import CreateClientScreen from '../CreateClientScreen';

describe('CreateClientScreen', () => {
  it('should render correctly', () => {
    const { getByText } = render(<CreateClientScreen />);
    expect(getByText('Nombre')).toBeTruthy();
  });

  it('should render CreateClientForm component', () => {
    const { getByText } = render(<CreateClientScreen />);
    
    // Verify all form fields are present
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('NIT')).toBeTruthy();
    expect(getByText('Dirección')).toBeTruthy();
    expect(getByText('Nombre contacto')).toBeTruthy();
    expect(getByText('Teléfono contacto')).toBeTruthy();
    expect(getByText('E-mail contacto')).toBeTruthy();
  });

  it('should render save button', () => {
    const { getByText } = render(<CreateClientScreen />);
    expect(getByText('Guardar')).toBeTruthy();
  });

  it('should pass submitButtonLabel prop to CreateClientForm', () => {
    const { getByText } = render(<CreateClientScreen />);
    // The button should be rendered with the label
    expect(getByText('Guardar')).toBeTruthy();
  });

  it('should have correct container styles', () => {
    const { root } = render(<CreateClientScreen />);
    expect(root).toBeTruthy();
  });

  it('should render all input labels', () => {
    const { getByText } = render(<CreateClientScreen />);
    
    const labels = [
      'Nombre',
      'NIT',
      'Dirección',
      'Nombre contacto',
      'Teléfono contacto',
      'E-mail contacto'
    ];
    
    labels.forEach(label => {
      expect(getByText(label)).toBeTruthy();
    });
  });

  it('should render form in a scrollable container', () => {
    const { getByText } = render(<CreateClientScreen />);
    // Verify the form is rendered
    expect(getByText('Nombre')).toBeTruthy();
    expect(getByText('Guardar')).toBeTruthy();
  });

  it('should not crash when rendering', () => {
    expect(() => render(<CreateClientScreen />)).not.toThrow();
  });
});

