import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapperContent: {
    overflowY: 'auto',
    margin: '15px 0px 15px 0px',
    width: 534,

    [theme.breakpoints.down('sm')]: {
      width: 300
    }
  },

  title: {
    padding: 0,
    marginTop: -15,
    textAlign: 'center'
  }
}));

export default useStyles;
