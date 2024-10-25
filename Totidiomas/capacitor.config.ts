import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.Totidiomas.app',
  appName: 'Totidiomas',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 1000,
      backgroundColor: "rgb(255, 198, 93)",
      // launchAutoHide: false,
      launchFadeOutDuration: 0,
      splashFullScreen: true,
      splashImmersive: true,
    },
  }
};

export default config;
// 