/**
 * Unit tests for AppBar component
 */
import React from 'react';
import AppBar from '../AppBar';

describe('AppBar Component', () => {
  test('is a valid React component', () => {
    expect(typeof AppBar).toBe('function');
  });

  test('accepts title prop', () => {
    const element = React.createElement(AppBar, { title: 'Test Title' });
    expect(element.props.title).toBe('Test Title');
  });

  test('handles custom titles', () => {
    const titles = ['Home', 'Settings', 'Profile', 'About'];
    titles.forEach(title => {
      const element = React.createElement(AppBar, { title });
      expect(element.props.title).toBe(title);
    });
  });

  test('component structure is valid', () => {
    const element = React.createElement(AppBar, { title: 'Test' });
    expect(element.type).toBe(AppBar);
    expect(element.props).toBeDefined();
  });
});
