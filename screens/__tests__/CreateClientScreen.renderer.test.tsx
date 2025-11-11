/**
 * Tests de CreateClientScreen usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import CreateClientScreen from '../CreateClientScreen';

describe('CreateClientScreen - Tests con react-test-renderer', () => {
  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(<CreateClientScreen />);
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(<CreateClientScreen />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear múltiples veces sin errores', () => {
    expect(() => renderer.create(<CreateClientScreen />)).not.toThrow();
    expect(() => renderer.create(<CreateClientScreen />)).not.toThrow();
    expect(() => renderer.create(<CreateClientScreen />)).not.toThrow();
  });

  test('el componente es una función válida', () => {
    expect(typeof CreateClientScreen).toBe('function');
    expect(CreateClientScreen.length).toBe(0);
  });
});

