import React from 'react';

export const createNativeStackNavigator = () => ({
  Navigator: ({ children }) => children,
  Screen: ({ children }) => children,
});

