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
  InputAdornment,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

// material-ui icons
import { IoCopyOutline } from 'react-icons/io5';

// redux
import { connect } from 'react-redux';
import { setStore, setProduks, setReports } from 'modules';

// services
import { getStore, updateStatusStore } from 'services';

// utils
import { dateConverterRes } from 'utils';

// components
import { ConfirmDialog } from 'components';

function Beranda({ setDataStore, setDataProduks, setDataReports, dataStore }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // id toko
  const { id } = useParams();

  // open dialog confirm
  const [openStatus, setOpenStatus] = useState(false);
  const [openOfficialStore, setOpenOfficialStore] = useState(false);

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

  // status
  const onStatus = async () => {
    if (dataStore.status?.name === 'Approved') {
      // services
      const result = await updateStatusStore(
        id,
        3,
        dataStore.isOfficialStore?.id
      ).catch(err => err);

      // cek sukses atau gagal
      if (result.success) {
        setOpenStatus(false);

        // read kembali data
        getStore(id).then(res => {
          setDataStore(res.data.data.merchantDetail);
          const data = res.data.data.merchantProductsAndService.products.data.concat(
            res.data.data.merchantProductsAndService.services.data
          );
          setDataProduks(data);
          setDataReports(res.data.data.merchantReports);
        });

        enqueueSnackbar('Berhasil mengubah Status', {
          variant: 'success'
        });
      } else {
        setOpenStatus(false);

        enqueueSnackbar('Gagal mengubah Status', {
          variant: 'error'
        });
      }
    } else {
      // services
      const result = await updateStatusStore(
        id,
        2,
        dataStore.isOfficialStore?.id
      ).catch(err => err);

      // cek sukses atau gagal
      if (result.success) {
        setOpenStatus(false);

        // read kembali data
        getStore(id).then(res => {
          setDataStore(res.data.data.merchantDetail);
          const data = res.data.data.merchantProductsAndService.products.data.concat(
            res.data.data.merchantProductsAndService.services.data
          );
          setDataProduks(data);
          setDataReports(res.data.data.merchantReports);
        });

        enqueueSnackbar('Berhasil mengubah Status', {
          variant: 'success'
        });
      } else {
        setOpenStatus(false);

        enqueueSnackbar('Gagal mengubah Status', {
          variant: 'error'
        });
      }
    }
  };

  // official store
  const onOfficialStore = async () => {
    // cek official store true atau false
    if (dataStore.isOfficialStore?.status) {
      // services
      const result = await updateStatusStore(id, dataStore.status?.id, 2).catch(
        err => err
      );

      // cek sukses atau gagal
      if (result.success) {
        setOpenOfficialStore(false);

        // read kembali data
        getStore(id).then(res => {
          setDataStore(res.data.data.merchantDetail);
          const data = res.data.data.merchantProductsAndService.products.data.concat(
            res.data.data.merchantProductsAndService.services.data
          );
          setDataProduks(data);
          setDataReports(res.data.data.merchantReports);
        });

        enqueueSnackbar('Berhasil mengubah Official Store', {
          variant: 'success'
        });
      } else {
        setOpenOfficialStore(false);

        enqueueSnackbar('Gagal mengubah Official Store', {
          variant: 'error'
        });
      }
    } else {
      // services
      const result = await updateStatusStore(id, dataStore.status?.id, 1).catch(
        err => err
      );

      // cek sukses atau gagal
      if (result.success) {
        setOpenOfficialStore(false);

        // read kembali data
        getStore(id).then(res => {
          setDataStore(res.data.data.merchantDetail);
          const data = res.data.data.merchantProductsAndService.products.data.concat(
            res.data.data.merchantProductsAndService.services.data
          );
          setDataProduks(data);
          setDataReports(res.data.data.merchantReports);
        });

        enqueueSnackbar('Berhasil mengubah Official Store', {
          variant: 'success'
        });
      } else {
        setOpenOfficialStore(false);

        enqueueSnackbar('Gagal mengubah Official Store', {
          variant: 'error'
        });
      }
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setOpenStatus(true);
          }}
          className={classes.btnNonaktifkan}>
          {dataStore.status?.name === 'Approved' ? 'nonaktifkan' : 'aktifkan'}
        </Button>
        <br />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataStore.isOfficialStore?.status}
              onClick={() => {
                setOpenOfficialStore(true);
              }}
              name="official_store"
            />
          }
          label="Official Store"
        />
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
          <OutlinedInput value={dataStore?.owners?.name} disabled />
        </FormControl>
      </div>
      <ConfirmDialog
        open={openStatus}
        close={() => setOpenStatus(false)}
        title="Status"
        submit={onStatus}>
        Apakah yakin ingin mengubah Status?
      </ConfirmDialog>
      <ConfirmDialog
        open={openOfficialStore}
        close={() => setOpenOfficialStore(false)}
        title="Official Store"
        submit={onOfficialStore}>
        Apakah yakin ingin mengubah Official Store?
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
