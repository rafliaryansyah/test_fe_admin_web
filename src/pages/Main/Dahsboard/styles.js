import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pencarian: {
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 15,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column'
    }
  },

  formControl: {
    width: 200,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  // main
  main: {
    padding: 15,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: 'flex-end',
    gridGap: 15
  },

  // card info
  card: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    marginBottom: 15
  },

  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  totalPendapatan: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 3,

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },

  nilai: {
    fontSize: 25,
    textTransform: 'capitalize',
    letterSpacing: 3,
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: 18
    }
  }
}));

export default useStyles;
