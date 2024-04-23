//import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoScreenshotDetector.web.ts
// and on native platforms to ExpoScreenshotDetector.ts
import ExpoScreenshotDetectorModule from './ExpoScreenshotDetectorModule';

export function getTheme(): string {
  return ExpoScreenshotDetectorModule.getTheme();
}


