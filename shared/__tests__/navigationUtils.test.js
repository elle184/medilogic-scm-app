/**
 * Tests for navigation utilities
 */
import {
    getScreenConfig,
    getInitialRouteName,
    validateNavigationParams,
    createNavigationOptions,
    extractRouteParams
} from '../navigationUtils';

describe('Navigation Utilities', () => {
    describe('getScreenConfig', () => {
        test('returns correct screen configuration', () => {
            const config = getScreenConfig();
            expect(config).toHaveProperty('assignments');
            expect(config).toHaveProperty('createClient');
        });

        test('assignments config has correct properties', () => {
            const config = getScreenConfig();
            expect(config.assignments.name).toBe('Mis asignaciones');
            expect(config.assignments.title).toBe('Mis asignaciones');
        });

        test('createClient config has correct properties', () => {
            const config = getScreenConfig();
            expect(config.createClient.name).toBe('Crear cliente institucional');
            expect(config.createClient.title).toBe('Crear cliente institucional');
        });
    });

    describe('getInitialRouteName', () => {
        test('returns correct initial route', () => {
            const routeName = getInitialRouteName();
            expect(routeName).toBe('Crear cliente institucional');
        });

        test('returns a string', () => {
            const routeName = getInitialRouteName();
            expect(typeof routeName).toBe('string');
        });
    });

    describe('validateNavigationParams', () => {
        test('validates correct params object', () => {
            const params = { id: '1', name: 'Test' };
            expect(validateNavigationParams(params)).toBe(true);
        });

        test('validates empty object', () => {
            expect(validateNavigationParams({})).toBe(true);
        });

        test('invalidates null', () => {
            expect(validateNavigationParams(null)).toBe(false);
        });

        test('invalidates undefined', () => {
            expect(validateNavigationParams(undefined)).toBe(false);
        });

        test('invalidates non-object types', () => {
            expect(validateNavigationParams('string')).toBe(false);
            expect(validateNavigationParams(123)).toBe(false);
            expect(validateNavigationParams(true)).toBe(false);
        });
    });

    describe('createNavigationOptions', () => {
        test('creates options with provided title', () => {
            const options = createNavigationOptions('Test Title');
            expect(options.title).toBe('Test Title');
        });

        test('uses default title when none provided', () => {
            const options = createNavigationOptions();
            expect(options.title).toBe('Default Title');
        });

        test('includes header styles', () => {
            const options = createNavigationOptions('Test');
            expect(options).toHaveProperty('headerStyle');
            expect(options).toHaveProperty('headerTintColor');
            expect(options).toHaveProperty('headerTitleStyle');
        });

        test('sets correct header background color', () => {
            const options = createNavigationOptions('Test');
            expect(options.headerStyle.backgroundColor).toBe('#70BBFD');
        });

        test('sets correct header tint color', () => {
            const options = createNavigationOptions('Test');
            expect(options.headerTintColor).toBe('#fff');
        });

        test('sets header title to bold', () => {
            const options = createNavigationOptions('Test');
            expect(options.headerTitleStyle.fontWeight).toBe('bold');
        });
    });

    describe('extractRouteParams', () => {
        test('extracts params from valid route', () => {
            const route = {
                params: { id: '1', name: 'Test' }
            };
            const params = extractRouteParams(route);
            expect(params).toEqual({ id: '1', name: 'Test' });
        });

        test('returns default params when route is null', () => {
            const defaultParams = { id: 'default' };
            const params = extractRouteParams(null, defaultParams);
            expect(params).toEqual(defaultParams);
        });

        test('returns default params when params are missing', () => {
            const route = {};
            const defaultParams = { id: 'default' };
            const params = extractRouteParams(route, defaultParams);
            expect(params).toEqual(defaultParams);
        });

        test('returns empty object when no default provided', () => {
            const route = {};
            const params = extractRouteParams(route);
            expect(params).toEqual({});
        });
    });
});

