/**
 * Tests for style utilities
 */
import {
    createContainerStyle,
    createTextStyle,
    createButtonStyle,
    createInputStyle,
    mergeStyles,
    createResponsivePadding
} from '../styleUtils';

describe('Style Utilities', () => {
    describe('createContainerStyle', () => {
        test('creates container with default values', () => {
            const style = createContainerStyle();
            expect(style.flex).toBe(1);
            expect(style.flexDirection).toBe('column');
            expect(style.backgroundColor).toBe('#fff');
            expect(style.alignItems).toBe('center');
            expect(style.justifyContent).toBe('center');
        });

        test('creates container with custom values', () => {
            const options = {
                flex: 2,
                backgroundColor: '#000',
                padding: 20
            };
            const style = createContainerStyle(options);
            expect(style.flex).toBe(2);
            expect(style.backgroundColor).toBe('#000');
            expect(style.padding).toBe(20);
        });

        test('overrides only specified values', () => {
            const style = createContainerStyle({ flexDirection: 'row' });
            expect(style.flexDirection).toBe('row');
            expect(style.backgroundColor).toBe('#fff'); // default
        });
    });

    describe('createTextStyle', () => {
        test('creates text style with defaults', () => {
            const style = createTextStyle();
            expect(style.fontSize).toBe(16);
            expect(style.fontWeight).toBe('normal');
            expect(style.color).toBe('#000');
            expect(style.textAlign).toBe('left');
        });

        test('creates text style with custom values', () => {
            const options = {
                fontSize: 20,
                fontWeight: 'bold',
                color: '#70BBFD'
            };
            const style = createTextStyle(options);
            expect(style.fontSize).toBe(20);
            expect(style.fontWeight).toBe('bold');
            expect(style.color).toBe('#70BBFD');
        });
    });

    describe('createButtonStyle', () => {
        test('creates button style with defaults', () => {
            const style = createButtonStyle();
            expect(style.backgroundColor).toBe('#70BBFD');
            expect(style.padding).toBe(10);
            expect(style.borderRadius).toBe(5);
            expect(style.minWidth).toBe(100);
        });

        test('creates button style with custom values', () => {
            const options = {
                backgroundColor: '#FF0000',
                padding: 15,
                minWidth: 200
            };
            const style = createButtonStyle(options);
            expect(style.backgroundColor).toBe('#FF0000');
            expect(style.padding).toBe(15);
            expect(style.minWidth).toBe(200);
        });
    });

    describe('createInputStyle', () => {
        test('creates input style with defaults', () => {
            const style = createInputStyle();
            expect(style.borderWidth).toBe(1);
            expect(style.borderColor).toBe('#ccc');
            expect(style.borderRadius).toBe(4);
            expect(style.padding).toBe(8);
            expect(style.fontSize).toBe(14);
        });

        test('creates input style with custom values', () => {
            const options = {
                borderColor: '#000',
                padding: 12,
                fontSize: 16
            };
            const style = createInputStyle(options);
            expect(style.borderColor).toBe('#000');
            expect(style.padding).toBe(12);
            expect(style.fontSize).toBe(16);
        });
    });

    describe('mergeStyles', () => {
        test('merges two style objects', () => {
            const style1 = { fontSize: 16, color: '#000' };
            const style2 = { fontWeight: 'bold' };
            const merged = mergeStyles(style1, style2);
            
            expect(merged).toEqual({
                fontSize: 16,
                color: '#000',
                fontWeight: 'bold'
            });
        });

        test('later styles override earlier ones', () => {
            const style1 = { fontSize: 16, color: '#000' };
            const style2 = { fontSize: 20 };
            const merged = mergeStyles(style1, style2);
            
            expect(merged.fontSize).toBe(20);
            expect(merged.color).toBe('#000');
        });

        test('handles empty arguments', () => {
            const merged = mergeStyles();
            expect(merged).toEqual({});
        });

        test('merges multiple style objects', () => {
            const style1 = { fontSize: 16 };
            const style2 = { color: '#000' };
            const style3 = { fontWeight: 'bold' };
            const merged = mergeStyles(style1, style2, style3);
            
            expect(merged).toEqual({
                fontSize: 16,
                color: '#000',
                fontWeight: 'bold'
            });
        });
    });

    describe('createResponsivePadding', () => {
        test('creates small padding', () => {
            const padding = createResponsivePadding('small');
            expect(padding.paddingTop).toBe(8);
            expect(padding.paddingRight).toBe(8);
            expect(padding.paddingBottom).toBe(8);
            expect(padding.paddingLeft).toBe(8);
        });

        test('creates medium padding', () => {
            const padding = createResponsivePadding('medium');
            expect(padding.paddingTop).toBe(16);
            expect(padding.paddingRight).toBe(16);
            expect(padding.paddingBottom).toBe(16);
            expect(padding.paddingLeft).toBe(16);
        });

        test('creates large padding', () => {
            const padding = createResponsivePadding('large');
            expect(padding.paddingTop).toBe(24);
            expect(padding.paddingRight).toBe(24);
            expect(padding.paddingBottom).toBe(24);
            expect(padding.paddingLeft).toBe(24);
        });

        test('uses medium as default for unknown size', () => {
            const padding = createResponsivePadding('unknown');
            expect(padding.paddingTop).toBe(16);
        });

        test('uses medium as default for no parameter', () => {
            const padding = createResponsivePadding();
            expect(padding.paddingTop).toBe(16);
        });
    });
});

