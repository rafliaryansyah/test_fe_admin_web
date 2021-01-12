import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

// notistack
import { useSnackbar } from 'notistack';

// Swipe
import SwipeableViews from 'react-swipeable-views';

// material-ui core
import {
  Avatar,
  Button,
  AppBar,
  Tabs,
  Tab,
  FormControl,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel
} from '@material-ui/core';

import { useTheme } from '@material-ui/core/styles';

// components
import { CompDialog, PrivateRoute } from 'components';

// pages
import TabProduk from './TabProduk';
import CekProduks from './TabProduk/CekProduks';
import TabJasa from './TabJasa';
import CekJasa from './TabJasa/CekJasa';

// redux
import { connect } from 'react-redux';
import { setCategoriesProduk, setCategoriesJasa } from 'modules';

// services
import { postCategory, getCategory } from 'services';

function Category({
  setDataCategoriesProduk,
  setDataCategoriesJasa,
  location,
  history
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

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
    } else if (form.name.length < 3) {
      newError.name = 'Field minimal 3 karakter';
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
      </div>
      <AppBar position="static" color="default">
        <Tabs
          variant="fullWidth"
          bac
          indicatorColor="primary"
          textColor="primary"
          value={location.pathname}
          onChange={(event, value) => history.push(value)}
          aria-label="disabled tabs example">
          <Tab label="Produk" value="/category/produk" />
          <Tab label="Jasa" value="/category/jasa" />
        </Tabs>
      </AppBar>
      <div style={{ backgroundColor: '#ffffff', padding: 15 }}>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={location.pathname}
          onChangeIndex={index => {
            history.push(index);
          }}>
          <Switch>
            <PrivateRoute exact path="/category/produk" component={TabProduk} />
            <PrivateRoute exact path="/category/jasa" component={TabJasa} />
            <PrivateRoute
              path="/category/produk/terkait"
              component={CekProduks}
            />
            <PrivateRoute path="/category/jasa/terkait" component={CekJasa} />
            <Redirect to="/category/produk" />
          </Switch>
        </SwipeableViews>
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
            <Avatar
              alt="photo"
              src={
                form.image.name ? URL.createObjectURL(form.image) : form.image
              }
              variant="rounded"
              className={classes.preview}
            />
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
