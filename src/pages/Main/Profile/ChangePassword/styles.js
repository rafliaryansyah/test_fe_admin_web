import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    // border: '1px solid',
    margin: '15px 0px 15px 0px',
    width: 534,

    [theme.breakpoints.down('sm')]: {
      width: 300
    }
  },

  title: {
    textAlign: 'center',
    padding: 0
  }
}));

export default useStyles;
