import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  wrapper: {
    // height: '100vh'
  },

  // app bar
  root: {
    zIndex: 1201
  },

  menuButton: {
    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },

  title: {
    display: 'none',

    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginLeft: 20
    }
  },

  grow: {
    flexGrow: 1
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
  // close app bar

  // sidebar & main
  navDanMain: {
    display: 'flex'
  },
  // close sidebar & main

  // sidebar
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },

  paper: {
    width: drawerWidth,

    [theme.breakpoints.up('sm')]: {
      marginTop: 73
    }
  },

  listRoot: {
    padding: 0,
    margin: 15
  },
  // close sidebar

  // main
  main: {
    width: '100%',
    maxHeight: '100vh',
    overflowY: 'auto',
    padding: 15
  },
  // close main

  // footer
  footer: {
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 15,
    marginTop: 15,
    marginBottom: 94,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#424242',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  }
  // close footer
}));

export default useStyles;
