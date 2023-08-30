# Rebranding Scripts

## Installation
 1.run `yarn` or `npm install` to install node dependencies.

 2.create `.env` file in scripts project root folder.

 3.go to LastPass and search `figma design library api token` and view, you will find api token in the notes.

## Commands
 1.`yarn figma:sync` or `npm run figma:sync` to fetch design figma file and generate a local `color.json` file.
 2.`yarn figma:snapshot` or `npm run figma:snapshot` to map figma file to a local `snapshot.png` file. [When encounter error, plz run `brew install pkg-config cairo pango libpng jpeg giflib librsvg`]

 2.`yarn test` or `npm run test` to run all unit test cases.

 ### iOS
 1.`yarn ios:ouput` or `npm run ios:output` to generate iOS color files from `color.json` file.

 2.`yarn ios:override` or `npm run ios:override` to override generate iOS color files to iOS project.

 3.`yarn ios:run-all` or `npm run ios:run-all` to run sync,output,override in one go

 ### Android
 1.`yarn android:ouput` or `npm run android:output` to generate iOS color files from `color.json` file.

 2.`yarn android:override` or `npm run android:override` to override generate iOS color files to iOS project.

 3.`yarn android:run-all` or `npm run android:run-all` to run sync,output,override in one go

## environment variable(set them in .env file)
- FIGMA_TOKEN (refer to lastpass)
- IOS_PROJECT_PATH (refer to your local iOS project root folder path)
- ANDROID_PROJECT_PATH (refer to your local android project root folder path)

## more?
please reach to <charlie.cai@xero.com>