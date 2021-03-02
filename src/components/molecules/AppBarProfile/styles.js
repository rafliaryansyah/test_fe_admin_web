import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center'
  },

  teks: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 10
  },

  nama: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  },

  akses: {
    fontSize: 10,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'lighter'
  }
}));

export default useStyles;
