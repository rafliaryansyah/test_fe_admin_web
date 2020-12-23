import { useEffect } from 'react';
import useStyles from './styles';
import { useParams } from 'react-router-dom';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Button,
  IconButton,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// material-ui icons
import { FileCopy } from '@material-ui/icons';

// redux
import { connect } from 'react-redux';
import { setStore, setProduks, setReports } from 'modules';

// services
import { getStore } from 'services';

// utils
import { dateConverterRes } from 'utils';

function Beranda({ setDataStore, setDataProduks, setDataReports, dataStore }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    getStore(id).then(res => {
      setDataStore(res.data.data.merchantDetail);
      setDataProduks(res.data.data.merchantProducts);
      setDataReports(res.data.data.merchantReports);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div>
        {/* {dataStore.photo ? (
          <img src="" alt="photo" className={classes.photo} />
        ) : (
          <div className={classes.wrapperImage}>
            <span className={classes.avatar}>
              {dataStore.name.split('')[0]}
            </span>
          </div>
        )} */}
        <div className={classes.wrapperImage}>
          <span className={classes.avatar}>
            {dataStore.name && dataStore.name.split('')[0]}
          </span>
        </div>
        <Button variant="contained" color="primary">
          nonaktifkan
        </Button>
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
                  <FileCopy />
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
            value={dateConverterRes(dataStore && dataStore.createdAt)}
            disabled
          />
        </FormControl>
        <InputLabel htmlFor="nama_toko" className={classes.label}>
          Nama Pemilik
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            value={dataStore.owner && dataStore.owner.name}
            disabled
          />
        </FormControl>
      </div>
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
