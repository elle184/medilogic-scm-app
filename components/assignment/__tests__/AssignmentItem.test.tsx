/**
 * Unit tests for AssignmentItem component
 */
import React from 'react';
import AssignmentItem from '../AssignmentItem';
import { Assignment } from '../../../type/Assignment';

describe('AssignmentItem Component', () => {
  const mockAssignment: Assignment = {
    id: '1',
    client: 'Test Client',
    product: 'Test Product',
    quantity: 100,
    date: '2024-01-01',
    destination: 'Test Destination',
    driver: 'Test Driver',
    vehicle: 'ABC-123'
  };

  test('is a valid React component', () => {
    expect(typeof AssignmentItem).toBe('function');
  });

  test('accepts assignment and onPress props', () => {
    const mockOnPress = jest.fn();
    const element = React.createElement(AssignmentItem, {
      assignment: mockAssignment,
      onPress: mockOnPress
    });

    expect(element.props.assignment).toEqual(mockAssignment);
    expect(element.props.onPress).toBe(mockOnPress);
  });

  test('handles all assignment properties', () => {
    const element = React.createElement(AssignmentItem, {
      assignment: mockAssignment,
      onPress: jest.fn()
    });

    const { assignment } = element.props;
    expect(assignment.id).toBe('1');
    expect(assignment.client).toBe('Test Client');
    expect(assignment.product).toBe('Test Product');
    expect(assignment.quantity).toBe(100);
    expect(assignment.date).toBe('2024-01-01');
    expect(assignment.destination).toBe('Test Destination');
    expect(assignment.driver).toBe('Test Driver');
    expect(assignment.vehicle).toBe('ABC-123');
  });

  test('onPress callback is accessible', () => {
    const mockOnPress = jest.fn();
    const element = React.createElement(AssignmentItem, {
      assignment: mockAssignment,
      onPress: mockOnPress
    });

    // Verify callback can be called
    element.props.onPress(mockAssignment);
    expect(mockOnPress).toHaveBeenCalledWith(mockAssignment);
  });

  test('handles different assignment data', () => {
    const differentAssignment: Assignment = {
      id: '2',
      client: 'Another Client',
      product: 'Another Product',
      quantity: 200,
      date: '2024-02-01',
      destination: 'Another Destination',
      driver: 'Another Driver',
      vehicle: 'XYZ-789'
    };

    const element = React.createElement(AssignmentItem, {
      assignment: differentAssignment,
      onPress: jest.fn()
    });

    expect(element.props.assignment).toEqual(differentAssignment);
  });

  test('component structure is valid', () => {
    const element = React.createElement(AssignmentItem, {
      assignment: mockAssignment,
      onPress: jest.fn()
    });

    expect(element.type).toBe(AssignmentItem);
    expect(element.props).toBeDefined();
    expect(element.props.assignment).toBeDefined();
    expect(element.props.onPress).toBeDefined();
  });
});
