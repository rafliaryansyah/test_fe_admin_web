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
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 30,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)'
  },

  main: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    padding: 30,
    marginBottom: 15,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: 30
  },

  titlePromo: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  wrapperTeks: {
    display: 'grid',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #c4c4c4',
    padding: '15px 0px 15px 0px'
  },

  teksPromo: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: '#424242',
    lineHeight: 1.5
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  // detail
  banner: {
    width: 100,
    height: 50
  },

  img: {
    width: '100%',
    height: 200,
    textAlign: 'center'
  },

  nama: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 3,
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
    fontSize: 13,
    textTransform: 'capitalize',
    textAlign: 'justify',
    color: '#c4c4c4'
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
    width: 534,

    [theme.breakpoints.down('sm')]: {
      width: 300
    }
  },

  select: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15
  }
}));

export default useStyles;
