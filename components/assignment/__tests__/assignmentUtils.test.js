/**
 * Tests for assignment utilities
 */
import {
    filterAssignmentsBySearch,
    sortAssignmentsByDate,
    filterAssignmentsByDateRange,
    groupAssignmentsByClient,
    calculateTotalQuantity,
    getUniqueClients,
    getUniqueDrivers,
    validateAssignment
} from '../assignmentUtils';

describe('Assignment Utilities', () => {
    const mockAssignments = [
        {
            id: '1',
            client: 'Hospital Central',
            product: 'Product A',
            quantity: 100,
            date: '2024-01-15',
            destination: 'Dest 1',
            driver: 'Juan Pérez',
            vehicle: 'ABC-123'
        },
        {
            id: '2',
            client: 'Clínica Norte',
            product: 'Product B',
            quantity: 200,
            date: '2024-02-20',
            destination: 'Dest 2',
            driver: 'María López',
            vehicle: 'XYZ-789'
        },
        {
            id: '3',
            client: 'Hospital Central',
            product: 'Product C',
            quantity: 150,
            date: '2024-01-10',
            destination: 'Dest 3',
            driver: 'Juan Pérez',
            vehicle: 'DEF-456'
        }
    ];

    describe('filterAssignmentsBySearch', () => {
        test('filters assignments by client name', () => {
            const result = filterAssignmentsBySearch(mockAssignments, 'hospital');
            expect(result).toHaveLength(2);
            expect(result[0].client).toBe('Hospital Central');
        });

        test('is case insensitive', () => {
            const result = filterAssignmentsBySearch(mockAssignments, 'HOSPITAL');
            expect(result).toHaveLength(2);
        });

        test('returns all assignments for empty search', () => {
            const result = filterAssignmentsBySearch(mockAssignments, '');
            expect(result).toHaveLength(3);
        });

        test('returns empty array for no matches', () => {
            const result = filterAssignmentsBySearch(mockAssignments, 'nonexistent');
            expect(result).toHaveLength(0);
        });
    });

    describe('sortAssignmentsByDate', () => {
        test('sorts assignments by date (newest first)', () => {
            const result = sortAssignmentsByDate(mockAssignments);
            expect(result[0].date).toBe('2024-02-20');
            expect(result[1].date).toBe('2024-01-15');
            expect(result[2].date).toBe('2024-01-10');
        });

        test('does not mutate original array', () => {
            const original = [...mockAssignments];
            sortAssignmentsByDate(mockAssignments);
            expect(mockAssignments).toEqual(original);
        });
    });

    describe('filterAssignmentsByDateRange', () => {
        test('filters assignments within date range', () => {
            const result = filterAssignmentsByDateRange(
                mockAssignments,
                '2024-01-01',
                '2024-01-31'
            );
            expect(result).toHaveLength(2);
        });

        test('includes boundary dates', () => {
            const result = filterAssignmentsByDateRange(
                mockAssignments,
                '2024-01-15',
                '2024-01-15'
            );
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('1');
        });
    });

    describe('groupAssignmentsByClient', () => {
        test('groups assignments by client name', () => {
            const result = groupAssignmentsByClient(mockAssignments);
            expect(result['Hospital Central']).toHaveLength(2);
            expect(result['Clínica Norte']).toHaveLength(1);
        });

        test('creates correct group structure', () => {
            const result = groupAssignmentsByClient(mockAssignments);
            expect(Object.keys(result)).toHaveLength(2);
        });
    });

    describe('calculateTotalQuantity', () => {
        test('calculates total quantity', () => {
            const result = calculateTotalQuantity(mockAssignments);
            expect(result).toBe(450); // 100 + 200 + 150
        });

        test('returns 0 for empty array', () => {
            const result = calculateTotalQuantity([]);
            expect(result).toBe(0);
        });

        test('handles missing quantity', () => {
            const assignmentsWithMissing = [
                { quantity: 100 },
                { quantity: null },
                { quantity: 50 }
            ];
            const result = calculateTotalQuantity(assignmentsWithMissing);
            expect(result).toBe(150);
        });
    });

    describe('getUniqueClients', () => {
        test('returns unique client names', () => {
            const result = getUniqueClients(mockAssignments);
            expect(result).toHaveLength(2);
            expect(result).toContain('Hospital Central');
            expect(result).toContain('Clínica Norte');
        });

        test('filters out null/undefined clients', () => {
            const assignmentsWithNull = [
                ...mockAssignments,
                { id: '4', client: null }
            ];
            const result = getUniqueClients(assignmentsWithNull);
            expect(result).toHaveLength(2);
        });
    });

    describe('getUniqueDrivers', () => {
        test('returns unique driver names', () => {
            const result = getUniqueDrivers(mockAssignments);
            expect(result).toHaveLength(2);
            expect(result).toContain('Juan Pérez');
            expect(result).toContain('María López');
        });
    });

    describe('validateAssignment', () => {
        test('validates complete assignment', () => {
            const result = validateAssignment(mockAssignments[0]);
            expect(result.isValid).toBe(true);
            expect(result.errors.id).toBe(false);
            expect(result.errors.client).toBe(false);
        });

        test('invalidates assignment with missing id', () => {
            const invalid = { ...mockAssignments[0], id: null };
            const result = validateAssignment(invalid);
            expect(result.isValid).toBe(false);
            expect(result.errors.id).toBe(true);
        });

        test('invalidates assignment with zero quantity', () => {
            const invalid = { ...mockAssignments[0], quantity: 0 };
            const result = validateAssignment(invalid);
            expect(result.isValid).toBe(false);
            expect(result.errors.quantity).toBe(true);
        });

        test('invalidates assignment with negative quantity', () => {
            const invalid = { ...mockAssignments[0], quantity: -10 };
            const result = validateAssignment(invalid);
            expect(result.isValid).toBe(false);
            expect(result.errors.quantity).toBe(true);
        });

        test('invalidates assignment with missing fields', () => {
            const invalid = {
                id: '1',
                client: 'Test',
                product: null,
                quantity: 0,
                date: '',
                destination: '',
                driver: '',
                vehicle: ''
            };
            const result = validateAssignment(invalid);
            expect(result.isValid).toBe(false);
            expect(result.errors.product).toBe(true);
            expect(result.errors.quantity).toBe(true);
            expect(result.errors.date).toBe(true);
        });
    });
});

