//FIXME: 팀 디자인 토큰 나오는대로 수정 필요
export const DESIGN_SYSTEM_TEXT = {
  E1: {
    fontWeight: "Bold",
    fontSize: "9.6rem",
    lineHeight: "12rem",
    letterSpacing: "-2%",
  },
  E2: {
    fontWeight: "Bold",
    fontSize: "6rem",
    lineHeight: "8rem",
    letterSpacing: "-2%",
  },
  E3: {
    fontWeight: "Bold",
    fontSize: "4.8rem",
    lineHeight: "6.4rem",
    letterSpacing: "-2%",
  },
  E4: {
    fontWeight: "Bold",
    fontSize: "4rem",
    lineHeight: "5.6rem",
    letterSpacing: "-2%",
  },
  T1: {
    fontWeight: "Bold",
    fontSize: "3.2rem",
    lineHeight: "4.8rem",
    letterSpacing: "-2%",
  },
  T2: {
    fontWeight: "Bold",
    fontSize: "2.8rem",
    lineHeight: "4rem",
    letterSpacing: "-2%",
  },
  T3: {
    fontWeight: "Bold",
    fontSize: "2.6rem",
    lineHeight: "3.8rem",
    letterSpacing: "-2%",
  },
  T4: {
    fontWeight: "Bold",
    fontSize: "2.4rem",
    lineHeight: "3.2rem",
    letterSpacing: "-2%",
  },
  S1: {
    fontWeight: "Bold",
    fontSize: "2rem",
    lineHeight: "2.8rem",
    letterSpacing: "-2%",
  },
  S2: {
    fontWeight: "Bold",
    fontSize: "1.8rem",
    lineHeight: "2.6rem",
    letterSpacing: "-2%",
  },
  S3: {
    fontWeight: "Bold",
    fontSize: "1.8rem",
    lineHeight: "2.6rem",
    letterSpacing: "-2%",
  },
  B1_BOLD: {
    fontWeight: "Bold",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    letterSpacing: "-2%",
  },
  B1: {
    fontWeight: "Regular",
    fontSize: "1.6rem",
    lineHeight: "2.4rem",
    letterSpacing: "-2%",
  },
  B2_BOLD: {
    fontWeight: "Bold",
    fontSize: "1.4rem",
    lineHeight: "2.2rem",
    letterSpacing: "-2%",
  },
  B2: {
    fontWeight: "Regular",
    fontSize: "1.4rem",
    lineHeight: "2.2rem",
    letterSpacing: "-2%",
  },
  CAPTION: {
    fontWeight: "Regular",
    fontSize: "1.2rem",
    lineHeight: "1.8rem",
    letterSpacing: "-2%",
  },
  OVERLINE: {
    fontWeight: "Regular",
    fontSize: "1rem",
    lineHeight: "1.6rem",
    letterSpacing: "-2%",
  },
} as const;

