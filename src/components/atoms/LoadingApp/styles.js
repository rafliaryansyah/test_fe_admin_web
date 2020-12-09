import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  loadingApp: {
    width: 300,
    padding: 15,
    display: 'flex',
    flexDirection: 'column',
    gridGap: 30,
    textAlign: 'center',
    color: theme.palette.primary.main,
    fontSize: 25
  }
}));

export default useStyles;
