const commonConfig = {
    "name": "GB Identity",
    "scheme":'gbidentity',
    "slug": "gbidentity",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon_app.png",
    "userInterfaceStyle": "light",
    "splash": {
        //"image": "./assets/icon.png",
        "resizeMode":'contain',
        "backgroundColor": "#284ED4",
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "updates": {
        "url": "https://u.expo.dev/6e19e3e5-05fc-4dfd-b63d-d55eb7a6a633"
    },
    "runtimeVersion": {
        "policy": "sdkVersion"
    },
    "web": {
        "favicon": "./assets/icon.png"
    },
    "extra": {
        "eas": {
          "projectId": "6e19e3e5-05fc-4dfd-b63d-d55eb7a6a633"
        }
      },
    //"assets": ["./assets/fonts/"],
    "owner": "appshuman",
    "plugins":[
        [
            "expo-notifications",
            {
              "icon": "./assets/icon.png",
              "color": "#284ED4"
            }
        ]
    ]
}

const android = {
    "adaptiveIcon": {
        //"foregroundImage": "./assets/icon.png",
        "backgroundColor": "#284ED4"
    },
    package: "com.hiumanlab.gbidentity",
    "permissions": [
        "INTERNET", 
        "RECEIVE_BOOT_COMPLETED",
        "SCHEDULE_EXACT_ALARM"
    ]
}

const ios = {
    supportsTablet: false,
    bundleIdentifier: "com.hiumanlab.gbidentity",
    resourceClass: "large",
}

const version = "1.0.1"
const versionBuildApp = 3;
const versionAndroidApp = 3;

module.exports = () => {
    if(process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            "version": version,
            "image": "latest",
            ios: {...ios,'buildNumber':versionBuildApp.toString()},
        };
    }else if(process.env.APP_ENV === "android") {
        return {
            ...commonConfig,
            "version": version,
            android: {...android, 'versionCode': versionAndroidApp}
        };
    }else if(process.env.APP_ENV === 'expo'){
        return{
            ...commonConfig,
            "version": version,
            android : {...android, 'versionCode': versionAndroidApp},
            ios: {...ios,'buildNumber':versionBuildApp.toString()}
        }
    }
}