import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid",
    display: 'grid'
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
