import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#ffffff',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: 300,
    padding: 30,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      gridGap: 30
    }
  },

  itemFotoDanRoles: {
    display: 'grid',
    gridGap: 15
  },

  // avatar
  wrapperImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #c4c4c4',
    height: 50,
    borderRadius: 10,
    padding: '150px 85px 180px 85px'
  },

  avatar: {
    color: theme.palette.primary.main,
    fontSize: 150
  },

  // photo
  photo: {
    objectFit: 'cover',
    height: 300
  },

  upload: {
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    borderRadius: 10,
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
