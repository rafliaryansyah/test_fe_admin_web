import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 250px))',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15,
    padding: '15px 0px 15px 0px',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
    }
  }
}));

export default useStyles;
