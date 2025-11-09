/**
 * Complete React Native mock for testing
 * Compatible with React 19
 */
import React from 'react';

// Simple mock components that work with react-test-renderer
const mockComponent = (name) => {
  const Component = ({ children, ...props }) => {
    return React.createElement(name, props, children);
  };
  Component.displayName = name;
  return Component;
};

// Core components
export const View = mockComponent('RCTView');
export const Text = mockComponent('RCTText');
export const TextInput = mockComponent('RCTTextInput');
export const ScrollView = mockComponent('RCTScrollView');
export const TouchableOpacity = mockComponent('RCTTouchableOpacity');
export const Button = ({ title, ...props }) => React.createElement('RCTButton', props, title);
export const Image = mockComponent('RCTImage');
export const FlatList = mockComponent('RCTFlatList');
export const ActivityIndicator = mockComponent('RCTActivityIndicator');

// StyleSheet
export const StyleSheet = {
  create: (styles) => styles,
  flatten: (style) => style,
  compose: (style1, style2) => [style1, style2],
};

// Alert
export const Alert = {
  alert: jest.fn(),
  prompt: jest.fn(),
};

// Platform
export const Platform = {
  OS: 'ios',
  Version: '14.0',
  select: jest.fn((obj) => obj.ios || obj.default),
};

// Dimensions
export const Dimensions = {
  get: jest.fn(() => ({ width: 375, height: 667 })),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Keyboard
export const Keyboard = {
  dismiss: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
};

// AppState
export const AppState = {
  currentState: 'active',
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Linking
export const Linking = {
  openURL: jest.fn(),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
  getInitialURL: jest.fn(() => Promise.resolve(null)),
};

// Default export
export default {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Platform,
  Dimensions,
  Keyboard,
  AppState,
  Linking,
};

