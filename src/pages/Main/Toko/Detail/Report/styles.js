import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridGap: 15,
    padding: '15px 0px 15px 0px'
  },

  filter: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: 'flex-end'
  },

  selections: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 5,

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center'
    }
  },

  formControl: {
    width: 130,
    [theme.breakpoints.down('sm')]: {
      width: 95
    }
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  button: {
    width: 130,
    height: 40,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%'
    }
  },

  report: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: 15
  },

  cardReport: {
    display: 'grid',
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
    padding: 15
  },

  date: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1
  },

  card: {
    width: '100%',
    display: 'flex',
    gridGap: 15,
    borderBottom: '1px solid #c4c4c4',
    padding: '15px 0px 15px 0px',
    marginBottom: 15,

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },

  avatar: {
    objectFit: 'cover',
    width: 100,
    height: 100,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: 150
    }
  },

  descCard: {
    display: 'grid',
    width: '100%'
  },

  nama: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  },

  harga: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold'
  },

  wrapperTerjual: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  labelTerjual: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: '#424242'
  },

  total: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: '#424242'
  },

  wrapperTotalPenjualan: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  labelTotalPenjualan: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bolder'
  },

  totalPenjualan: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bolder'
  },

  wrapperInfo: {
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
  }
}));

export default useStyles;
