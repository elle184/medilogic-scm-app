/**
 * Utility functions for styles
 */

/**
 * Creates container style
 */
export function createContainerStyle(options = {}) {
    return {
        flex: options.flex || 1,
        flexDirection: options.flexDirection || 'column',
        backgroundColor: options.backgroundColor || '#fff',
        alignItems: options.alignItems || 'center',
        justifyContent: options.justifyContent || 'center',
        padding: options.padding,
        margin: options.margin
    };
}

/**
 * Creates text style
 */
export function createTextStyle(options = {}) {
    return {
        fontSize: options.fontSize || 16,
        fontWeight: options.fontWeight || 'normal',
        color: options.color || '#000',
        textAlign: options.textAlign || 'left',
        marginBottom: options.marginBottom,
        marginTop: options.marginTop
    };
}

/**
 * Creates button style
 */
export function createButtonStyle(options = {}) {
    return {
        backgroundColor: options.backgroundColor || '#70BBFD',
        padding: options.padding || 10,
        borderRadius: options.borderRadius || 5,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: options.minWidth || 100
    };
}

/**
 * Creates input style
 */
export function createInputStyle(options = {}) {
    return {
        borderWidth: options.borderWidth || 1,
        borderColor: options.borderColor || '#ccc',
        borderRadius: options.borderRadius || 4,
        padding: options.padding || 8,
        fontSize: options.fontSize || 14,
        backgroundColor: options.backgroundColor || '#fff'
    };
}

/**
 * Merges multiple style objects
 */
export function mergeStyles(...styles) {
    return Object.assign({}, ...styles);
}

/**
 * Creates responsive padding
 */
export function createResponsivePadding(size) {
    const multiplier = {
        small: 8,
        medium: 16,
        large: 24
    };
    
    const value = multiplier[size] || multiplier.medium;
    
    return {
        paddingTop: value,
        paddingRight: value,
        paddingBottom: value,
        paddingLeft: value
    };
}

