import { useState } from 'react';
import useStyles from './styles';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

// material-ui icons
import SearchIcon from '@material-ui/icons/Search';

// components
import Paginasi from '../../../components/molecules/Paginasi';
import DetailDialog from '../../../components/molecules/DetailDialog';

function Category({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    tipe: '',
    nama: ''
  });
  const [error, setError] = useState({
    tipe: '',
    nama: ''
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

    if (!form.tipe) {
      newError.tipe = 'Field masih kosong';
    }

    if (!form.nama) {
      newError.nama = 'Field masih kosong';
    }

    return newError;
  };

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      setForm({
        tipe: '',
        nama: ''
      });
      setOpen(false);
      enqueueSnackbar('Berhasil menambahkan kategori baru', {
        variant: 'success'
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setOpen(true)}>
          tambah kategori
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.wrapperTable}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>No</th>
              <th className={classes.th}>Type</th>
              <th className={classes.th}>Nama</th>
            </tr>
          </thead>
          <tbody>
            <tr className={classes.tr} onClick={() => setOpen(true)}>
              <td className={classes.td}>1</td>
              <td className={classes.td}>Produk</td>
              <td className={classes.td}>Teknologi</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Paginasi count={5} page={1} onClick={() => console.log('click')} />

      <DetailDialog
        open={open}
        close={() => {
          setOpen(false);
          setForm({
            tipe: '',
            nama: ''
          });
        }}>
        <InputLabel htmlFor="tipe" error={error.tipe ? true : false}>
          Tipe
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="tipe"
            id="tipe"
            color="primary"
            onChange={handleChange}
            value={form.tipe}
            error={error.tipe ? true : false}
          />
          <FormHelperText id="outlined-helper-text" error={error.tipe}>
            {error.tipe}
          </FormHelperText>
        </FormControl>

        <InputLabel htmlFor="nama" error={error.nama ? true : false}>
          Nama
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="nama"
            id="nama"
            color="primary"
            onChange={handleChange}
            value={form.nama}
            error={error.nama ? true : false}
          />
          <FormHelperText id="outlined-helper-text" error={error.nama}>
            {error.nama}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="small"
          fullWidth
          onClick={submit}>
          tambah
        </Button>
      </DetailDialog>
    </div>
  );
}

export default Category;
