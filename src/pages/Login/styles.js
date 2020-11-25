import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#E5E5E5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#FFFFFF',
      alignItems: 'flex-start'
    }
  },

  form: {
    backgroundColor: '#FFFFFF',
    width: 360,
    height: 360,
    padding: 40,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      padding: 15
    }
  },

  title: {
    fontSize: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 54,

    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },

  button: {
    marginTop: 15
  }
}));

export default useStyles;
