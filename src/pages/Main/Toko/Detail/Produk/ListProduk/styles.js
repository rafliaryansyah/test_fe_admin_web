import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 250px))',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 15,
    padding: '15px 0px 15px 0px',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
    }
  }
}));

export default useStyles;
