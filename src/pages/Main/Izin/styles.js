import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pencarian: {
    padding: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15
  },

  main: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gridGap: 15,

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
  },

  form: {
    display: 'grid'
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
