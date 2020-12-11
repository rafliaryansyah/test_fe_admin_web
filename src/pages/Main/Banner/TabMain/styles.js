import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '30px 0px 30px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gridGap: 30
  },

  wrapperCard: {
    padding: '10px 50px 10px 50px'
  },

  title: {
    fontSize: 20,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 30
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginTop: 30
  },

  form: {
    display: 'grid',
    padding: 15
  },

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
