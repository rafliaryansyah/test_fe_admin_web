import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 15,
    margin: '15px 0px 0px 15px',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  teks: {
    fontSize: 13,
    marginLeft: -8,
    letterSpacing: 1,
    width: 250,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  lanjut: {
    fontWeight: 'bold'
  }
}));

export default useStyles;
