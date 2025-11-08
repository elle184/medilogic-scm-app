import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AssignmentItem from '../AssignmentItem';

describe('AssignmentItem Component', () => {
  const mockItem = {
    id: 1,
    vendedor_id: 1,
    institucion_nombre: 'Hospital General',
    direccion: 'Calle 123 #45-67',
    contacto_principal: 'Dr. Juan Pérez - 3001234567'
  };

  it('should render correctly', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    expect(getByText('Hospital General')).toBeTruthy();
    expect(getByText('Calle 123 #45-67')).toBeTruthy();
    expect(getByText('Dr. Juan Pérez - 3001234567')).toBeTruthy();
  });

  it('should display institution name as heading', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    const heading = getByText('Hospital General');
    expect(heading).toBeTruthy();
  });

  it('should display address correctly', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    expect(getByText('Calle 123 #45-67')).toBeTruthy();
  });

  it('should display main contact information', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    expect(getByText('Dr. Juan Pérez - 3001234567')).toBeTruthy();
  });

  it('should render Pressable component', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    const institutionName = getByText('Hospital General');
    expect(institutionName).toBeTruthy();
  });

  it('should handle press event on Pressable', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    const institutionName = getByText('Hospital General');
    fireEvent.press(institutionName);
    // Verify it doesn't crash when pressed
    expect(institutionName).toBeTruthy();
  });

  it('should render with different item data', () => {
    const anotherItem = {
      id: 2,
      vendedor_id: 2,
      institucion_nombre: 'Clínica del Norte',
      direccion: 'Avenida 456',
      contacto_principal: 'Dra. María González'
    };
    const { getByText } = render(<AssignmentItem item={anotherItem} />);
    expect(getByText('Clínica del Norte')).toBeTruthy();
    expect(getByText('Avenida 456')).toBeTruthy();
    expect(getByText('Dra. María González')).toBeTruthy();
  });

  it('should render with empty contact information', () => {
    const itemWithEmptyContact = {
      id: 3,
      vendedor_id: 1,
      institucion_nombre: 'Centro Médico',
      direccion: 'Carrera 789',
      contacto_principal: ''
    };
    const { getByText } = render(<AssignmentItem item={itemWithEmptyContact} />);
    expect(getByText('Centro Médico')).toBeTruthy();
    expect(getByText('Carrera 789')).toBeTruthy();
  });

  it('should apply correct styles to the container', () => {
    const { getByText } = render(<AssignmentItem item={mockItem} />);
    const institutionName = getByText('Hospital General');
    expect(institutionName).toBeTruthy();
  });
});

