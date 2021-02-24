import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Typography,
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

// services
import { getStore, updateStatusStore } from 'services';

// utils
import { dateConverterRes } from 'utils';

// components
import { ConfirmDialog } from 'components';

// redux
import { connect } from 'react-redux';
import { setStore } from 'modules';

function Beranda({ setDataStore, dataStore }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // id toko
  const { id } = useParams();

  // open dialog confirm
  const [openStatus, setOpenStatus] = useState(false);
  const [openOfficialStore, setOpenOfficialStore] = useState(false);

  // data status
  const [status, setStatus] = useState(2);

  // data official store
  const [officialStore, setOfficialStore] = useState(false);

  // event
  const [event, setEvent] = useState();

  // read data detail toko
  useEffect(() => {
    getStore(id).then(res => {
      setDataStore(res.data.data.merchantDetail);
      setStatus(res.data.data.merchantDetail.status?.id);
      setOfficialStore(res.data.data.merchantDetail.isOfficialStore?.status);
    });
  }, []);

  // status
  const onStatus = async () => {
    // services
    const result = await updateStatusStore(
      id,
      status === 2 ? 3 : 2,
      officialStore ? 1 : 2
    ).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenStatus(false);

      // read kembali data
      getStore(id).then(res => {
        setDataStore(res.data.data.merchantDetail);
        setStatus(res.data.data.merchantDetail.status?.id);
        setOfficialStore(res.data.data.merchantDetail.isOfficialStore?.status);
      });

      enqueueSnackbar('Berhasil memperbarui Status', {
        variant: 'success'
      });
    } else {
      setOpenStatus(false);

      enqueueSnackbar('Gagal memperbarui Status', {
        variant: 'error'
      });
    }
  };

  // official store
  const onOfficialStore = async e => {
    e.preventDefault();

    // services
    const result = await updateStatusStore(
      id,
      status === 2 ? 2 : 3,
      officialStore ? 2 : 1
    ).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenOfficialStore(false);

      // read kembali data
      getStore(id).then(res => {
        setDataStore(res.data.data.merchantDetail);
        setStatus(res.data.data.merchantDetail.status?.id);
        setOfficialStore(res.data.data.merchantDetail.isOfficialStore?.status);
      });

      enqueueSnackbar('Berhasil memperbarui Official Store', {
        variant: 'success'
      });
    } else {
      setOpenOfficialStore(false);

      enqueueSnackbar('Gagal memperbarui Official Store', {
        variant: 'error'
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <Avatar
          alt={dataStore.name}
          src={dataStore.image}
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
              checked={officialStore ? true : false}
              onChange={e => {
                setOpenOfficialStore(true);
                setEvent(e);
              }}
              name="officialStore"
            />
          }
          label="Official Store"
        />
      </div>
      <div>
        <Typography variant="h6" color="primary">
          Data Toko
        </Typography>
        <br />
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
            value={dataStore.createdAt && dateConverterRes(dataStore.createdAt)}
            disabled
          />
        </FormControl>
        <br />
        <br />
        <Typography variant="h6" color="primary">
          Data Pemilik Toko
        </Typography>
        <br />
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Nama
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput value={dataStore.owners?.name} disabled />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Email
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput value={dataStore.owners?.email} disabled />
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
        submit={e => {
          setOfficialStore(!event.target.checked);
          onOfficialStore(e);
        }}>
        Apakah yakin ingin mengubah Official Store?
      </ConfirmDialog>
    </div>
  );
}

Beranda.propTypes = {
  setDataStore: propTypes.func,
  dataStore: propTypes.object
};

const mapStateToProps = state => ({
  dataStore: state.stores.store
});

const mapDispatchToProps = dispatch => ({
  setDataStore: value => dispatch(setStore(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Beranda);
