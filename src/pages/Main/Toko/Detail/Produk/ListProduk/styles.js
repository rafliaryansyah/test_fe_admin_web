import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 15,
    padding: '15px 0px 15px 0px'
  }
}));

export default useStyles;
