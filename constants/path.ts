export enum Path {
    COLOR_JSON = 'color.json',

    IOS_COLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH = 'iOS/Color+Go.eta',
    IOS_UICOLOR_REBRANDINGS_EXTENSION_TEMPLATE_PATH = 'iOS/UIColor+Go.eta',
    IOS_REBRANDING_COLORS_TEMPLATE_PATH = 'iOS/GoColor.eta',
    IOS_REBRANDING_XCASSETS_COLOR_CONTENTS_JSON_TEMPLATE_PATH = 'iOS/Contents.eta',
    IOS_REBRANDING_XCASSETS_FOLDER_CONTENTS_JSON_TEMPLATE_PATH = 'iOS/Contents.json',
    IOS_COLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH = 'outputs/iOS/sources/Color+Go.swift',
    IOS_UICOLOR_REBRANDINGS_EXTENSION_OUTPUT_PATH = 'outputs/iOS/sources/UIColor+Go.swift',
    IOS_REBRANDING_COLORS_OUTPUT_PATH = 'outputs/iOS/sources/GoColor.swift',
    IOS_TEST_OUTPUT_PATH = 'outputs/iOS/tests/ColorExtensionSpec.swift',
    IOS_REBRANDING_XCASSETS_PATH = 'outputs/iOS/resources/Color.xcassets',
    IOS_REBRANDING_XCASSETS_CONTENTS_JSON_PATH = 'outputs/iOS/resources/Color.xcassets/Contents.json',

    ANDROID_COLOR_PALETTE_TEMPLATE_PATH = './android/LiteColorPalette.eta',
    ANDROID_COLORS_TEMPLATE_PATH = './android/LiteColors.eta',
    ANDROID_COLOR_PALETTE_OUTPUT_PATH = 'outputs/android/sources/LiteColorPalette.kt',
    ANDROID_COLORS_OUTPUT_PATH = 'outputs/android/sources/LiteColors.kt',
}