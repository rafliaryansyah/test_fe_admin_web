import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '30px 0px 30px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gridGap: 30
  },

  wrapperCard: {
    padding: '10px 50px 10px 50px'
  },

  title: {
    fontSize: 20,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 30
  },

  buttonLeft: {
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    borderRadius: '5px 0px 0px 5px'
  },

  buttonRight: {
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    color: '#ffffff',
    borderRadius: '0px 5px 5px 0px'
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginTop: 30
  }
}));

export default useStyles;
