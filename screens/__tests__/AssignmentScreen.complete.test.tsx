/**
 * Tests completos de AssignmentScreen con RNTL 13.3.0
 */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import AssignmentScreen from '../AssignmentScreen';

// Mock fetch
global.fetch = jest.fn();

describe('AssignmentScreen - Tests completos con React 19', () => {
  beforeEach(() => {
    global.fetch.mockClear();
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ instituciones: [] }),
    });
  });

  test('renderiza correctamente', () => {
    const { toJSON } = render(<AssignmentScreen />);
    expect(toJSON()).toBeTruthy();
  });

  test('realiza fetch al montar el componente', () => {
    render(<AssignmentScreen />);
    
    // useEffect se ejecuta después del renderizado
    expect(global.fetch).toHaveBeenCalled();
  });

  test('estructura correcta del componente', () => {
    const { toJSON } = render(<AssignmentScreen />);
    const tree = toJSON();
    
    expect(tree).toBeTruthy();
    expect(tree.type).toBe('RCTView');
  });

  test('snapshot de la pantalla', () => {
    const { toJSON } = render(<AssignmentScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});

