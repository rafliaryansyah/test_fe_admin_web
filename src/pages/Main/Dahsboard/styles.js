import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {},

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15,
    marginBottom: 30,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',

    [theme.breakpoints.down('sm')]: {
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
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    padding: 30,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    justifyContent: 'flex-end',
    gridGap: 30
  },

  // card info
  card: {
    borderRadius: 10,
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    marginBottom: 30
  },

  content: {
    display: 'flex'
  },

  totalPendapatan: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1
  },

  nilai: {
    fontSize: 20,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  }
}));

export default useStyles;
