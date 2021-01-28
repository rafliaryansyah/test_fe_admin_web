import { makeStyles } from '@material-ui/core/styles';
import { Pattern } from 'assets';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: `url(${Pattern})`,
    backgroundColor: '#E5E5E5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#FFFFFF',
      alignItems: 'flex-start',
    },
  },

  form: {
    backgroundColor: '#FFFFFF',
    width: 360,
    height: 360,
    padding: 40,
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',

    [theme.breakpoints.down('sm')]: {
      padding: 15,
    },
  },

  title: {
    fontSize: 25,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 54,
    fontWeight: 700,
    color: '#FFA53A',

    [theme.breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },

  button: {
    marginTop: 15,
    letterSpacing: 1,
    fontWeight: 700,
    color: '#fff',
  },
}));

export default useStyles;
