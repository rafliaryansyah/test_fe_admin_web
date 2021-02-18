import { useRef, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
import TabJasa from './TabJasa';

// redux
import { connect } from 'react-redux';
import { setCategoriesProduk, setCategoriesJasa } from 'modules';

// services
import { postCategory, getCategory } from 'services';

// utils
import { fileExtention, uriToFile } from 'utils';

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

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: 'px', height: 450, aspect: 1 / 1 });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

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
        setOpen(false);

        setForm({
          type: '1',
          name: '',
          image: ''
        });

        // cek tipe
        if (form.type === '1') {
          // read kembali data kategori type produk baru
          getCategory(false, '1').then(res => {
            setDataCategoriesProduk(res.data.data);
          });
        } else {
          // read kembali data kategori type jasa baru
          getCategory(false, '2').then(res => {
            setDataCategoriesJasa(res.data.data);
          });
        }

        enqueueSnackbar('berhasil menambah data', {
          variant: 'success'
        });
      } else {
        setOpen(false);

        enqueueSnackbar('gagal menambah data', { variant: 'error' });
      }
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file && file.type}`
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
          if (file) {
            Resizer.imageFileResizer(
              file,
              300,
              300,
              file?.type === 'image/jpeg' ? 'JPEG' : 'PNG',
              100,
              0,
              uri => {
                if (uri) {
                  setURI(uri);
                }
              },
              'base64'
            );
          }
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

  // crop
  const imageLoaded = image => {
    imageRef.current = image;
  };

  const onChangeCrop = crop => {
    setCrop(crop);
  };

  const onCropComplete = crop => {
    setCompleteCrop(crop);

    const image = imageRef.current; // image
    const canvas = previewCanvasRef.current; // document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio; // pixel ratio

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    image.crossOrigin = 'anonymus';

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  };

  // set crop
  const onClickToSetCrop = e => {
    e.preventDefault();

    if (uri) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(uri);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setForm({ ...form, image: base64ToFile });

      setURI();
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
            <Redirect to="/category/produk" />
          </Switch>
        </SwipeableViews>
      </div>

      <CompDialog
        open={open}
        close={() => {
          setForm({
            type: '1',
            name: '',
            image: ''
          });
          setError({
            type: '',
            name: '',
            image: ''
          });
          setURI();
          setOpen(false);
        }}
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
            <InputLabel id="image" style={{ marginBottom: 15 }}>
              Gambar
            </InputLabel>
            {!uri && (
              <Avatar
                alt="image"
                src={
                  form.image?.name
                    ? URL.createObjectURL(form.image)
                    : form.image
                }
                variant="rounded"
                className={classes.preview}
              />
            )}

            {uri && (
              <div style={{ textAlign: 'center' }}>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    width: Math.round(completeCrop?.width ?? 0),
                    height: Math.round(completeCrop?.height ?? 0)
                  }}
                />
              </div>
            )}

            {uri && (
              <div style={{ textAlign: 'center' }}>
                <ReactCrop
                  src={uri}
                  crop={crop}
                  onImageLoaded={imageLoaded}
                  onComplete={onCropComplete}
                  onChange={onChangeCrop}
                  keepSelection={true}
                />
              </div>
            )}

            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={onSelectedImage}
              style={{ display: 'none' }}
            />

            <div className={classes.actionUploadFile}>
              <label htmlFor="upload" className={classes.item}>
                pilih foto
              </label>
              {/* {isActiveForm && !uri && (
            <label
              onClick={() => {
                setURI(form.photo);
                console.log(form.photo);
              }}
              className={classes.item}>
              crop
            </label>
          )} */}
              {uri && (
                <label onClick={onClickToSetCrop} className={classes.item}>
                  set
                </label>
              )}
            </div>
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
