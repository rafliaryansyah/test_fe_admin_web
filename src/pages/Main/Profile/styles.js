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
    // border: '1px solid'
  },

  wrapperImage: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 15
  },

  img: {
    objectFit: 'cover',
    width: 300,
    height: 300,
    borderRadius: 10,

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },

  upload: {
    width: 269,
    padding: 15,
    backgroundColor: theme.palette.primary.main,
    boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.5)',
    borderRadius: 10
  },

  textUpload: {
    fontSize: 15,
    textTransform: 'capitalize',
    letterSpacing: 1,
    color: '#ffffff',
    textAlign: 'center'
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
