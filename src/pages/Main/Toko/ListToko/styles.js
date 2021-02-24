import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pencarian: {
    backgroundColor: '#ffffff',
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

  wrapperCard: {
    padding: 15,
    marginBottom: 15,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 517px))',
    gridGap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
  },

  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 345
  },

  // card skeleton
  card: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 15,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
      padding: 10
    }
  },

  info: {
    display: 'flex',
    gridGap: 10,

    [theme.breakpoints.down('sm')]: {
      gridGap: 15,
      flexDirection: 'column'
    }
  },

  text: {
    display: 'grid',
    gridGap: 15,
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      gridGap: 5
    }
  }
}));

export default useStyles;
