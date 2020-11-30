import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid",
  },

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 30,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)'
  },

  wrapperTable: {
    height: 480,
    overflow: 'auto',
    marginBottom: 30,
    backgroundColor: '#ffffff'
  },

  table: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: 0,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)'
  },

  th: {
    border: '1px solid #C4C4C4',
    padding: 15
  },

  tr: {
    cursor: 'pointed',
    '&:hover': {
      backgroundColor: '#f2f2f2'
    }
  },

  td: {
    textAlign: 'center',
    padding: 10,
    color: '#424242'
  }
}));

export default useStyles;
