import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: '1px solid',
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

  formControl: {
    width: 200
  },

  wrapperCard: {
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    marginBottom: 15,
    backgroundColor: '#ffffff'
  }
}));

export default useStyles;
