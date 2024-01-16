// 여기서 공통 스타일링 진행하고 프로젝트 시작
const calcRem = (size) => `${size / 16}rem`;

const fontSizes = {
  small: calcRem(10),
  base: calcRem(15),
  lg: calcRem(20),
  xl: calcRem(25),
  xxl: calcRem(30),
  xxxl: calcRem(40),
  titleSize: calcRem(50),
};

// const font = {
//   'font-family': 'Eighteous',
//   src: "url('./font/Righteous-Regular.woff') format('woff')"
// };

const paddings = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const margins = {
  small: calcRem(8),
  base: calcRem(10),
  lg: calcRem(12),
  xl: calcRem(14),
  xxl: calcRem(16),
  xxxl: calcRem(18),
};

const interval = {
  base: calcRem(50),
  lg: calcRem(100),
  xl: calcRem(150),
  xxl: calcRem(200),
};

const verticalInterval = {
  base: `${calcRem(10)} 0 ${calcRem(10)} 0`,
};

const deviceSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "450px",
  tablet: "768px",
  tabletL: "1024px",
};

const colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray_1: "#222222",
  gray_2: "#767676",
  gray_3: "#E0E0E0",
  green_1: "#3cb46e",
  yellow_1: "#FFF9C4",
  yellow_2: "#FFF59D",
  yellow_3: "#FFD465",
  yellow_4: "#FFE082",
    // primary
  $primaryLight: "#E4E7EC",
  $primaryMain: "#909AB0",
  $primaryDark: "#203461",
  $primary200: "#1C2F59",
  $primary800: "#132145",
  // secondary
  $secondaryLight: "#FDE8EF",
  $secondaryMain: "#F6A0BD",
  $secondaryDark: "#EC407A",
  $secondary200: "#EA3A72",
  $secondary800: "#E42A5D",
  // success Colors
  $successLight: "#B9F6CA",
  $success200: "#69F0AE",
  $successMain: "#00E676",
  $successDark: "#00C853",
  // error
  $errorLight: "#EF9A9A",
  $errorMain: "#F44336",
  $errorDark: "#C62828",
  // orange
  $orangeLight: "#FBE9E7",
  $orangeMain: "#FFAB91",
  $orangeDark: "#D84315",
  // warning
  $warningLight: "#FFF8E1",
  $warningMain: "#FFE57F",
  $warningDark: "#FFC107",
  // grey
  $pureWhite: "#FFFFFF",
  $grey50: "#F8FAFC",
  $grey100: "#EEF2F6",
  $grey200: "#E3E8EF",
  $grey300: "#CDD5DF",
  $grey500: "#697586",
  $grey600: "#4B5565",
  $grey700: "#364152",
  $grey900: "#121926",
};

const device = {
  mobileS: `only screen and (max-width: ${deviceSizes.mobileS})`,
  mobileM: `only screen and (max-width: ${deviceSizes.mobileM})`,
  mobileL: `only screen and (max-width: ${deviceSizes.mobileL})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
  tabletL: `only screen and (max-width: ${deviceSizes.tabletL})`,
};

const theme = {
  fontSizes,
  colors,
  deviceSizes,
  device,
  paddings,
  margins,
  interval,
  verticalInterval,
};

export default theme;

