import { yellow700 } from 'material-ui/styles/colors';
import { darkBlack } from 'material-ui/styles/colors';

const stylePaper = {

    width:'100%',
    height: 200, 
    backgroundColor: yellow700,
    color: darkBlack,
    fontSize: 100,
    alignSelf: 'stretch'
}
const styleContainer={
    position: 'fixed',
    top:'25%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width:'100%',
}

export {stylePaper, styleContainer}