import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cardProduk: {
    boxShadow: '0 0 10px rgba(0, 0, 0, .2)',
    borderRadius: 5
  },

  avatar: {
    objectFit: 'cover',
    width: '100%',
    height: 250,
    margin: 'auto'
  },

  desk: {
    padding: 10,
    display: 'grid',
    gridGap: 15
  },

  ketProduk: {
    display: 'flex',
    flexDirection: 'column',
    gridGap: 5
  },

  nama: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#424242'
  },

  harga: {
    fontSize: 15,
    fontWeight: '500',
    color: '#424242'
  },

  type: {
    fontSize: 13,
    textTransform: 'capitalize',
    color: '#424242'
  },

  stok: {
    fontSize: 13,
    textTransform: 'capitalize',
    color: '#424242'
  },

  ketStatusProdukToko: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  status: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    borderRadius: 5,
    fontSize: 13,
    padding: '5px 20px',
    textTransform: 'capitalize'
  },

  ketToko: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },

  toko: {
    fontSize: 13,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#424242'
  },

  ketAlamatToko: {
    display: 'flex',
    justifyContent: 'flex-end'
  },

  alamatToko: {
    fontSize: 10,
    color: '#424242'
  }
}));

export default useStyles;
