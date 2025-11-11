/**
 * Tests de App usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

// Mock NavigationContainer
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }) => children,
}));

// Mock createNativeStackNavigator
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children }) => children,
  }),
}));

describe('App - Tests con react-test-renderer', () => {
  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(<App />);
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(<App />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear múltiples veces sin errores', () => {
    expect(() => renderer.create(<App />)).not.toThrow();
    expect(() => renderer.create(<App />)).not.toThrow();
    expect(() => renderer.create(<App />)).not.toThrow();
  });

  test('el componente App es una función válida', () => {
    expect(typeof App).toBe('function');
    expect(App.length).toBe(0);
  });
});

