import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { Avatar } from '@material-ui/core';

function CardProduk({
  srcImage,
  nama,
  harga,
  type,
  stok,
  status,
  toko,
  alamatToko,
  handleDetail
}) {
  const classes = useStyles();

  return (
    <div className={classes.cardProduk} onClick={handleDetail}>
      <Avatar
        alt={name}
        src={srcImage}
        variant="rounded"
        className={classes.avatar}
      />
      <div className={classes.desk}>
        <div className={classes.ketProduk}>
          <label className={classes.nama}>{nama}</label>
          <span className={classes.harga}>{harga}</span>
          <span className={classes.type}>{type}</span>
          <span className={classes.stok}>{`stok : ${stok}`}</span>
        </div>
        <div className={classes.ketStatusProdukToko}>
          <span className={classes.status}>{status}</span>
          <div className={classes.ketToko}>
            <span className={classes.toko}>{toko}</span>
            <div className={classes.ketAlamatToko}>
              <span className={classes.alamatToko}>{alamatToko}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardProduk.propTypes = {
  srcImage: propTypes.string,
  nama: propTypes.string,
  harga: propTypes.string,
  type: propTypes.string,
  stok: propTypes.string,
  status: propTypes.string,
  toko: propTypes.string,
  alamatToko: propTypes.string,
  handleDetail: propTypes.func
};

export default CardProduk;
