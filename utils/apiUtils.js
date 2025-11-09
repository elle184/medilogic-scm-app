/**
 * Utility functions for API calls
 */

/**
 * Base URL for API
 */
export const BASE_URL = 'http://34.8.129.243/api/v1';

/**
 * Creates API endpoint URL
 */
export function createEndpoint(path) {
    return `${BASE_URL}${path}`;
}

/**
 * Gets assignments endpoint for a vendor
 */
export function getAssignmentsEndpoint(vendorId) {
    return createEndpoint(`/vendedores/${vendorId}/clientes`);
}

/**
 * Handles API response
 */
export async function handleApiResponse(response) {
    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
}

/**
 * Handles API error
 */
export function handleApiError(error) {
    console.error('API Error:', error);
    return {
        error: true,
        message: error.message || 'Unknown error occurred'
    };
}

/**
 * Creates fetch options
 */
export function createFetchOptions(method = 'GET', body = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return options;
}

/**
 * Makes API call with error handling
 */
export async function apiCall(url, options = {}) {
    try {
        const response = await fetch(url, options);
        return await handleApiResponse(response);
    } catch (error) {
        return handleApiError(error);
    }
}

/**
 * Validates API response data
 */
export function validateResponseData(data) {
    return !!(data && (Array.isArray(data) || typeof data === 'object'));
}

/**
 * Transforms assignment response
 */
export function transformAssignmentResponse(data) {
    if (!Array.isArray(data)) {
        return [];
    }
    
    return data.map(item => ({
        id: item.id || item._id || String(Date.now() + Math.random()),
        client: item.client || item.cliente || '',
        product: item.product || item.producto || '',
        quantity: Number(item.quantity || item.cantidad || 0),
        date: item.date || item.fecha || new Date().toISOString(),
        destination: item.destination || item.destino || '',
        driver: item.driver || item.conductor || '',
        vehicle: item.vehicle || item.vehiculo || ''
    }));
}

