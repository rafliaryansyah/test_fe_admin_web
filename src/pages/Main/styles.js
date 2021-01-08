import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 50;

const useStyles = makeStyles(theme => ({
  wrapper: {},

  // app bar
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    zIndex: 1001,
    width: '100%',
    backgroundColor: '#ffffff'
  },

  buttonDanTitle: {
    display: 'flex',
    alignItems: 'center',
    gridGap: 15
  },

  // nama app
  title: {
    fontSize: 18,
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
    marginRight: 15,

    [theme.breakpoints.down('sm')]: {
      marginRight: 10
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
    width: 173,
    height: '100vh',
    position: 'fixed',
    zIndex: 200,
    top: 64,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 18,
    paddingBottom: 15
  },

  menuShift: {
    width: drawerWidth,
    height: '100vh',
    position: 'fixed',
    zIndex: 200,
    top: 64,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 18,
    paddingBottom: 15
  },

  wrapperList: {
    overflowY: 'auto',
    maxHeight: 480,
    overflowX: 'hidden',
    flex: 1
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
    border: `1px solid ${theme.palette.secondary.main}`,
    color: theme.palette.secondary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#ffffff'
    }
  },

  // Content
  main: {
    padding: theme.spacing(1),
    backgroundColor: '#F2F2F2',
    paddingTop: 73,

    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      marginLeft: 173
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: drawerWidth
    }
  },

  mainShift: {
    padding: theme.spacing(1),
    backgroundColor: '#F2F2F2',
    paddingTop: 73,

    [theme.breakpoints.up('sm')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: drawerWidth
    },

    [theme.breakpoints.down('sm')]: {
      marginLeft: drawerWidth
    }
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
