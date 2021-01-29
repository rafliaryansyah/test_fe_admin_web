import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    cursor: 'pointer'
  },

  info: {
    display: 'flex',
    gridGap: 20,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  img: {
    objectFit: 'cover',
    width: 100,
    height: 100,
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

  email: {
    fontSize: 15,
    textTransform: 'lowercase',
    letterSpacing: 1,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
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
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    padding: 10,
    backgroundColor: '#FFA53A',
    borderRadius: 10,
    color: '#ffffff',

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  isiRoleNonAktif: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    padding: 10,
    backgroundColor: '#8E8E8E',
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  }
}));

export default useStyles;
