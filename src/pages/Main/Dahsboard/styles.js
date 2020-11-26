import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: 'center',
    alignItems: 'center',
    gridGap: 30
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    cursor: 'pointer'
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    letterSpacing: 3,
    textTransform: 'capitalize',
    color: '#FE8843',
    lineHeight: 1
  },

  deks: {
    fontSize: 18,
    letterSpacing: 3,
    textTransform: 'capitalize'
  }
}));

export default useStyles;
