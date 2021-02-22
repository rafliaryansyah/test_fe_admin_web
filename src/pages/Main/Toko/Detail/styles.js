import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapperTitlePage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15,
    padding: 5,
    marginBottom: 15
  },

  menuTabToko: {
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
    borderRadius: 5,
    padding: 15
  }
}));

export default useStyles;
