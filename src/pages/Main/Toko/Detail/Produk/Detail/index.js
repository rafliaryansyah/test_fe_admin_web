import { useEffect, useState } from 'react';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

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
  const { enqueueSnackbar } = useSnackbar();

  // id produk
  const { id } = useParams();

  // detail produk
  const [produk, setProduk] = useState({});

  // open
  const [open, setOpen] = useState(false);

  // read data detail toko
  useEffect(() => {
    getProduk(dataStore.username, id)
      .then(res => setProduk(res.data.data))
      .catch(err => err);
  }, []);

  // const update status produk
  const onStatus = async () => {
    // cek status aktif atau tidak aktif
    if (produk.status === 'Active') {
      // services
      const result = await updateStatusProduk(dataStore.username, id, 2).catch(
        err => err
      );

      // cek sukses atau gagal
      if (result.success) {
        setOpen(false);

        // read kembali data detail produk
        getProduk(dataStore.username, id)
          .then(res => setProduk(res.data.data))
          .catch(err => err);

        enqueueSnackbar('Berhasil mengnonaktifkan Status', {
          variant: 'success'
        });
      } else {
        setOpen(false);

        enqueueSnackbar('Gagal mengnonaktifkan Status', { variant: 'error' });
      }
    } else {
      // services
      const result = await updateStatusProduk(dataStore.username, id, 1).catch(
        err => err
      );

      // cek sukses atau gagal
      if (result.success) {
        setOpen(false);

        // read kembali data detail produk
        getProduk(dataStore.username, id)
          .then(res => setProduk(res.data.data))
          .catch(err => err);

        enqueueSnackbar('Berhasil mengaktifkan Status', { variant: 'success' });
      } else {
        setOpen(false);

        enqueueSnackbar('Gagal mengaktifkan Status', { variant: 'error' });
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <Avatar
        alt={produk.name}
        src={produk.images?.[0].image}
        variant="rounded"
        className={classes.avatar}
      />
      <div className={classes.itemLabel}>
        <div className={classes.input}>
          <label className={classes.label}>nama</label>
          <span className={classes.text}>{produk.name}</span>
        </div>
        {produk.heavy && (
          <div className={classes.input}>
            <label className={classes.label}>berat</label>
            <span className={classes.text}>
              {produk.heavy &&
                `${produk.heavy?.totalHeavy} ${produk.heavy?.type}`}
            </span>
          </div>
        )}
        <div className={classes.input}>
          <label className={classes.label}>tipe</label>
          <span className={classes.text}>{produk.type}</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>harga</label>
          <span className={classes.text}>
            {produk.price && currency(produk.price)}
          </span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>status</label>
          <span className={classes.text}>{produk.status}</span>
        </div>
        {produk.stock && (
          <div className={classes.input}>
            <label className={classes.label}>stock</label>
            <span className={classes.text}>{produk.stock}</span>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
          className={classes.btnNonaktif}>
          {produk.status === 'Active' ? 'nonaktifkan' : 'aktifkan'}
        </Button>
      </div>
      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        title="Status"
        submit={onStatus}>
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
