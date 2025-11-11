// Disable automatic host component detection
process.env.RNTL_SKIP_AUTO_DETECT_FAKE_TIMERS = 'true';

// Mock react-native-reanimated manually (required by drawer navigation)
// Based on: https://docs.swmansion.com/react-native-reanimated/docs/guides/testing
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-gesture-handler (required by drawer navigation)
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

// Mock @react-navigation/drawer para evitar problemas con reanimated
jest.mock('@react-navigation/drawer', () => {
  const React = require('react');
  return {
    createDrawerNavigator: () => ({
      Navigator: ({ children }) => React.createElement('View', null, children),
      Screen: () => null,
    }),
  };
});

// Mock host component names configuration with isHostText
jest.mock('@testing-library/react-native/build/helpers/host-component-names', () => ({
  configureHostComponentNamesIfNeeded: jest.fn(),
  getHostComponentNames: () => new Set(['View', 'Text', 'TextInput', 'ScrollView', 'TouchableOpacity', 'Image']),
  isHostText: (element) => {
    if (!element || typeof element !== 'object') return false;
    const type = element.type;
    if (typeof type === 'string') {
      return type === 'Text' || type === 'RCTText';
    }
    return false;
  },
  isHostElement: (element) => {
    if (!element || typeof element !== 'object') return false;
    const type = element.type;
    return typeof type === 'string';
  },
}));

// Mock Alert
global.Alert = {
  alert: jest.fn(),
};

// Mock fetch
global.fetch = jest.fn();

// Mock console methods  
global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Reset mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});
