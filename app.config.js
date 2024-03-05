const commonConfig = {
    "name": "bimboWallet",
    "scheme":'bimbowallet',
    "slug": "bimboWallet",
    "version": "1.0.0",
    "orientation": "portrait",
    //"icon": "./assets/icon.png",
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
        "url": "https://u.expo.dev/01ba6eee-26b8-4d4c-94e6-e90a2a73a05b"
    },
    "runtimeVersion": {
        "policy": "sdkVersion"
    },
    "web": {
        "favicon": "./assets/icon.png"
    },
    "extra": {
        "eas": {
          "projectId": "01ba6eee-26b8-4d4c-94e6-e90a2a73a05b"
        }
    },
    //"assets": ["./assets/fonts/"],
    "owner": "appshuman",
    "plugins":[
        [
            "expo-notifications",
            {
              "icon": "./assets/icon.png",
              "color": "#284ED4",
              //"sounds": [
              //  "./local/assets/notification-sound.wav",
              //  "./local/assets/notification-sound-other.wav"
              //]
            }
        ],
        //[
        //    "expo-screen-orientation",
        //    {
        //      "initialOrientation": "DEFAULT"
        //    }
        //],
        [
            "expo-media-library",
            {
              "photosPermission": "Allow BimboWallet to access your photos.",
              "savePhotosPermission": "Allow BimboWallet to save photos.",
              "isAccessMediaLocationEnabled": true
            }
          ]
    ]
}

const android = {
    "adaptiveIcon": {
        //"foregroundImage": "./assets/icon.png",
        "backgroundColor": "#284ED4"
    },
    "permissions": [
        "INTERNET",
        "ACCESS_MEDIA_LOCATION",
        "RECEIVE_BOOT_COMPLETED",
        "SCHEDULE_EXACT_ALARM",
        "READ_EXTERNAL_STORAGE"
    ]
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