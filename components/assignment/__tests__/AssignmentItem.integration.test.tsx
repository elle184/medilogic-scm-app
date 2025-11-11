/**
 * Integration tests for AssignmentItem component
 */
import AssignmentItem from '../AssignmentItem';
import { Assignment } from '../../../type/Assignment';

describe('AssignmentItem Integration Tests', () => {
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

    test('component is defined', () => {
        expect(AssignmentItem).toBeDefined();
        expect(typeof AssignmentItem).toBe('function');
    });

    test('can create React element from component', () => {
        const React = require('react');
        const element = React.createElement(AssignmentItem, {
            assignment: mockAssignment,
            onPress: jest.fn()
        });
        expect(element).toBeDefined();
        expect(element.type).toBe(AssignmentItem);
    });
});
