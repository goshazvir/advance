import spacing from './spacing';
import shadows from './shadows';
// Theme Options Imports
import overrides from './overrides';
import typography from './typography';
import colorSchemes from './colorSchemes';
import customShadows from './customShadows';
import {interDisplay} from './fonts/interDisplay';

const theme = (settings, mode, direction) => {
  return {
    direction,
    components: overrides(settings.skin),
    colorSchemes: colorSchemes(settings.skin),
    ...spacing,
    shape: {
      borderRadius: 6,
      customBorderRadius: {
        xs: 2,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 10,
      },
    },
    shadows: shadows(mode),
    typography: typography(interDisplay.style.fontFamily),
    customShadows: customShadows(mode),
    mainColorChannels: {
      light: '46 38 61',
      dark: '231 227 252',
      lightShadow: '46 38 61',
      darkShadow: '19 17 32',
    },
  };
};

export default theme;
