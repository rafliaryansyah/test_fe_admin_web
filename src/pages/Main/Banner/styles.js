import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {},

  titleGrid: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontWeight: 'bold',

    [theme.breakpoints.down('sm')]: {
      fontSize: 13
    }
  },

  section: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },

  wrapperCard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },

  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    overflow: 'hidden',
    gridGap: 15,
    borderRadius: 10
  },

  titleBar: {
    // background:
    //   'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
    backgroundColor: '#ffffff'
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  upload: {
    padding: 50,
    marginBottom: 15,
    display: 'flex',
    justifyContent: 'center',
    border: '2px solid',
    borderStyle: 'dashed'
  },

  preview: {
    objectFit: 'cover',
    width: 250,
    height: 130
  }
}));

export default useStyles;
