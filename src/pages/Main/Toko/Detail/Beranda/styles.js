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

  // avatar
  wrapperImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #c4c4c4',
    height: 50,
    borderRadius: 10,
    padding: '150px 85px 180px 85px',
    marginBottom: 15
  },

  avatar: {
    color: theme.palette.primary.main,
    fontSize: 150
  }
}));

export default useStyles;
