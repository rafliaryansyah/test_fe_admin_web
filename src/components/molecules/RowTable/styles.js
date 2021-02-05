import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  },

  list: {
    maxHeight: 164,
    overflowY: 'auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    alignItems: 'center',
    gridGap: 5
  },

  item: {
    fontSize: 9,
    textTransform: 'capitalize',
    letterSpacing: 1.5,
    backgroundColor: `${theme.palette.primary.main}`,
    color: '#ffffff',
    padding: theme.spacing(1.5),
    borderRadius: 5
  }
}));

export default useStyles;
