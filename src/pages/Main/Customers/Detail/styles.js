import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid"
  },

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

  itemFotoDanRoles: {
    // border: '1px solid'
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

  roles: {
    display: 'flex',
    flexDirection: 'column'
  },

  title: {
    fontSize: 25,
    textTransform: 'capitalize',
    letterSpacing: 1
  },

  itemDataUser: {
    // border: '1px solid',
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
    letterSpacing: 3
  },

  text: {
    fontSize: 18,
    letterSpacing: 1,
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [theme.breakpoints.down('sm')]: {
      fontSize: 10
    }
  },

  wrapperButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 15
  }
}));

export default useStyles;
