/**
 * Utility functions for assignment handling
 */

/**
 * Filters assignments by search term (searches in client name)
 */
export function filterAssignmentsBySearch(assignments, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') {
        return assignments;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return assignments.filter(assignment => 
        assignment.client && assignment.client.toLowerCase().includes(lowerSearchTerm)
    );
}

/**
 * Sorts assignments by date (newest first)
 */
export function sortAssignmentsByDate(assignments) {
    return [...assignments].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });
}

/**
 * Filters assignments by date range
 */
export function filterAssignmentsByDateRange(assignments, startDate, endDate) {
    return assignments.filter(assignment => {
        const assignmentDate = new Date(assignment.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return assignmentDate >= start && assignmentDate <= end;
    });
}

/**
 * Groups assignments by client
 */
export function groupAssignmentsByClient(assignments) {
    return assignments.reduce((groups, assignment) => {
        const client = assignment.client || 'Unknown';
        if (!groups[client]) {
            groups[client] = [];
        }
        groups[client].push(assignment);
        return groups;
    }, {});
}

/**
 * Calculates total quantity for all assignments
 */
export function calculateTotalQuantity(assignments) {
    return assignments.reduce((total, assignment) => {
        return total + (assignment.quantity || 0);
    }, 0);
}

/**
 * Gets unique clients from assignments
 */
export function getUniqueClients(assignments) {
    const clients = assignments.map(a => a.client).filter(Boolean);
    return [...new Set(clients)];
}

/**
 * Gets unique drivers from assignments
 */
export function getUniqueDrivers(assignments) {
    const drivers = assignments.map(a => a.driver).filter(Boolean);
    return [...new Set(drivers)];
}

/**
 * Validates assignment data
 */
export function validateAssignment(assignment) {
    return {
        isValid: !!(
            assignment.id &&
            assignment.client &&
            assignment.product &&
            assignment.quantity > 0 &&
            assignment.date &&
            assignment.destination &&
            assignment.driver &&
            assignment.vehicle
        ),
        errors: {
            id: !assignment.id,
            client: !assignment.client,
            product: !assignment.product,
            quantity: !(assignment.quantity > 0),
            date: !assignment.date,
            destination: !assignment.destination,
            driver: !assignment.driver,
            vehicle: !assignment.vehicle
        }
    };
}

