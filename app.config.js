const commonConfig = {
    "name": "bimboWallet",
    "scheme":'bimbowallet',
    "slug": "bimboWallet",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
        "image": "./assets/icon.png",
        "resizeMode":'contain',
        "backgroundColor": "#284ED4",
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "updates": {
        "fallbackToCacheTimeout": 0
    },
    "web": {
        "favicon": "./assets/favicon.png"
    },
    "extra": {
        "eas": {
          "projectId": "01ba6eee-26b8-4d4c-94e6-e90a2a73a05b"
        }
    },
    "owner": "appshuman"
}

const android = {
    "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
    }
}

const ios = {
    "supportsTablet": false,
    "usesAppleSignIn": true,
}

const version = "1.0.0"
const versionBuildApp = 1;
const versionAndroidApp = 1;

module.exports = () => {
    if(process.env.APP_ENV === "ios") {
        return {
            ...commonConfig,
            "version": version,
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