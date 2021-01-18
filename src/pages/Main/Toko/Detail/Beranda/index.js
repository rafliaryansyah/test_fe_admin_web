import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  Button,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// material-ui icons
import { IoCopyOutline } from 'react-icons/io5';

// redux
import { connect } from 'react-redux';
import { setStore, setProduks, setReports } from 'modules';

// services
import { getStore, updateStatusStore, updateModeStore } from 'services';

// utils
import { dateConverterRes } from 'utils';

// components
import { ConfirmDialog } from 'components';

function Beranda({ setDataStore, setDataProduks, setDataReports, dataStore }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // id toko
  const { id } = useParams();

  // open
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(true);

  // read data detail toko
  useEffect(() => {
    getStore(id).then(res => {
      setDataStore(res.data.data.merchantDetail);
      const data = res.data.data.merchantProductsAndService.products.data.concat(
        res.data.data.merchantProductsAndService.services.data
      );
      setDataProduks(data);
      setDataReports(res.data.data.merchantReports);
    });
  }, []);

  // update status toko
  const updateStatus = async () => {
    // services
    const result = await updateStatusStore(id).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpen(false);
      console.log('sukses');
    } else {
      setOpen(false);
      console.log('gagal');
    }
  };

  // update mode toko
  const updateMode = async () => {
    // services
    const result = await updateModeStore(id).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      console.log('sukses');
    } else {
      console.log('gagal');
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Avatar
          alt={dataStore.name}
          src=""
          variant="rounded"
          className={classes.avatar}
        />
        {status ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.btnNonaktifkan}>
            aktif
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            className={classes.btnNonaktifkan}>
            nonaktifkan
          </Button>
        )}
      </div>
      <div>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Nama
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput value={dataStore.name} disabled />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          ID Toko
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            value={dataStore.id}
            disabled
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(dataStore.id);
                    enqueueSnackbar('ID telah dicopy', { variant: 'success' });
                  }}
                  onMouseDown={e => e.preventDefault()}
                  edge="end">
                  <IoCopyOutline />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Alamat
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput value={dataStore.address} disabled />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Buka Sejak
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            value={dateConverterRes(dataStore?.createdAt)}
            disabled
          />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Nama Pemilik
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput value={dataStore?.owner?.name} disabled />
        </FormControl>
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

Beranda.propTypes = {
  dataStore: propTypes.object,
  setDataStore: propTypes.func,
  setDataProduks: propTypes.func,
  setDataReports: propTypes.func
};

const mapStateToProps = state => ({
  dataStore: state.stores.store
});

const mapDispatchToProps = dispatch => ({
  setDataStore: value => dispatch(setStore(value)),
  setDataProduks: value => dispatch(setProduks(value)),
  setDataReports: value => dispatch(setReports(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);
