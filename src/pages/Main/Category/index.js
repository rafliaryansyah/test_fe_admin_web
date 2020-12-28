import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// material-ui icons
import SearchIcon from '@material-ui/icons/Search';

// components
import { CompDialog, PrivateRoute } from 'components';

// pages
import TabProduk from './TabProduk';
import TabJasa from './TabJasa';

// services
import { postCategory, getCategory } from 'services';

// redux
import { connect } from 'react-redux';
import { setCategoriesProduk, setCategoriesJasa } from 'modules';

function Category({
  setDataCategoriesProduk,
  setDataCategoriesJasa,
  location,
  history
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: '1',
    name: '',
    image: ''
  });

  const [error, setError] = useState({
    type: '',
    name: '',
    image: ''
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

    if (!form.type) {
      newError.type = 'Field masih kosong';
    }
    if (!form.name) {
      newError.name = 'Field masih kosong';
    }
    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  // tambah
  const submit = async e => {
    e.preventDefault();

    // validation
    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // state
      const { type, name, image } = form;

      // menggunakan form-data yang kosong
      const formdata = new FormData();

      // mengisi form-data dengan append
      formdata.append('type', parseInt(type));
      formdata.append('name', name);
      formdata.append('image', image);

      // services
      const result = await postCategory(formdata).catch(err => err);

      // cek sukses atau tidak
      if (result.success) {
        setForm({
          type: '1',
          name: '',
          image: ''
        });
        setOpen(false);
        enqueueSnackbar('berhasil membuat kategori baru', {
          variant: 'success'
        });

        // read kembali data kategori type produk baru
        setTimeout(() => {
          getCategory('1')
            .then(res => {
              setDataCategoriesProduk(res.data.data);
            })
            .catch(err => err);
        }, 5000);

        // read kembali data kategori type jasa baru
        setTimeout(() => {
          getCategory('2')
            .then(res => {
              setDataCategoriesJasa(res.data.data);
            })
            .catch(err => err);
        }, 5000);
      } else {
        setForm({
          type: '1',
          name: '',
          image: ''
        });
        setOpen(false);
        enqueueSnackbar('gagal membuat kategori baru', { variant: 'error' });
      }
    }
  };

  // upload image
  const handleUploadFile = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file && file.type}`
      });
    } else if (file && file.size >= 2097152) {
      setError({
        ...error,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setError({
          ...error,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setError({
          ...error,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setError({
          ...error,
          image: ''
        });

        try {
          setForm({
            ...form,
            image: file
          });
        } catch (e) {
          setError({
            ...error,
            image: e.message
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}>
          buat kategori
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.menuTabToko}>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={location.pathname}
          onChange={(event, value) => history.push(value)}
          aria-label="disabled tabs example">
          <Tab label="Produk" value="/category/produk" />
          <Tab label="Jasa" value="/category/jasa" />
        </Tabs>
        <div className={classes.tabsMain}>
          <Switch>
            <PrivateRoute exact path="/category/produk" component={TabProduk} />
            <PrivateRoute path="/category/jasa" component={TabJasa} />
            <Redirect to="/category/produk" />
          </Switch>
        </div>
      </div>
      <CompDialog
        open={open}
        close={() => setOpen(false)}
        title="Buat Kategori">
        <div className={classes.form}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Tipe</FormLabel>
            <RadioGroup
              row
              aria-label="type"
              name="type"
              value={form.type}
              onChange={handleChange}>
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="Produk"
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="Jasa"
              />
            </RadioGroup>
          </FormControl>

          <InputLabel
            htmlFor="name"
            error={error.name ? true : false}
            className={classes.label}>
            Nama
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="name"
              id="name"
              color="primary"
              onChange={handleChange}
              value={form.name}
              error={error.name ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.name ? true : false}>
              {error.name}
            </FormHelperText>
          </FormControl>

          <div className={classes.inputFile}>
            <div className={classes.itemPreview}>
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Foto Banner"
                  className={classes.preview}
                />
              ) : (
                'Image Preview'
              )}
            </div>
            <input
              type="file"
              id="upload"
              accept="image/png,image/jpg,image/jpeg"
              onChange={handleUploadFile}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload" className={classes.itemUpload}>
              Upload Foto
            </label>
          </div>
          <br />
          <FormHelperText
            id="outlined-helper-text"
            error={error.image ? true : false}>
            {error.image}
          </FormHelperText>

          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
            disabled={form.type && form.name && form.image ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>
    </div>
  );
}

Category.propTypes = {
  setDataCategoriesProduk: propTypes.func,
  setDataCategoriesJasa: propTypes.func
};

const mapDispatchToProps = dispatch => ({
  setDataCategoriesProduk: value => dispatch(setCategoriesProduk(value)),
  setDataCategoriesJasa: value => dispatch(setCategoriesJasa(value))
});

export default connect(null, mapDispatchToProps)(Category);
