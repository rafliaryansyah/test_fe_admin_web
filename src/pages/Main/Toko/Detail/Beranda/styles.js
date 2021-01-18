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
    marginBottom: 15,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  btnNonaktifkan: {
    width: 250,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default useStyles;
