import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20
  },

  info: {
    display: 'flex',
    gridGap: 20,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  avatar: {
    objectFit: 'cover',
    width: 150,
    height: 150,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    }
  },

  text: {
    display: 'grid',
    gridGap: 15,
    width: '100%'
  },

  labelText: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 5
  },

  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 130
  },

  isi: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  aktif: {
    fontSize: 15,
    textTransform: 'lowercase',
    letterSpacing: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15
  }
}));

export default useStyles;
