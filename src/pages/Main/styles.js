import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#F2F2F2',
    height: '100vh'
  },

  // Header
  header: {
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    position: 'fixed',
    width: '100%',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    zIndex: 2,
    textTransform: 'capitalize'
  },

  toggle: {
    color: '#41337A',
    '&:hover': {
      backgroundColor: '#41337A',
      color: '#ffffff'
    }
  },

  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: '#41337A'
  },

  avatar: {
    right: 35
  },

  labelAktif: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#41337A',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15
  },

  wrapperList: {
    overflowY: 'auto',
    padding: 15,
    maxHeight: 400
  },

  keluar: {
    margin: '0px 15px 0px 15px'
  },

  // Content
  main: {
    backgroundColor: '#F2F2F2',
    padding: '110px 30px 30px 30px'
  },

  // footer
  footer: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    padding: 15,
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#424242',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  }
}));

export default useStyles;
