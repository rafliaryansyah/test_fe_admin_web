import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 15,
    cursor: 'pointer',

    [theme.breakpoints.down('sm')]: {
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
      padding: 10
    }
  },

  info: {
    display: 'flex',
    gridGap: 10,

    [theme.breakpoints.down('sm')]: {
      gridGap: 15,
      flexDirection: 'column'
    }
  },

  img: {
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
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      gridGap: 5
    }
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
    width: 90,

    [theme.breakpoints.down('sm')]: {
      width: 73
    }
  },

  isi: {
    fontSize: 10,
    textTransform: 'capitalize',
    letterSpacing: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 8
    }
  },

  email: {
    fontSize: 10,
    textTransform: 'lowercase',
    letterSpacing: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 8
    }
  },

  garis: {
    border: '1px solid #c4c4c4',
    marginTop: 20
  },

  role: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 5
  },

  isiRole: {
    fontSize: 10,
    textTransform: 'capitalize',
    letterSpacing: 1.5,
    padding: 5,
    backgroundColor: `${theme.palette.primary.main}`,
    borderRadius: 5,
    color: '#ffffff',

    [theme.breakpoints.down('sm')]: {
      fontSize: 8,
      padding: 3,
      borderRadius: 3,
      letterSpacing: 0.5
    }
  }
}));

export default useStyles;
