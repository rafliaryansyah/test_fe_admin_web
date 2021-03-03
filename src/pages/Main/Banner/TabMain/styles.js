import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '15px 0px 15px 0px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: 15
  },

  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',
    marginBottom: 15,

    [theme.breakpoints.down('sm')]: {
      fontSize: 15
    }
  },

  card: {
    padding: 5
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
    padding: 15,
    gridGap: 15
  },

  inputFile: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gridGap: 10
  },

  previewRoot: {
    width: '100%',
    height: '100%',
    flexShrink: 'unset'
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
