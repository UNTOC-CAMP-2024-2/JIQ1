import { StyleSheet } from 'react-native';

const LogoAnimationStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden', // Background color for splash screen
    },
    logo: {
      fontSize: 100,
      fontWeight: 'bold',
      color:'#000000',
      textAlign: 'center',
      shadowColor: '#000',
      shadowOffset: {width:5, height:6},
      shadowOpacity: 0.3,
      shadowRadius: 3
    },
  });
  
  export default LogoAnimationStyles;