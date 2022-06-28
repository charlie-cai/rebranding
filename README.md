# Rebranding Scripts

## Installation
 1.run `yarn` or `npm install` to install node dependencies.

 2.create `.env` file in scripts project root folder.

 3.go to LastPass and search `figma design library api token` and view, you will find api token in the notes.

## Commands
 1.`yarn figma:sync` or `npm run figma:sync` to fetch design figma file and generate a local `color.json` file.

 2.`yarn test` or `npm run test` to run all unit test cases.

 ### iOS
 1.`yarn ios:ouput` or `npm run ios:output` to generate iOS color files from `color.json` file.

 2.`yarn ios:override` or `npm run ios:override` to override generate iOS color files to iOS project.

 3.`yarn ios:run-all` or `npm run ios:run-all` to run sync,output,override in one go

 ### Android
 1.`yarn android:ouput` or `npm run android:output` to generate iOS color files from `color.json` file.

 2.`yarn android:override` or `npm run android:override` to override generate iOS color files to iOS project.

 3.`yarn android:run-all` or `npm run android:run-all` to run sync,output,override in one go

## environment variable
- FIGMA_API_BASE_URL=https://api.figma.com/v1
- FIGMA_TOKEN (refer to lastpass)

- TEAM_ID=992262321208821608
- FILE_ID=zWEH2ilFxkMLxwEl3DZEbz
- PAGE_ID=0:1
  
- IOS_PROJECT_PATH (refer to your local iOS project root folder path)
- ANDROID_PROJECT_PATH (refer to your local android project root folder path)

## more?
please reach to <charlie.cai@xero.com>