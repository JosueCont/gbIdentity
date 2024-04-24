import ExpoModulesCore

public class ExpoScreenshotDetectorModule: Module {
 
  public func definition() -> ModuleDefinition {
    Name("ExpoScreenShotDetector")

    Function("getTheme") { () -> String in
      "system"
    }
  }
}
