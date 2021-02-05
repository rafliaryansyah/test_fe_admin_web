import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapperTitlePage: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridGap: 15,
    padding: 5,
    marginBottom: 15
  },

  wrapperInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    justifyContent: 'space-between',
    gridGap: 15,
    padding: 15,
    backgroundColor: '#ffffff'
  },

  img: {
    objectFit: 'cover',
    width: 250,
    height: 250,
    borderRadius: 5,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  roles: {
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1.5
  },

  itemDataUser: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15
  },

  input: {
    borderBottom: '1px solid #c4c4c4',
    padding: '5px 0px 5px 0px',
    display: 'flex',
    flexDirection: 'column',
    gridGap: 5
  },

  label: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1.5,

    [theme.breakpoints.down('sm')]: {
      letterSpacing: 1,
      fontSize: 10
    }
  },

  text: {
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      letterSpacing: 1,
      fontSize: 8
    }
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 15
  }
}));

export default useStyles;
