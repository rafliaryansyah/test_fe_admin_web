import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    padding: '30px 0px 30px 0px',
    gridGap: 300,

    [theme.breakpoints.down('sm')]: {
      gridGap: 30
    }
  },

  img: {
    objectFit: 'cover',
    width: 300,
    height: 300,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
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

  button: {
    marginTop: 15
  }
}));

export default useStyles;