export const DESIGN_SYSTEM_COLOR = {
  themeBackground: {
    dark: "#212529",
    gray: "#F6F8FA",
    default: "#FFFFFF",
  },
  dark: "#212529",
  darkGray: "#868e96",
  darkGrayText: "#495057",
  theme: "#73a2ff",
  theme2: "#5e94ff",
  inverseGrey50: "#202027",
  inverseGrey100: "#2c2c35",
  inverseGrey200: "#3c3c47",
  inverseGrey300: "#4d4d59",
  inverseGrey400: "#62626d",
  inverseGrey500: "#7e7e87",
  inverseGrey600: "#9e9ea4",
  inverseGrey700: "#c3c3c6",
  inverseGrey800: "#e4e4e5",
  inverseGrey900: "#fff",
  lightGrey: "#CED2DA",
  lightGrey2: "#f1f3f5",
  lightGrey3: "#d9d9d9",
  background: "#fff",
  darkBackground: "#17171c",
  greyBackground: "#f2f4f6",
  darkGreyBackground: "#101013",
  layeredBackground: "#fff",
  darkLayeredBackground: "#202027",
  floatBackground: "#fff",
  darkFloatBackground: "#2c2c35",
  black: "#000",
  newBlack: "#222222",
  kreamBlack: "#333333",
  grey50: "#f9fafb",
  grey100: "#f2f4f6",
  grey200: "#e5e8eb",
  grey300: "#d1d6db",
  grey400: "#b0b8c1",
  grey500: "#8b95a1",
  grey600: "#6b7684",
  grey700: "#4e5968",
  grey800: "#333d4b",
  grey900: "#191f28",
  greyOpacity50: "rgba(0, 23, 51, 0.02)",
  greyOpacity100: "rgba(2, 32, 71, 0.05)",
  greyOpacity200: "rgba(0, 27, 55, 0.1)",
  greyOpacity300: "rgba(0, 29, 58, 0.18)",
  greyOpacity400: "rgba(0, 25, 54, 0.31)",
  greyOpacity500: "rgba(3, 24, 50, 0.46)",
  greyOpacity600: "rgba(0, 19, 43, 0.58)",
  greyOpacity700: "rgba(3, 18, 40, 0.7)",
  greyOpacity800: "rgba(0, 12, 30, 0.8)",
  greyOpacity900: "rgba(2, 9, 19, 0.91)",
  white: "#fff",
  blue50: "#e8f3ff",
  blue100: "#c9e2ff",
  blue200: "#90c2ff",
  blue300: "#64a8ff",
  blue400: "#4593fc",
  blue500: "#3182f6",
  blue600: "#2272eb",
  blue700: "#1b64da",
  blue800: "#1957c2",
  blue900: "#194aa6",
  red50: "#fee",
  red100: "#ffd4d6",
  red200: "#feafb4",
  red300: "#fb8890",
  red400: "#f66570",
  red500: "#f04452",
  red600: "#e42939",
  red700: "#d22030",
  red800: "#bc1b2a",
  red900: "#a51926",
  orange50: "#fff3e0",
  orange100: "#ffe0b0",
  orange200: "#ffcd80",
  orange300: "#ffbd51",
  orange400: "#ffa927",
  orange500: "#fe9800",
  orange600: "#fb8800",
  orange700: "#f57800",
  orange800: "#ed6700",
  orange900: "#e45600",
  yellow50: "#fff9e7",
  yellow100: "#ffefbf",
  yellow200: "#ffe69b",
  yellow300: "#ffdd78",
  yellow400: "#ffd158",
  yellow500: "#ffc342",
  yellow600: "#ffb331",
  yellow700: "#faa131",
  yellow800: "#ee8f11",
  yellow900: "#dd7d02",
  green50: "#f0faf6",
  green100: "#aeefd5",
  green200: "#76e4b8",
  green300: "#3fd599",
  green400: "#15c47e",
  green500: "#03b26c",
  green600: "#02a262",
  green700: "#029359",
  green800: "#028450",
  green900: "#027648",
  teal50: "#edf8f8",
  teal100: "#bce9e9",
  teal200: "#89d8d8",
  teal300: "#58c7c7",
  teal400: "#30b6b6",
  teal500: "#18a5a5",
  teal600: "#109595",
  teal700: "#0c8585",
  teal800: "#097575",
  teal900: "#076565",
  purple50: "#f9f0fc",
  purple100: "#edccf8",
  purple200: "#da9bef",
  purple300: "#c770e4",
  purple400: "#b44bd7",
  purple500: "#a234c7",
  purple600: "#9128b4",
  purple700: "#8222a2",
  purple800: "#73228e",
  purple900: "#65237b",
  whiteOpacity50: "rgba(209, 209, 253, 0.05)",
  whiteOpacity100: "rgba(217, 217, 255, 0.11)",
  whiteOpacity200: "rgba(222, 222, 255, 0.19)",
  whiteOpacity300: "rgba(224, 224, 255, 0.27)",
  whiteOpacity400: "rgba(232, 232, 253, 0.36)",
  whiteOpacity500: "rgba(242, 242, 255, 0.47)",
  whiteOpacity600: "rgba(248, 248, 255, 0.6)",
  whiteOpacity700: "rgba(253, 253, 255, 0.75)",
  whiteOpacity800: "rgba(253, 253, 254, 0.89)",
  whiteOpacity900: "#fff",
  lightThemeGrey50: "#f9fafb",
  lightThemeGrey100: "#f2f4f6",
  lightThemeGrey200: "#e5e8eb",
  lightThemeGrey300: "#d1d6db",
  lightThemeGrey400: "#b0b8c1",
  lightThemeGrey500: "#8b95a1",
  lightThemeGrey600: "#6b7684",
  lightThemeGrey700: "#4e5968",
  lightThemeGrey800: "#333d4b",
  lightThemeGrey900: "#191f28",
  darkThemeGrey50: "#202027",
  darkThemeGrey100: "#2c2c35",
  darkThemeGrey200: "#3c3c47",
  darkThemeGrey300: "#4d4d59",
  darkThemeGrey400: "#62626d",
  darkThemeGrey500: "#7e7e87",
  darkThemeGrey600: "#9e9ea4",
  darkThemeGrey700: "#c3c3c6",
  darkThemeGrey800: "#e4e4e5",
  darkThemeGrey900: "#fff",
  lightThemeBlue50: "#e8f3ff",
  lightThemeBlue100: "#c9e2ff",
  lightThemeBlue200: "#90c2ff",
  lightThemeBlue300: "#64a8ff",
  lightThemeBlue400: "#4593fc",
  lightThemeBlue500: "#3182f6",
  lightThemeBlue600: "#2272eb",
  lightThemeBlue700: "#1b64da",
  lightThemeBlue800: "#1957c2",
  lightThemeBlue900: "#194aa6",
  darkThemeBlue50: "#202c4d",
  darkThemeBlue100: "#23386a",
  darkThemeBlue200: "#25478c",
  darkThemeBlue300: "#265ab3",
  darkThemeBlue400: "#2970d9",
  darkThemeBlue500: "#3485fa",
  darkThemeBlue600: "#449bff",
  darkThemeBlue700: "#61b0ff",
  darkThemeBlue800: "#8fcdff",
  darkThemeBlue900: "#c8e7ff",
  lightThemeRed50: "#fee",
  lightThemeRed100: "#ffd4d6",
  lightThemeRed200: "#feafb4",
  lightThemeRed300: "#fb8890",
  lightThemeRed400: "#f66570",
  lightThemeRed500: "#f04452",
  lightThemeRed600: "#e42939",
  lightThemeRed700: "#d22030",
  lightThemeRed800: "#bc1b2a",
  lightThemeRed900: "#a51926",
  darkThemeRed50: "#3c2020",
  darkThemeRed100: "#562025",
  darkThemeRed200: "#7a242d",
  darkThemeRed300: "#9e2733",
  darkThemeRed400: "#ca2f3d",
  darkThemeRed500: "#f04251",
  darkThemeRed600: "#fa616d",
  darkThemeRed700: "#fe818b",
  darkThemeRed800: "#ffa8ad",
  darkThemeRed900: "#ffd1d3",
  lightThemeOrange50: "#ffe0b0",
  lightThemeOrange100: "#ffe0b0",
  lightThemeOrange200: "#ffcd80",
  lightThemeOrange300: "#ffbd51",
  lightThemeOrange400: "#ffa927",
  lightThemeOrange500: "#fe9800",
  lightThemeOrange600: "#fb8800",
  lightThemeOrange700: "#f57800",
  lightThemeOrange800: "#ed6700",
  lightThemeOrange900: "#e45600",
  darkThemeOrange50: "#3d2500",
  darkThemeOrange100: "#563200",
  darkThemeOrange200: "#804600",
  darkThemeOrange300: "#a85f00",
  darkThemeOrange400: "#cf7200",
  darkThemeOrange500: "#f18600",
  darkThemeOrange600: "#fd9528",
  darkThemeOrange700: "#ffa861",
  darkThemeOrange800: "#ffc39e",
  darkThemeOrange900: "#ffe4d6",
  lightThemeYellow50: "#fff9e7",
  lightThemeYellow100: "#ffefbf",
  lightThemeYellow200: "#ffe69b",
  lightThemeYellow300: "#ffdd78",
  lightThemeYellow400: "#ffd158",
  lightThemeYellow500: "#ffc342",
  lightThemeYellow600: "#ffb331",
  lightThemeYellow700: "#faa131",
  lightThemeYellow800: "#ee8f11",
  lightThemeYellow900: "#dd7d02",
  darkThemeYellow50: "#3d2d1a",
  darkThemeYellow100: "#724c1e",
  darkThemeYellow200: "#b56f1d",
  darkThemeYellow300: "#eb8b1e",
  darkThemeYellow400: "#ffa126",
  darkThemeYellow500: "#ffb134",
  darkThemeYellow600: "#ffc259",
  darkThemeYellow700: "#ffd68a",
  darkThemeYellow800: "#ffe5b2",
  darkThemeYellow900: "#fff1d4",
  lightThemeGreen50: "#f0faf6",
  lightThemeGreen100: "#aeefd5",
  lightThemeGreen200: "#76e4b8",
  lightThemeGreen300: "#3fd599",
  lightThemeGreen400: "#15c47e",
  lightThemeGreen500: "#03b26c",
  lightThemeGreen600: "#02a262",
  lightThemeGreen700: "#029359",
  lightThemeGreen800: "#028450",
  lightThemeGreen900: "#027648",
  darkThemeGreen50: "#153729",
  darkThemeGreen100: "#135338",
  darkThemeGreen200: "#136d47",
  darkThemeGreen300: "#138a59",
  darkThemeGreen400: "#13a065",
  darkThemeGreen500: "#16bb76",
  darkThemeGreen600: "#26cf88",
  darkThemeGreen700: "#4ee4a6",
  darkThemeGreen800: "#82f6c5",
  darkThemeGreen900: "#ccffea",
  lightThemeTeal50: "#edf8f8",
  lightThemeTeal100: "#bce9e9",
  lightThemeTeal200: "#89d8d8",
  lightThemeTeal300: "#58c7c7",
  lightThemeTeal400: "#30b6b6",
  lightThemeTeal500: "#18a5a5",
  lightThemeTeal600: "#109595",
  lightThemeTeal700: "#0c8585",
  lightThemeTeal800: "#097575",
  lightThemeTeal900: "#076565",
  darkThemeTeal50: "#203537",
  darkThemeTeal100: "#224e51",
  darkThemeTeal200: "#226368",
  darkThemeTeal300: "#247e85",
  darkThemeTeal400: "#26939a",
  darkThemeTeal500: "#2eaab2",
  darkThemeTeal600: "#43bec7",
  darkThemeTeal700: "#65d4dc",
  darkThemeTeal800: "#9be8ee",
  darkThemeTeal900: "#d6fcff",
  lightThemePurple50: "#f9f0fc",
  lightThemePurple100: "#edccf8",
  lightThemePurple200: "#da9bef",
  lightThemePurple300: "#c770e4",
  lightThemePurple400: "#b44bd7",
  lightThemePurple500: "#a234c7",
  lightThemePurple600: "#9128b4",
  lightThemePurple700: "#8222a2",
  lightThemePurple800: "#73228e",
  lightThemePurple900: "#65237b",
  darkThemePurple50: "#3f2447",
  darkThemePurple100: "#522361",
  darkThemePurple200: "#66247b",
  darkThemePurple300: "#7b2595",
  darkThemePurple400: "#962fb5",
  darkThemePurple500: "#ae3dd1",
  darkThemePurple600: "#c353e5",
  darkThemePurple700: "#d77cf2",
  darkThemePurple800: "#eaacfc",
  darkThemePurple900: "#f6d9ff",
  lightThemeBackgroundDimmed: "rgba(0, 0, 0, 0.2)",
  darkThemeBackgroundDimmed: "rgba(0, 0, 0, 0.56)",
  lightThemeBackgroundLevelB01: "#f2f4f6",
  darkThemeBackgroundLevelB01: "#101013",
  lightThemeBackground: "#fff",
  darkThemeBackground: "#17171c",
  lightThemeBackgroundLevel01: "#fff",
  darkThemeBackgroundLevel01: "#202027",
  lightThemeBackgroundLevel02: "#fff",
  darkThemeBackgroundLevel02: "#2c2c35",
  lightThemeHairlineBorder: "#e5e8eb",
  darkThemeHairlineBorder: "#3c3c47",
} as const;
