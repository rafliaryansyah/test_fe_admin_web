import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#E5E5E5',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#FFFFFF'
      //   alignItems: "flex-start",
    }
  }
}));

export default useStyles;
