import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  form: {
    display: 'grid',
    padding: 15
  },

  title: {
    textAlign: 'center',
    padding: 0
  },

  notif: {
    fontSize: 15,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  }
}));

export default useStyles;
