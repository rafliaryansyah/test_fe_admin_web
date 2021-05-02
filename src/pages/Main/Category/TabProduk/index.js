import React, { useEffect, useRef, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// debonce untuk fitur pencarian
import { debounce } from 'debounce';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment
} from '@material-ui/core';

// react icons
import {
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';
import { setCategoriesProduk, setID, setDari, setTerkait } from 'modules';

// services
import {
  getCategory,
  getDetailCategoryProducts,
  updateCategory,
  deleteCategory
} from 'services';

// utils
import { fileExtention, uriToFile } from 'utils';

function TabProduk({
  setDataCategoriesProduk,
  dataCategoriesProduk,
  setDataID,
  setDataDari,
  setDataTerkait,
  history
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // open dialog
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data id
  const [id, setID] = useState('');

  // data detail kategori
  const [detail, setDetail] = useState({});

  // data form kategori
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

  // change input
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

  // validasi input
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

  // read data kategori tipe 1 (produk)
  useEffect(() => {
    getCategory(false, '1').then(res => {
      setDataCategoriesProduk(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    });
  }, []);

  // update data kategori tipe 1 (produk)
  const onUpdate = async e => {
    e.preventDefault();

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

      // cek image baru atau tetap yang lama
      if (image.name) {
        formdata.append('image', image);
      }

      // services
      const result = await updateCategory(id, formdata).catch(err => err);

      // cek sukses atau tidak
      if (result.success) {
        setOpenEdit(false);

        setForm({
          type: '1',
          name: '',
          image: ''
        });

        // read kembali data
        getCategory(false, '1').then(res => {
          setDataCategoriesProduk(res.data.data);
          setCurrentPage(res.data.meta.current_page);
          setLastPage(res.data.meta.last_page);
        });

        enqueueSnackbar('Berhasil memperbarui data', {
          variant: 'success'
        });
      } else {
        setOpenEdit(false);

        enqueueSnackbar('Gagal memperbarui data', {
          variant: 'error'
        });
      }
    }
  };

  // delete
  const onDelete = async () => {
    // services
    const result = await deleteCategory(id).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenHapus(false);

      // read kembali data
      getCategory(false, '1').then(res => {
        setDataCategoriesProduk(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setLastPage(res.data.meta.last_page);
      });

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    } else {
      setOpenHapus(false);

      // cek response code
      if (result.data.response.data.code === 422) {
        enqueueSnackbar(
          'Kategori tidak dapat dihapus karena memiliki item terkait.',
          {
            variant: 'error'
          }
        );
      }
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file.type}`
      });
    } else if (file.size >= 512000) {
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
    <div className={classes.wrapper}>
      <FormControl variant="outlined" size="small" fullWidth>
        <OutlinedInput
          color="primary"
          placeholder="Cari"
          onChange={debounce(e => {
            getCategory(false, '1', 999999, e.target.value).then(res => {
              setDataCategoriesProduk(res.data.data);
            });
          }, 3000)}
          endAdornment={
            <InputAdornment position="start">
              <IoSearchOutline />
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={classes.main}>
        {dataCategoriesProduk?.map(data => (
          <Card key={data.id}>
            <CardActionArea
              disabled={data.isDeleted}
              onClick={() => {
                setDetail(data);
                setID(data.id);
                setOpenDetail(true);
              }}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                width="100%"
                height="100%"
                image={data.image}
                title={data.name}
              />
              <CardContent className={classes.content}>
                <span style={{ fontSize: 8 }}>{data.name}</span>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.action}>
              <IconButton
                size="small"
                color="primary"
                disabled={data.isDeleted}
                onClick={() => {
                  setID(data.id);
                  setForm({
                    ...form,
                    type: data.type && data.type.id.toString(),
                    name: data.name,
                    image: data.image
                  });
                  setOpenEdit(true);
                }}>
                <IoPencilOutline />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                disabled={data.isDeleted}
                onClick={() => {
                  setID(data.id);
                  setOpenHapus(true);
                }}>
                <IoTrashOutline />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) => {
          getCategory(false, '1', null, '', value).then(res => {
            setDataCategoriesProduk(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });
        }}
      />

      <CompDialog open={openDetail} close={() => setOpenDetail(false)}>
        <Avatar
          alt="photo"
          src={detail.image}
          variant="rounded"
          className={classes.preview}
        />
        <br />
        <div className={classes.desk}>
          <span className={classes.teks}>nama kategori</span>
          <span className={classes.teks}>{detail.name}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>tipe kategori</span>
          <span className={classes.teks}>{detail.type?.name}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>produk terkait</span>
          <span className={classes.teks}>
            {detail.relatedItem} |
            <span
              className={classes.cekTerkait}
              onClick={() => {
                getDetailCategoryProducts(id).then(res => {
                  setDataID(id);
                  setDataDari('kategori-produk');
                  setDataTerkait(res.data);
                  history.replace('/produk-terkait');
                });
              }}>
              cek
            </span>
          </span>
        </div>

        <div className={classes.desk}>
          <span className={classes.teks}>Sub Kategori</span>
          <span className={classes.teks}>
            {detail?.childs?.map((val, i) => {
              if (i !== detail?.childs.length - 1) {
                return (
                  <React.Fragment>
                    <span key={i}>{val.name}</span>
                    <span>{', '}</span>
                  </React.Fragment>
                );
              }
              return <span key={i}>{val.name}</span>;
            })}
            {/* <span
              className={classes.cekTerkait}
              onClick={() => {
                getDetailCategoryProducts(id).then(res => {
                  setDataID(id);
                  setDataDari('kategori-produk');
                  setDataTerkait(res.data);
                  history.replace('/produk-terkait');
                });
              }}>
              cek
            </span> */}
          </span>
        </div>
      </CompDialog>

      <CompDialog
        open={openEdit}
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
          setOpenEdit(false);
        }}
        title="Edit Kategori">
        <div style={{ display: 'grid', padding: 15 }}>
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
            onClick={onUpdate}
            className={classes.submit}
            disabled={form.type && form.name && form.image ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={openHapus}
        close={() => setOpenHapus(false)}
        submit={onDelete}
        title="Hapus Kategori">
        Yakin ingin menghapus?
      </ConfirmDialog>
    </div>
  );
}

TabProduk.propTypes = {
  setDataCategoriesProduk: propTypes.func,
  dataCategoriesProduk: propTypes.array,
  setDataID: propTypes.func,
  setDataDari: propTypes.func,
  setDataTerkait: propTypes.func
};

const mapStateToProps = state => ({
  dataCategoriesProduk: state.category.categoriesProduk
});

const mapDispatchToProps = dispatch => ({
  setDataCategoriesProduk: value => dispatch(setCategoriesProduk(value)),
  setDataID: value => dispatch(setID(value)),
  setDataDari: value => dispatch(setDari(value)),
  setDataTerkait: value => dispatch(setTerkait(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabProduk);
