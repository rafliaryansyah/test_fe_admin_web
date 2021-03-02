import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingTop: 15
  },

  main: {
    marginTop: 15,
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

  cekTerkait: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginLeft: 4,
    cursor: 'pointer'
  },

  // form handle upload image
  inputFile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gridGap: 10
  },

  preview: {
    objectFit: 'cover',
    width: '100%',
    height: 450,

    [theme.breakpoints.down('sm')]: {
      height: 200
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
  },

  submit: {
    marginTop: 15
  }
}));

export default useStyles;
