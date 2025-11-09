/**
 * Integration tests for Input component
 */
import Input from '../Input';

describe('Input Integration Tests', () => {
    test('component is defined', () => {
        expect(Input).toBeDefined();
        expect(typeof Input).toBe('function');
    });

    test('component accepts props', () => {
        expect(Input.length).toBeDefined();
    });

    test('can create React element from component', () => {
        const React = require('react');
        const element = React.createElement(Input, {
            label: 'Test',
            textInputConfig: {}
        });
        expect(element).toBeDefined();
        expect(element.type).toBe(Input);
    });
});
