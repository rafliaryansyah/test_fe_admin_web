import { useEffect, useState } from 'react';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

// material-ui core
import { Avatar, Button } from '@material-ui/core';

// redux
import { connect } from 'react-redux';

// services
import { getProduk, updateStatusProduk } from 'services';

// utils
import { currency } from 'utils';

// components
import { ConfirmDialog } from 'components';

function Detail({ dataStore }) {
  const classes = useStyles();

  // id produk
  const { id } = useParams();

  // detail produk
  const [produk, setProduk] = useState({});
  const [status, setStatus] = useState(true);

  // open
  const [open, setOpen] = useState(false);

  // read data detail toko
  useEffect(() => {
    getProduk(dataStore.username, id)
      .then(res => setProduk(res.data.data))
      .catch(err => err);
  }, []);

  // const update status produk
  const updateStatus = async () => {
    // services
    const result = await updateStatusProduk(dataStore.id, id).catch(err => err);

    console.log(result);

    // cek sukses atau gagal
    if (result.success) {
      setOpen(false);
      console.log('sukses');
    } else {
      setOpen(false);
      console.log('gagal');
    }
  };

  return (
    <div className={classes.wrapper}>
      <Avatar
        alt={produk.name}
        // src={produk.images.map(item => item.image)}
        variant="rounded"
        className={classes.avatar}
      />
      <div className={classes.itemLabel}>
        <div className={classes.input}>
          <label className={classes.label}>nama</label>
          <span className={classes.text}>{produk.name}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>berat</label>
          <span
            className={
              classes.text
            }>{`${produk.heavy?.totalHeavy} ${produk.heavy?.type}`}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>tipe</label>
          <span className={classes.text}>{produk.type}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>harga</label>
          <span className={classes.text}>{currency(produk.price)}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>status</label>
          <span className={classes.text}>{produk.status}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>stock</label>
          <span className={classes.text}>{produk.stock}</span>
        </div>
        {status ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.btnNonaktif}>
            aktif
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.btnNonaktif}>
            nonaktifkan
          </Button>
        )}
      </div>
      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        title="Ubah Status"
        submit={updateStatus}>
        Apakah yakin ingin mengubah status?
      </ConfirmDialog>
    </div>
  );
}

Detail.propTypes = {
  dataStore: propTypes.object
};

const mapStateToProps = state => ({
  dataStore: state.stores.store
});

export default connect(mapStateToProps, null)(Detail);
