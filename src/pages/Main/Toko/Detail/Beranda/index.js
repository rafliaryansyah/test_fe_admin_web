import { useState } from 'react';
import useStyles from './styles';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

function Beranda() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isActiveForm, setIsActiveForm] = useState(false);

  const [form, setForm] = useState({
    nama_toko: '',
    alamat: '',
    buka_sejak: '',
    nama_pemilik: ''
  });

  const [error, setError] = useState({
    nama_toko: '',
    alamat: '',
    buka_sejak: '',
    nama_pemilik: ''
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError({
      ...error,
      [e.target.name]: ''
    });
  };

  const validate = () => {
    const newError = { ...error };

    if (!form.nama_toko) {
      newError.nama_toko = 'Field masih kosong';
    }

    if (!form.alamat) {
      newError.alamat = 'Field masih kosong';
    }

    if (!form.buka_sejak) {
      newError.buka_sejak = 'Field masih kosong';
    }

    if (!form.nama_pemilik) {
      newError.nama_pemilik = 'Field masih kosong';
    }

    return newError;
  };

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      console.log('Submit : ', form);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <InputLabel
          htmlFor="nama_toko"
          error={error.nama_toko ? true : false}
          className={classes.label}>
          Nama Toko
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="nama_toko"
            id="nama_toko"
            color="primary"
            onChange={handleChange}
            value={form.nama_toko}
            error={error.nama_toko ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.nama_toko ? true : false}>
            {error.nama_toko}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="alamat"
          error={error.alamat ? true : false}
          className={classes.label}>
          Alamat
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="alamat"
            id="alamat"
            color="primary"
            onChange={handleChange}
            value={form.alamat}
            error={error.alamat ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.alamat ? true : false}>
            {error.alamat}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="buka_sejak"
          error={error.buka_sejak ? true : false}
          className={classes.label}>
          Buka Sejak
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="buka_sejak"
            id="buka_sejak"
            color="primary"
            onChange={handleChange}
            value={form.buka_sejak}
            error={error.buka_sejak ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.buka_sejak ? true : false}>
            {error.buka_sejak}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="nama_pemilik"
          error={error.nama_pemilik ? true : false}
          className={classes.label}>
          Nama Pemilik
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="nama_pemilik"
            id="nama_pemilik"
            color="primary"
            onChange={handleChange}
            value={form.nama_pemilik}
            error={error.nama_pemilik ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.nama_pemilik ? true : false}>
            {error.nama_pemilik}
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        <InputLabel
          htmlFor="nama_toko"
          error={error.nama_toko ? true : false}
          className={classes.label}>
          Data
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="nama_toko"
            id="nama_toko"
            color="primary"
            onChange={handleChange}
            value={form.nama_toko}
            error={error.nama_toko ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.nama_toko ? true : false}>
            {error.nama_toko}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="alamat"
          error={error.alamat ? true : false}
          className={classes.label}>
          Data
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="alamat"
            id="alamat"
            color="primary"
            onChange={handleChange}
            value={form.alamat}
            error={error.alamat ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.alamat ? true : false}>
            {error.alamat}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="buka_sejak"
          error={error.buka_sejak ? true : false}
          className={classes.label}>
          Data
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="buka_sejak"
            id="buka_sejak"
            color="primary"
            onChange={handleChange}
            value={form.buka_sejak}
            error={error.buka_sejak ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.buka_sejak ? true : false}>
            {error.buka_sejak}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="nama_pemilik"
          error={error.nama_pemilik ? true : false}
          className={classes.label}>
          Data
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="nama_pemilik"
            id="nama_pemilik"
            color="primary"
            onChange={handleChange}
            value={form.nama_pemilik}
            error={error.nama_pemilik ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.nama_pemilik ? true : false}>
            {error.nama_pemilik}
          </FormHelperText>
        </FormControl>
        {isActiveForm ? (
          <div className={classes.wrapperButton}>
            <Button variant="contained" color="primary" onClick={submit}>
              simpan
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setForm({
                  nama_toko: '',
                  alamat: '',
                  buka_sejak: '',
                  nama_pemilik: ''
                });
                setError({
                  nama_toko: '',
                  alamat: '',
                  buka_sejak: '',
                  nama_pemilik: ''
                });
                setIsActiveForm(false);
              }}>
              batal
            </Button>
          </div>
        ) : (
          <div className={classes.wrapperButton}>
            <Button variant="contained" color="primary">
              nonaktifkan
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setIsActiveForm(true)}>
              mode edit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Beranda;
