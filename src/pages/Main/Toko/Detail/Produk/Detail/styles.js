import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    padding: '15px 0px 15px 0px',
    gridGap: 15
  },

  avatar: {
    objectFit: 'cover',
    width: 250,
    height: 250,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 250
    }
  },

  itemLabel: {
    display: 'grid',
    gridGap: 15
  },

  input: {
    borderBottom: '1px solid #c4c4c4',
    padding: '5px 0px 5px 0px',
    display: 'flex',
    flexDirection: 'column',
    gridGap: 5
  },

  label: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 3
  },

  text: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  },

  btnNonaktif: {
    marginTop: 15
  }
}));

export default useStyles;
