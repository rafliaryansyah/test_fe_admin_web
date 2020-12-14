import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 30,
    padding: '30px 0px 30px 0px',

    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gridGap: 10
    }
  }
}));

export default useStyles;
