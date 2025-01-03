import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/index';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#101821',
  },
  logo: {
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: COLORS.secondary,
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    height: 60,
    backgroundColor: '#F4AB4D',
    color: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#777',
  },
  singuploginLine: {
    marginBottom: 20,
  },
  bottomtext: {
    color: '#F4AB4D',
    fontSize: 16,
  },
  signUpText: {
    marginTop: -3,
  },
  signUpLink: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inlineInput: {
    flex: 1,
    marginRight: 10,
    height:20,
  },
  
  verificationContainer:{
    flexDirection:'row',
    justifyContent: 'space-around',
  },

  verificationText:{
    color: '#F4AB4D',
  }

});