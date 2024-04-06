
# GB wallet

Proyecto para control de ingreso de trabajadores grupo bimbo



## Features

- expo 49
- redux
- react navigation 6
- navive base v3
- expo push notifications


## Instalación

node -v > 16
Instalar gbWallet con npm

```bash
  git clone
  npm install 
```
Instalar con yarn
```bash
  git clone
  yarn 
```
    
Para levantar el proyecto  

```bash 
  APP_ENV=expo expo start
```
*expo puede ser cambiado por android o ios dependiendo lo que se requiera



### Requisitos para publicar la app ###

- eas login
- eas update:configure

APP_ENV=expo eas submit


yarn expo install --fix
npx expo-doctor@latest


como se usa svg para expo 50 se modifico metro.config.js
y se instalo lo siguiente: 
yarn add --dev @react-native/js-polyfills metro-config @react-native/metro-babel-transformer metro-runtime @react-native/metro-config


yarn expo start --go


APP_ENV=expo eas channel:list
APP_ENV=expo eas channel:create


APP_ENV=expo eas update --branch develop


eas build --profile preview

eas build --profile android