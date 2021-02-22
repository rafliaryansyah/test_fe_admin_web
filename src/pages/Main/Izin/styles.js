import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5
  },

  form: {
    display: 'grid',
    padding: 15
  },

  checkboxs: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.5)
  },

  desk: {
    display: 'flex',
    flexDirection: 'column'
  },

  label: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1
  },

  ket: {
    fontSize: 10,
    letterSpacing: 1.5
  }
}));

export default useStyles;
