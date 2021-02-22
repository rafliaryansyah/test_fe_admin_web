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
      flexDirection: 'column',
      alignItems: 'stretch'
    }
  },

  hasilPencarian: {
    border: '1px solid #cacaca',
    borderRadius: 4,
    padding: 7,
    textAlign: 'center',
    color: theme.palette.grey
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
  }
}));

export default useStyles;
