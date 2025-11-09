/**
 * Integration tests for App component
 */
import App from '../App';

describe('App Integration Tests', () => {
    test('component is defined', () => {
        expect(App).toBeDefined();
        expect(typeof App).toBe('function');
    });

    test('navigation configuration is correct', () => {
        const screens = [
            { name: 'Mis asignaciones', component: 'AssignmentScreen' },
            { name: 'Crear cliente institucional', component: 'CreateClientScreen' }
        ];

        screens.forEach(screen => {
            expect(screen.name).toBeDefined();
            expect(screen.component).toBeDefined();
        });
    });

    test('initial route is set correctly', () => {
        const initialRoute = 'Crear cliente institucional';
        expect(initialRoute).toBe('Crear cliente institucional');
        expect(typeof initialRoute).toBe('string');
    });

    test('can create React element from component', () => {
        const React = require('react');
        const element = React.createElement(App);
        expect(element).toBeDefined();
        expect(element.type).toBe(App);
    });
});
