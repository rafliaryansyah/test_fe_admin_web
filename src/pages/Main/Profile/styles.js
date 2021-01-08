import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#ffffff',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridGap: 300,
    padding: 15,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      gridGap: 15
    }
  },

  itemFotoDanRoles: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15
  },

  // photo
  photo: {
    objectFit: 'cover',
    height: 300
  },

  // avatar
  avatar: {
    width: '100%',
    height: 350
  },

  upload: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: 5,
    cursor: 'pointer',
    padding: '10px 0px 10px 0px',
    width: '100%',
    textAlign: 'center',
    textTransform: 'capitalize',

    ['&:hover']: {
      backgroundColor: theme.palette.primary.main,
      color: '#ffffff'
    }
  },

  roles: {
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    fontSize: 25,
    textTransform: 'capitalize',
    letterSpacing: 1
  },

  wrapperInfo: {
    display: 'grid'
  },

  jenisKelamin: {
    margin: '15px 0px 15px 0px'
  },

  wrapperButton: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15,
    marginTop: 15
  }
}));

export default useStyles;
