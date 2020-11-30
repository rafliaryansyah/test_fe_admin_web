import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    padding: '30px 0px 30px 0px',
    gridGap: 300,

    [theme.breakpoints.down('sm')]: {
      gridGap: 30
    }
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    gridGap: 15,
    marginTop: 15
  }
}));

export default useStyles;
