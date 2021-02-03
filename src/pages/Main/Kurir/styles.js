import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  pencarian: {
    padding: theme.spacing(1.5),
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)',
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15
  },

  main: {
    padding: theme.spacing(1.5),
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gridGap: 15,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.1)'
  },

  form: {
    display: 'grid',
    padding: 15
  },

  inputFile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gridGap: 15
  },

  preview: {
    width: '100%',
    height: 400,
    objectFit: 'cover'
  },

  itemUpload: {
    width: '100%',
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: '15px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gridGap: 5,
    cursor: 'pointer'
  }
}));

export default useStyles;
