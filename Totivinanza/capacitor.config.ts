import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Totivinanza.app',
  appName: 'Totivinanza',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      // launchAutoHide: false,
      launchFadeOutDuration: 0,
      splashFullScreen: true,
      splashImmersive: true,
    },
  }
};

export default config;
