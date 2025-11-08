import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import AssignmentScreen from '../AssignmentScreen';

// Mock fetch
global.fetch = jest.fn();

describe('AssignmentScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator initially', () => {
    (global.fetch as jest.Mock).mockImplementation(() => 
      new Promise(() => {}) // Never resolves to keep loading state
    );

    const { UNSAFE_getByType } = render(<AssignmentScreen />);
    expect(UNSAFE_getByType('ActivityIndicator')).toBeTruthy();
  });

  it('should fetch and display assignments on mount', async () => {
    const mockData = [
      {
        id: 1,
        vendedor_id: 1,
        institucion_nombre: 'Hospital General',
        direccion: 'Calle 123',
        contacto_principal: 'Dr. Juan Pérez'
      },
      {
        id: 2,
        vendedor_id: 1,
        institucion_nombre: 'Clínica del Norte',
        direccion: 'Avenida 456',
        contacto_principal: 'Dra. María González'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { getByText, UNSAFE_queryByType } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    });

    await waitFor(() => {
      expect(getByText('Hospital General')).toBeTruthy();
      expect(getByText('Clínica del Norte')).toBeTruthy();
    });
  });

  it('should call fetch with correct URL', async () => {
    const mockData = [];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    render(<AssignmentScreen />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://34.8.129.243/api/v1/vendedores/1/clientes'
      );
    });
  });

  it('should handle empty assignment list', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => [],
    });

    const { UNSAFE_queryByType, queryByText } = render(<AssignmentScreen />);

    // Wait for loading to finish
    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    }, { timeout: 3000 });

    // Verify component has rendered (no assignments to show)
    expect(queryByText('Test Hospital')).toBeNull();
  });

  it('should handle fetch error gracefully', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { UNSAFE_queryByType } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    });

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    
    consoleLogSpy.mockRestore();
  });

  it('should display multiple assignments', async () => {
    const mockData = [
      {
        id: 1,
        vendedor_id: 1,
        institucion_nombre: 'Hospital A',
        direccion: 'Dirección A',
        contacto_principal: 'Contacto A'
      },
      {
        id: 2,
        vendedor_id: 1,
        institucion_nombre: 'Hospital B',
        direccion: 'Dirección B',
        contacto_principal: 'Contacto B'
      },
      {
        id: 3,
        vendedor_id: 1,
        institucion_nombre: 'Hospital C',
        direccion: 'Dirección C',
        contacto_principal: 'Contacto C'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { getByText } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(getByText('Hospital A')).toBeTruthy();
      expect(getByText('Hospital B')).toBeTruthy();
      expect(getByText('Hospital C')).toBeTruthy();
    });
  });

  it('should render FlatList with correct data', async () => {
    const mockData = [
      {
        id: 1,
        vendedor_id: 1,
        institucion_nombre: 'Test Hospital',
        direccion: 'Test Address',
        contacto_principal: 'Test Contact'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { UNSAFE_queryByType, getByText } = render(<AssignmentScreen />);

    // Wait for loading to finish first
    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    }, { timeout: 3000 });

    // Check for the data rendered in the list
    await waitFor(() => {
      expect(getByText('Test Hospital')).toBeTruthy();
      expect(getByText('Test Address')).toBeTruthy();
    }, { timeout: 3000 });
  });

  it('should set loading to false after successful fetch', async () => {
    const mockData = [
      {
        id: 1,
        vendedor_id: 1,
        institucion_nombre: 'Hospital',
        direccion: 'Address',
        contacto_principal: 'Contact'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { UNSAFE_queryByType } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    });
  });

  it('should set loading to false after fetch error', async () => {
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Error'));

    const { UNSAFE_queryByType } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(UNSAFE_queryByType('ActivityIndicator')).toBeNull();
    });
    
    consoleLogSpy.mockRestore();
  });

  it('should render assignments with all required fields', async () => {
    const mockData = [
      {
        id: 1,
        vendedor_id: 1,
        institucion_nombre: 'Complete Hospital',
        direccion: 'Full Address 123',
        contacto_principal: 'Dr. Complete Contact - 3001234567'
      }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { getByText } = render(<AssignmentScreen />);

    await waitFor(() => {
      expect(getByText('Complete Hospital')).toBeTruthy();
      expect(getByText('Full Address 123')).toBeTruthy();
      expect(getByText('Dr. Complete Contact - 3001234567')).toBeTruthy();
    });
  });
});

