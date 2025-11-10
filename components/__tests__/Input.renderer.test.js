/**
 * Tests de Input usando react-test-renderer directamente
 * Compatible con React Native 0.81.4 + React 19
 */
import React from 'react';
import renderer from 'react-test-renderer';
import Input from '../Input';

describe('Input - Tests con react-test-renderer', () => {
  test('el componente se puede instanciar sin errores', () => {
    const tree = renderer.create(
      <Input label="Test" textInputConfig={{ value: 'test' }} />
    );
    expect(tree).toBeTruthy();
    expect(tree.getInstance).toBeDefined();
  });

  test('snapshot del componente', () => {
    const tree = renderer.create(
      <Input label="Nombre" textInputConfig={{ value: 'Juan' }} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  test('se puede crear con diferentes labels', () => {
    expect(() => renderer.create(
      <Input label="Nombre" textInputConfig={{}} />
    )).not.toThrow();
    
    expect(() => renderer.create(
      <Input label="Email" textInputConfig={{}} />
    )).not.toThrow();
    
    expect(() => renderer.create(
      <Input label="Teléfono" textInputConfig={{}} />
    )).not.toThrow();
  });

  test('se puede crear con diferentes configuraciones de textInput', () => {
    expect(() => renderer.create(
      <Input 
        label="Test" 
        textInputConfig={{ keyboardType: 'numeric', value: '123' }} 
      />
    )).not.toThrow();
    
    expect(() => renderer.create(
      <Input 
        label="Test" 
        textInputConfig={{ keyboardType: 'email-address', value: 'test@test.com' }} 
      />
    )).not.toThrow();
  });

  test('el componente es una función válida', () => {
    expect(typeof Input).toBe('function');
    expect(Input.length).toBeGreaterThanOrEqual(0);
  });
});

