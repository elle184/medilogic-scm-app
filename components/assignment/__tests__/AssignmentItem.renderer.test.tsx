/**
 * Tests de AssignmentItem usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import AssignmentItem from '../AssignmentItem';

describe('AssignmentItem - Tests con react-test-renderer', () => {
  const mockItem = {
    institucion_nombre: 'Hospital Central',
    direccion: 'Calle 123',
    contacto_principal: 'Dr. Juan Pérez',
  };

  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(<AssignmentItem item={mockItem} />);
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(<AssignmentItem item={mockItem} />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear con diferentes items', () => {
    const item1 = {
      institucion_nombre: 'Clínica A',
      direccion: 'Av. 1',
      contacto_principal: 'Dr. A',
    };
    
    const item2 = {
      institucion_nombre: 'Hospital B',
      direccion: 'Calle 2',
      contacto_principal: 'Dra. B',
    };

    expect(() => renderer.create(<AssignmentItem item={item1} />)).not.toThrow();
    expect(() => renderer.create(<AssignmentItem item={item2} />)).not.toThrow();
  });

  test('el componente es una función válida', () => {
    expect(typeof AssignmentItem).toBe('function');
    expect(AssignmentItem.length).toBeGreaterThanOrEqual(0);
  });
});

