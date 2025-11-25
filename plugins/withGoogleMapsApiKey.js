const { withAndroidManifest } = require('@expo/config-plugins');

const GOOGLE_MAPS_API_KEY = 'AIzaSyCwS9m7hUtOoIX9__HIyD_D-_C6j6yjBFc';

module.exports = function withGoogleMapsApiKey(config) {
  return withAndroidManifest(config, async (config) => {
    const androidManifest = config.modResults;
    const { manifest } = androidManifest;

    // Ensure application element exists
    if (!manifest.application) {
      manifest.application = [{ $: {} }];
    }

    const application = manifest.application[0];

    // Ensure meta-data array exists
    if (!application['meta-data']) {
      application['meta-data'] = [];
    }

    // Remove existing Google Maps API key if present
    application['meta-data'] = application['meta-data'].filter(
      (item) => item.$['android:name'] !== 'com.google.android.geo.API_KEY'
    );

    // Add Google Maps API key
    application['meta-data'].push({
      $: {
        'android:name': 'com.google.android.geo.API_KEY',
        'android:value': GOOGLE_MAPS_API_KEY,
      },
    });

    return config;
  });
};
