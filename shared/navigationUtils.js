/**
 * Utility functions for navigation
 */

/**
 * Gets the screen configuration
 */
export function getScreenConfig() {
    return {
        assignments: {
            name: 'Mis asignaciones',
            title: 'Mis asignaciones'
        },
        createClient: {
            name: 'Crear cliente institucional',
            title: 'Crear cliente institucional'
        }
    };
}

/**
 * Gets initial route name
 */
export function getInitialRouteName() {
    return 'Crear cliente institucional';
}

/**
 * Validates navigation params
 */
export function validateNavigationParams(params) {
    return !!(params && typeof params === 'object');
}

/**
 * Creates navigation options
 */
export function createNavigationOptions(title) {
    return {
        title: title || 'Default Title',
        headerStyle: {
            backgroundColor: '#70BBFD',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };
}

/**
 * Extracts route parameters safely
 */
export function extractRouteParams(route, defaultParams = {}) {
    if (!route || !route.params) {
        return defaultParams;
    }
    return route.params;
}

