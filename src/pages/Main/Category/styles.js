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
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5
  },

  formControl: {
    width: 200,
    padding: 8,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
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
