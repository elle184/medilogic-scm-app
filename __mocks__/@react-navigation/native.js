import React from 'react';

export const NavigationContainer = ({ children }) => children;

export const useNavigation = () => ({
  navigate: jest.fn(),
  goBack: jest.fn(),
  setOptions: jest.fn(),
});

export const useRoute = () => ({
  params: {},
});

export const useFocusEffect = jest.fn();

