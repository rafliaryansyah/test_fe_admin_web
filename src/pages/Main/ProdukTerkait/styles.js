import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: '1px solid'
  },

  itemSatu: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 15,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',

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

  konten: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    padding: 15
  }
}));

export default useStyles;
