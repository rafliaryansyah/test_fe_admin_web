import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid",
  },

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15,
    marginBottom: 15,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  formControl: {
    width: 200,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  main: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'grid',
    padding: 15,
    marginBottom: 15
  },

  item: {
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gridGap: 15
    }
  },

  desk: {
    display: 'flex',
    justifyContent: 'flex-start',
    gridGap: 5
  },

  nama: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#FFA53A',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },

  aksi: {
    fontSize: 15,
    textTransform: 'lowercase',
    color: '#424242',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },

  ket: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#FFA53A',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },

  date: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#424242',
    textAlign: 'left',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  }
}));

export default useStyles;
