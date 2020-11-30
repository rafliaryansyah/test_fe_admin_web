import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gridGap: 30,
    margin: '30px 0px 30px 0px'
  },

  card: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 9px rgba(0, 0, 0, 0.5)',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column'
  },

  action: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  content: {
    display: 'flex',
    marginTop: -48
  },

  img: {
    objectFit: 'cover',
    width: 100,
    Height: 100,
    borderRadius: 10
  },

  deks: {
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    width: '100%'
  },

  nama: {
    fontSize: 18,
    textTransform: 'capitalize',
    letterSpacing: 3,
    fontWeight: 'bold',
    lineHeight: 2
  },

  jumlahProduk: {
    fontSize: 13,
    textTransform: 'capitalize',
    letterSpacing: 1,
    lineHeight: 2
  }
}));

export default useStyles;
