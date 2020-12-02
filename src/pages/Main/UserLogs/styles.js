import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    // border: "1px solid",
  },

  pencarian: {
    backgroundColor: '#ffffff',
    padding: 15,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridGap: 15,
    marginBottom: 30,
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',

    [theme.breakpoints.down('sm')]: {
      display: 'grid'
    }
  },

  filter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gridGap: 15
  },

  title: {
    fontSize: 18,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 1
  },

  select: {
    width: 250,
    marginTop: 10
  },

  main: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.5)',
    display: 'grid',
    padding: '20px 30px 20px 30px',
    marginBottom: 15
  },

  item: {
    borderBottom: '1px solid #c4c4c4',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 15
  },

  desk: {
    display: 'flex',
    justifyContent: 'flex-start',
    gridGap: 5
  },

  nama: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#FFA53A'
  },

  aksi: {
    fontSize: 15,
    textTransform: 'lowercase',
    color: '#424242'
  },

  ket: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#FFA53A'
  },

  date: {
    fontSize: 15,
    textTransform: 'capitalize',
    color: '#424242'
  }
}));

export default useStyles;
