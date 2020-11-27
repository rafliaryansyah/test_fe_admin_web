import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: '1px solid',
  },

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

  wrapperCard: {
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(599px, 1fr))',
    gridGap: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginBottom: 15,
    backgroundColor: '#ffffff',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
    }
  }
}));

export default useStyles;
