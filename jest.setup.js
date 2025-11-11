// Disable automatic host component detection
process.env.RNTL_SKIP_AUTO_DETECT_FAKE_TIMERS = 'true';

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
