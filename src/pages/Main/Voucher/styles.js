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
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 250px))',
    gridGap: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }
  },

  card: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)'
  },

  content: {
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 3,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  // detail
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
    display: 'grid',
    padding: 15,
    gridGap: 15
  },

  inputFile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gridGap: 10
  },

  preview: {
    objectFit: 'cover',
    width: '100%',
    height: 250,

    [theme.breakpoints.down('sm')]: {
      height: 130
    }
  },

  actionUploadFile: {
    display: 'flex',
    justifyContent: 'space-between',
    gridGap: 15
  },

  item: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 5,
    padding: '15px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridGap: 5,
    cursor: 'pointer',
    textTransform: 'uppercase'
  }
}));

export default useStyles;
