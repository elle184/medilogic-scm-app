/**
 * Tests de CreateClientForm usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import CreateClientForm from '../CreateClientForm';

// Mock Alert para evitar errores en tests
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('CreateClientForm - Tests con react-test-renderer', () => {
  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(<CreateClientForm submitButtonLabel="Guardar" />);
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(<CreateClientForm submitButtonLabel="Guardar Cliente" />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear con diferentes labels de botón', () => {
    expect(() => renderer.create(
      <CreateClientForm submitButtonLabel="Guardar" />
    )).not.toThrow();
    
    expect(() => renderer.create(
      <CreateClientForm submitButtonLabel="Registrar" />
    )).not.toThrow();
    
    expect(() => renderer.create(
      <CreateClientForm submitButtonLabel="Crear" />
    )).not.toThrow();
  });

  test('el componente es una función válida', () => {
    expect(typeof CreateClientForm).toBe('function');
    expect(CreateClientForm.length).toBeGreaterThanOrEqual(0);
  });
});

