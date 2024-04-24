package expo.modules.screenshotdetector

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoScreenshotDetectorModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoScreenShotDetector")

    Function("getTheme") {
      return@Function "system"
    }
  }
}
