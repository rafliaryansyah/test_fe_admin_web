import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid'
  },

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 15,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)'
  },

  form: {
    display: 'grid',
    padding: 15
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
    height: 130
  },

  itemUpload: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: '15px 0px',
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
