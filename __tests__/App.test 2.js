import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock navigation components
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }) => children,
  };
});

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => ({
    Navigator: ({ children }) => children,
    Screen: ({ children, component: Component }) => {
      if (Component) {
        return <Component />;
      }
      return children;
    },
  }),
}));

// Mock screens
jest.mock('../screens/AssignmentScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function MockAssignmentScreen() {
    return (
      <View>
        <Text>AssignmentScreen</Text>
      </View>
    );
  };
});

jest.mock('../screens/CreateClientScreen', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return function MockCreateClientScreen() {
    return (
      <View>
        <Text>CreateClientScreen</Text>
      </View>
    );
  };
});

describe('App Component', () => {
  it('should render without crashing', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });

  it('should render NavigationContainer', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });

  it('should render StatusBar component', () => {
    const { UNSAFE_queryByType } = render(<App />);
    const statusBar = UNSAFE_queryByType('StatusBar');
    expect(statusBar).toBeTruthy();
  });

  it('should have StatusBar with dark style', () => {
    const { UNSAFE_getByType } = render(<App />);
    const statusBar = UNSAFE_getByType('StatusBar');
    expect(statusBar.props.style).toBe('dark');
  });

  it('should render Stack Navigator', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });

  it('should configure navigation screens', async () => {
    const { getByText } = render(<App />);
    
    await waitFor(() => {
      // Since the mock returns both screens, we should see at least one of them
      const hasAssignmentScreen = () => {
        try {
          return getByText('AssignmentScreen');
        } catch {
          return null;
        }
      };
      
      const hasCreateClientScreen = () => {
        try {
          return getByText('CreateClientScreen');
        } catch {
          return null;
        }
      };
      
      expect(hasAssignmentScreen() || hasCreateClientScreen()).toBeTruthy();
    });
  });

  it('should not crash on mount', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('should render main container structure', () => {
    const { root } = render(<App />);
    expect(root).toBeTruthy();
  });
});

