/**
 * Tests for API utilities
 */
import {
    BASE_URL,
    createEndpoint,
    getAssignmentsEndpoint,
    handleApiResponse,
    handleApiError,
    createFetchOptions,
    validateResponseData,
    transformAssignmentResponse
} from '../apiClient';

describe('API Utilities', () => {
    describe('BASE_URL', () => {
        test('is defined', () => {
            expect(BASE_URL).toBeDefined();
            expect(typeof BASE_URL).toBe('string');
        });

        test('has correct value', () => {
            expect(BASE_URL).toBe('http://34.8.129.243/api/v1');
        });
    });

    describe('createEndpoint', () => {
        test('creates endpoint with path', () => {
            const endpoint = createEndpoint('/test');
            expect(endpoint).toBe('http://34.8.129.243/api/v1/test');
        });

        test('handles paths without leading slash', () => {
            const endpoint = createEndpoint('test');
            expect(endpoint).toBe('http://34.8.129.243/api/v1test');
        });

        test('creates endpoint with complex path', () => {
            const endpoint = createEndpoint('/vendedores/1/clientes');
            expect(endpoint).toBe('http://34.8.129.243/api/v1/vendedores/1/clientes');
        });
    });

    describe('getAssignmentsEndpoint', () => {
        test('creates assignments endpoint for vendor', () => {
            const endpoint = getAssignmentsEndpoint(1);
            expect(endpoint).toBe('http://34.8.129.243/api/v1/vendedores/1/clientes');
        });

        test('handles different vendor IDs', () => {
            expect(getAssignmentsEndpoint(1)).toContain('/vendedores/1/');
            expect(getAssignmentsEndpoint(99)).toContain('/vendedores/99/');
        });
    });

    describe('handleApiResponse', () => {
        test('handles successful response', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({ data: 'test' })
            };
            
            const result = await handleApiResponse(mockResponse);
            expect(result).toEqual({ data: 'test' });
            expect(mockResponse.json).toHaveBeenCalled();
        });

        test('throws error for failed response', async () => {
            const mockResponse = {
                ok: false,
                status: 404
            };
            
            await expect(handleApiResponse(mockResponse)).rejects.toThrow('API Error: 404');
        });
    });

    describe('handleApiError', () => {
        test('logs error and returns error object', () => {
            const mockError = new Error('Test error');
            const result = handleApiError(mockError);
            
            expect(result.error).toBe(true);
            expect(result.message).toBe('Test error');
        });

        test('handles error without message', () => {
            const result = handleApiError({});
            expect(result.error).toBe(true);
            expect(result.message).toBe('Unknown error occurred');
        });
    });

    describe('createFetchOptions', () => {
        test('creates GET options by default', () => {
            const options = createFetchOptions();
            expect(options.method).toBe('GET');
            expect(options.headers['Content-Type']).toBe('application/json');
        });

        test('creates POST options with body', () => {
            const body = { name: 'Test' };
            const options = createFetchOptions('POST', body);
            
            expect(options.method).toBe('POST');
            expect(options.body).toBe(JSON.stringify(body));
        });

        test('creates PUT options', () => {
            const options = createFetchOptions('PUT');
            expect(options.method).toBe('PUT');
        });

        test('does not include body for GET', () => {
            const options = createFetchOptions('GET');
            expect(options.body).toBeUndefined();
        });
    });

    describe('validateResponseData', () => {
        test('validates array data', () => {
            expect(validateResponseData([])).toBe(true);
            expect(validateResponseData([1, 2, 3])).toBe(true);
        });

        test('validates object data', () => {
            expect(validateResponseData({})).toBe(true);
            expect(validateResponseData({ key: 'value' })).toBe(true);
        });

        test('invalidates null', () => {
            expect(validateResponseData(null)).toBe(false);
        });

        test('invalidates undefined', () => {
            expect(validateResponseData(undefined)).toBe(false);
        });

        test('invalidates primitive types', () => {
            expect(validateResponseData('string')).toBe(false);
            expect(validateResponseData(123)).toBe(false);
            expect(validateResponseData(true)).toBe(false);
        });
    });

    describe('transformAssignmentResponse', () => {
        test('transforms array of assignments', () => {
            const data = [
                {
                    id: '1',
                    client: 'Test Client',
                    product: 'Test Product',
                    quantity: 100,
                    date: '2024-01-01',
                    destination: 'Test Dest',
                    driver: 'Test Driver',
                    vehicle: 'ABC-123'
                }
            ];
            
            const result = transformAssignmentResponse(data);
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('1');
            expect(result[0].client).toBe('Test Client');
        });

        test('handles Spanish field names', () => {
            const data = [
                {
                    _id: '1',
                    cliente: 'Cliente Test',
                    producto: 'Producto Test',
                    cantidad: 50,
                    fecha: '2024-01-01',
                    destino: 'Destino Test',
                    conductor: 'Conductor Test',
                    vehiculo: 'XYZ-789'
                }
            ];
            
            const result = transformAssignmentResponse(data);
            expect(result[0].client).toBe('Cliente Test');
            expect(result[0].product).toBe('Producto Test');
            expect(result[0].quantity).toBe(50);
        });

        test('returns empty array for non-array input', () => {
            expect(transformAssignmentResponse(null)).toEqual([]);
            expect(transformAssignmentResponse({})).toEqual([]);
            expect(transformAssignmentResponse('string')).toEqual([]);
        });

        test('generates ID when missing', () => {
            const data = [{ client: 'Test' }];
            const result = transformAssignmentResponse(data);
            
            expect(result[0].id).toBeDefined();
            expect(typeof result[0].id).toBe('string');
        });

        test('provides default values for missing fields', () => {
            const data = [{}];
            const result = transformAssignmentResponse(data);
            
            expect(result[0].client).toBe('');
            expect(result[0].product).toBe('');
            expect(result[0].quantity).toBe(0);
            expect(result[0].destination).toBe('');
            expect(result[0].driver).toBe('');
            expect(result[0].vehicle).toBe('');
        });

        test('converts quantity to number', () => {
            const data = [{ quantity: '100' }];
            const result = transformAssignmentResponse(data);
            
            expect(typeof result[0].quantity).toBe('number');
            expect(result[0].quantity).toBe(100);
        });
    });
});

