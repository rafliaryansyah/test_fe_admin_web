import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridGap: 30,
    padding: '30px 0px 30px 0px'
  },

  cardUlasan: {
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    padding: 15,
    display: 'flex'
  },

  wrapperCardProduk: {
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    padding: 15,
    width: 100,
    height: 200
  },

  komentarPembeli: {
    boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.3)',
    padding: 15,
    width: '100%'
  }
}));

export default useStyles;
