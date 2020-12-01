import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapperContent: {
    overflowY: 'auto',
    margin: '15px 0px 15px 0px'
  },

  title: {
    padding: 0,
    marginTop: -15,
    textAlign: 'center'
  }
}));

export default useStyles;
