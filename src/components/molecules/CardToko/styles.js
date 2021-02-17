import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 15,
    cursor: 'pointer'
  },

  info: {
    display: 'flex',
    gridGap: 15,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  avatar: {
    objectFit: 'cover',
    width: 90,
    height: 90,
    borderRadius: 5,

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
    width: 100
  },

  isi: {
    fontSize: 10,
    textTransform: 'capitalize',
    letterSpacing: 1.5,

    [theme.breakpoints.down('sm')]: {
      fontSize: 8
    }
  },

  aktif: {
    fontSize: 10,
    textTransform: 'lowercase',
    letterSpacing: 1.5,

    [theme.breakpoints.down('sm')]: {
      fontSize: 8
    }
  }
}));

export default useStyles;
