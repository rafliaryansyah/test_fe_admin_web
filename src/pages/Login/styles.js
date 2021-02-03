import { makeStyles } from '@material-ui/core/styles';
import { Pattern } from 'assets';

const useStyles = makeStyles(theme => ({
  wrapper: {
    background: `url(${Pattern})`,
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 360px))',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      background: '#FFFFFF',
      alignItems: 'flex-start'
    }
  },

  form: {
    backgroundColor: '#FFFFFF',
    height: 360,
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

    [theme.breakpoints.down('sm')]: {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      padding: 15
    }
  },

  title: {
    fontSize: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 54,
    fontWeight: 700,
    color: '#FFA53A',

    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  },

  button: {
    marginTop: 15,
    letterSpacing: 1,
    fontWeight: 700,
    color: '#fff'
  }
}));

export default useStyles;
