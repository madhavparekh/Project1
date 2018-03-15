import {
    yellow500, yellow600, yellow700,
    grey300, grey400, grey500, grey700,
    white, darkBlack, fullBlack,
  } from 'material-ui/styles/colors'
  import {fade} from 'material-ui/utils/colorManipulator';
  import spacing from 'material-ui/styles/spacing';
  
  const BeastTheme = {
    spacing: spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: yellow700

      ,//header, button color, text field underLine color
      primary2Color: yellow700,
      primary3Color: grey300,
      accentColor: yellow600,
      accent1Color: yellow600,//dropdown current item color+modified getTheme for dropdown label color
      accent2Color: grey700,//search bar(toolbar) background color
      accent3Color: grey400,//so far not used
      textColor: white,
      alternateTextColor: darkBlack,
      canvasColor: grey700,//bkg-col for dropdown and drawer
      borderColor: white,//text field underline not active state
      backgroundColor: grey700,//so far not used
      disabledColor: yellow600, //fade(darkBlack, 0.3),//text field hint text
      pickerHeaderColor: yellow500,//so far not used
      clockCircleColor: fade(darkBlack, 0.07),
      shadowColor: fullBlack,
      disabledTextColor: grey500,//not used
    },
    font: {
      fontSize: 20,
    },
  };
  export default BeastTheme;