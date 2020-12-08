import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 87;

const useStyles = makeStyles(theme => ({
  wrapper: {},

  // app bar
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 15,
    padding: '0px 15px 0px 15px',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    position: 'fixed',
    zIndex: 10,
    width: '100%',
    backgroundColor: '#ffffff',

    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },

  buttonDanTitle: {
    display: 'flex',
    alignItems: 'center'
  },

  // nama app
  title: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: theme.palette.primary.main,

    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },

  // avatar
  wrapperAvatar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 5,
    marginRight: 64,

    [theme.breakpoints.down('sm')]: {
      marginRight: 14
    }
  },

  teks: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 10
  },

  nama: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  },

  akses: {
    fontSize: 10,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'lighter'
  },

  // menu
  menu: {
    width: 240,
    height: '100vh',
    position: 'fixed',
    top: 65,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    gridGap: 80
  },

  menuShift: {
    width: drawerWidth,
    height: '100vh',
    position: 'fixed',
    top: 65,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    gridGap: 126
  },

  wrapperList: {
    overflowY: 'auto',
    padding: 15,
    maxHeight: 400
  },

  labelAktif: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15
  },

  keluar: {
    margin: '0px 10px 0px 10px'
  },

  // Content
  main: {
    padding: theme.spacing(3),
    backgroundColor: '#F2F2F2',
    paddingTop: 86,

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 240
  },

  mainShift: {
    padding: theme.spacing(3),
    backgroundColor: '#F2F2F2',
    paddingTop: 86,

    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: drawerWidth
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
