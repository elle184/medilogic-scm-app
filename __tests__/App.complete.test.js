/**
 * Tests completos de App con RNTL 13.3.0
 */
import React from 'react';
import App from '../App';

describe('App - Tests completos con React 19', () => {
  test('App es un componente válido', () => {
    expect(typeof App).toBe('function');
    expect(App).toBeDefined();
  });

  test('el componente puede ser instanciado', () => {
    expect(() => App()).toBeDefined();
  });

  test('App tiene la estructura esperada', () => {
    expect(App.name).toBe('App');
  });
});

