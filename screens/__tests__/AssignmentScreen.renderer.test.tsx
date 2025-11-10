/**
 * Tests de AssignmentScreen usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import AssignmentScreen from '../AssignmentScreen';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
) as jest.Mock;

describe('AssignmentScreen - Tests con react-test-renderer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(<AssignmentScreen />);
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(<AssignmentScreen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear múltiples veces sin errores', () => {
    expect(() => renderer.create(<AssignmentScreen />)).not.toThrow();
    expect(() => renderer.create(<AssignmentScreen />)).not.toThrow();
    expect(() => renderer.create(<AssignmentScreen />)).not.toThrow();
  });

  test('el componente es una función válida', () => {
    expect(typeof AssignmentScreen).toBe('function');
    expect(AssignmentScreen.length).toBe(0);
  });

  test('fetch está disponible en el entorno', () => {
    // Verificamos que fetch está mockeado y disponible
    expect(global.fetch).toBeDefined();
    expect(typeof global.fetch).toBe('function');
  });
});

