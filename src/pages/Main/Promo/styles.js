import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pencarian: {
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 15,
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexDirection: 'column'
    }
  },

  formControl: {
    width: 200,
    padding: 8,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  main: {
    padding: 15,
    marginBottom: 15,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 250px))',
    gridGap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
  },

  titlePromo: {
    fontSize: 15,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  wrapperTeks: {
    display: 'grid',
    borderBottom: '1px solid #c4c4c4',
    padding: '15px 0px 15px 0px'
  },

  teksPromo: {
    fontSize: 10,
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: '#424242',
    lineHeight: 2.0
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  // detail
  nama: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1.5,
    fontWeight: 'bold',
    color: '#424242'
  },

  desk: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },

  teks: {
    fontSize: 10,
    textTransform: 'capitalize',
    textAlign: 'justify',
    color: '#c4c4c4'
  },

  cekTerkait: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginLeft: 4,
    cursor: 'pointer'
  },

  garis: {
    border: '1px solid #c4c4c4',
    marginBottom: 15
  },

  label: {
    fontSize: 15,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#424242'
  },

  teksSyaratDanKetentuan: {
    textAlign: 'justify',
    color: '#424242'
  },

  // form
  form: {
    display: 'grid',
    padding: 15
  }
}));

export default useStyles;
