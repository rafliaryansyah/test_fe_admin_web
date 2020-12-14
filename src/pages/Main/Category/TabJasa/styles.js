import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: 30,
    margin: '30px 0px 30px 0px'
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

  // form handle upload image
  inputFile: {
    display: 'flex',
    justifyContent: 'space-between',
    gridGap: 10
  },

  itemPreview: {
    width: '100%',
    border: `2px solid ${theme.palette.primary.main}`,
    borderStyle: 'dashed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },

  preview: {
    objectFit: 'cover',
    width: '100%',
    height: 130
  },

  itemUpload: {
    width: '15%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },

  submit: {
    marginTop: 15
  }
}));

export default useStyles;
