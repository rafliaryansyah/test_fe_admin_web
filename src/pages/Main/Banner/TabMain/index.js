import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// responsive carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 74
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 115
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 0
  }
};

// responsive carousel
const responsiveHistory = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    paritialVisibilityGutter: 60
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: -15
  }
};

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardMedia,
  CardActions,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  Select,
  MenuItem,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox
} from '@material-ui/core';

// react icons
import {
  IoPencilOutline,
  IoTrashOutline,
  IoCloudDownloadOutline,
  IoCopyOutline
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog } from 'components';

// services
import {
  readBannersMain,
  createMainBanners,
  updateMainBanners,
  deleteMainBanners,
  readPromo,
  getCategory
} from 'services';

// utils
import { fileExtention, uriToFile } from 'utils';

// MenuProps
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

function TabMain() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // open dialog
  const [openForm, setOpenForm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // promo
  const [dataPromo, setDataPromo] = useState([]);

  // kategori per tipe
  const [kategoriProduk, setKategoriProduk] = useState([]);
  const [kategoriJasa, setKategoriJasa] = useState([]);

  // data mains dan detail
  const [mains, setMains] = useState([]);
  const [detail, setDetail] = useState({});

  // tambah atau edit data
  const [isEdit, setIsEdit] = useState(false);

  // id item image
  const [id, setID] = useState('');

  // 1. Detail Produk atau 2. List Produk
  const [relate, setRelate] = useState('1');

  // type 1. produk 2. service
  const [type, setType] = useState('1');

  const [produk, setProduk] = useState('');
  const [status, setStatus] = useState(2);
  const [image, setImage] = useState(null);
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);

  // error form
  const [error, setError] = useState({
    produk: '',
    image: ''
  });

  // crop
  const [uri, setURI] = useState(null);
  const [crop, setCrop] = useState({ unit: 'px', width: 300, aspect: 16 / 9 });
  const [cropImage, setCropImage] = useState(null);
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

  // mencocokan data response kategori agar tercheckbox
  const autoCheckboxPromo = values => {
    values?.map(v => {
      dataPromo.findIndex(promo => promo.title === v && promos.push(promo.id));
    });
  };

  // checkbox promos
  const onCheckboxPromos = value => () => {
    const currentIndex = promos.indexOf(value);
    const newChecked = [...promos];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setPromos(newChecked);
  };

  // mencocokan data response kategori agar tercheckbox
  const autoCheckboxKategoriProduk = values => {
    values?.map(v => {
      kategoriProduk.findIndex(
        kategori => kategori.name === v && categories.push(kategori.id)
      );
    });
  };

  // mencocokan data response kategori agar tercheckbox
  const autoCheckboxKategoriJasa = values => {
    values?.map(v => {
      kategoriJasa.findIndex(
        kategori => kategori.name === v && categories.push(kategori.id)
      );
    });
  };

  // checkbox kategori
  const onCheckboxKategori = value => () => {
    const currentIndex = categories.indexOf(value);
    const newChecked = [...categories];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCategories(newChecked);
  };

  // read data banner
  useEffect(() => {
    readBannersMain(false).then(res => {
      setMains(res.data.data);
    });
  }, []);

  // read data promo
  useEffect(() => {
    readPromo(false).then(res => setDataPromo(res.data.data));
  }, []);

  // read data kategori per tipe
  useEffect(() => {
    getCategory(false, '1').then(res => setKategoriProduk(res.data.data));
    getCategory(false, '2').then(res => setKategoriJasa(res.data.data));
  }, []);

  // tambah atau edit
  const onCreate = async e => {
    e.preventDefault();

    // cek ke detail atau list
    if (relate === '1') {
      // validasi
      if (!produk || !image) {
        return setError({
          ...error,
          produk: !produk ? 'Field masih kosong' : '',
          image: !image ? 'Field masih kosong' : ''
        });
      }

      if (isEdit) {
        // form-data kosong
        const formdata = new FormData();

        formdata.append('relate', parseInt(relate));
        formdata.append('type', parseInt(type));
        formdata.append('status', status);
        formdata.append('product', produk);

        // cek apakah baru atau lama
        if (image.name) {
          formdata.append('image', image);
        }

        // service
        const result = await updateMainBanners(id, formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          // read kembali data main
          readBannersMain(false).then(res => {
            setMains(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
        } else {
          setOpenForm(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data kosong
        const formdata = new FormData();

        formdata.append('relate', parseInt(relate));
        formdata.append('type', parseInt(type));
        formdata.append('status', status);
        formdata.append('product', produk);

        // cek apakah baru atau lama
        if (image.name) {
          formdata.append('image', image);
        }

        // service
        const result = await createMainBanners(formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          // read kembali data main
          readBannersMain(false).then(res => {
            setMains(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', { variant: 'success' });
        } else {
          setOpenForm(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
        }
      }
    } else {
      // validasi
      if (!image) {
        return setError({
          ...error,
          image: !image ? 'Field masih kosong' : ''
        });
      }

      if (isEdit) {
        // form-data kosong
        const formdata = new FormData();

        formdata.append('relate', parseInt(relate));
        formdata.append('type', parseInt(type));
        formdata.append('status', status);

        // ambil data promos per index
        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo);
        });

        // ambil data categories per index
        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah baru atau lama
        if (image.name) {
          formdata.append('image', image);
        }

        // service
        const result = await updateMainBanners(id, formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          // read kembali data main
          readBannersMain(false).then(res => {
            setMains(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
        } else {
          setOpenForm(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data kosong
        const formdata = new FormData();

        formdata.append('relate', parseInt(relate));
        formdata.append('type', parseInt(type));
        formdata.append('status', status);

        // ambil data promos per index
        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo);
        });

        // ambil data categories per index
        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah baru atau lama
        if (image.name) {
          formdata.append('image', image);
        }

        // service
        const result = await createMainBanners(formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          // read kembali data main
          readBannersMain(false).then(res => {
            setMains(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', { variant: 'success' });
        } else {
          setOpenForm(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
        }
      }
    }
  };

  // hapus data
  const onDelete = async () => {
    // service
    const result = await deleteMainBanners(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpenHapus(false);

      // read kembali data baru
      readBannersMain(false).then(res => {
        setMains(res.data.data);
      });

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    } else {
      setOpenHapus(false);

      enqueueSnackbar('Gagal menghapus data', {
        variant: 'error'
      });
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files?.[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file.type}`
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

                  const photoFile = uriToFile(uri);

                  setImage(photoFile);
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

    if (cropImage) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(cropImage);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setImage(base64ToFile);

      setCropImage();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main aktif</label>
          <br />
          <br />
          {mains && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsive}>
              {mains.map(
                item =>
                  item.status?.id === 1 &&
                  (item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="230"
                          image={item.image}
                          title="main"
                        />
                      </CardActionArea>
                      <CardActions className={classes.action}>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setRelate(
                              item.relatedTo === 'Product Detail' ? '1' : '2'
                            );
                            setType(item.type?.id);
                            setStatus(item.status?.id);
                            setProduk(item.detail);
                            setImage(item.image);
                            setOpenForm(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ) : (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="230"
                          image={item.image}
                          title="Main"
                        />
                      </CardActionArea>
                      <CardActions className={classes.action}>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setRelate(
                              item.relatedTo === 'Product Detail' ? '1' : '2'
                            );
                            setType(item.type?.id);
                            setStatus(item.status?.id);
                            autoCheckboxPromo(item.detail?.promos);
                            autoCheckboxKategoriProduk(item.detail?.categories);
                            autoCheckboxKategoriJasa(item.detail?.categories);
                            setImage(item.image);
                            setOpenForm(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))
              )}
            </Carousel>
          )}
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main history</label>
          <br />
          <br />
          {mains && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsiveHistory}>
              {mains.map(
                item =>
                  item.status?.id === 2 &&
                  (item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="230"
                          image={item.image}
                          title="main"
                        />
                      </CardActionArea>
                      <CardActions className={classes.action}>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setRelate(
                              item.relatedTo === 'Product Detail' ? '1' : '2'
                            );
                            setType(item.type?.id);
                            setStatus(item.status?.id);
                            setProduk(item.detail);
                            setImage(item.image);
                            setOpenForm(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ) : (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="230"
                          image={item.image}
                          title="Main"
                        />
                      </CardActionArea>
                      <CardActions className={classes.action}>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setRelate(
                              item.relatedTo === 'Product Detail' ? '1' : '2'
                            );
                            setType(item.type?.id);
                            setStatus(item.status?.id);
                            autoCheckboxPromo(item.detail?.promos);
                            autoCheckboxKategoriProduk(item.detail?.categories);
                            autoCheckboxKategoriJasa(item.detail?.categories);
                            setImage(item.image);
                            setOpenForm(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))
              )}
            </Carousel>
          )}
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenForm(true)}>
            buat main
          </Button>
        </div>
      </div>

      <CompDialog
        open={openForm}
        close={() => {
          setIsEdit(false);
          setRelate('1');
          setType('1');
          setStatus(2);
          setProduk('');
          setImage(null);
          setPromos([]);
          setCategories([]);
          setError({ ...error, produk: '', image: '' });
          setCropImage();
          setOpenForm(false);
        }}
        title="Form Main">
        <div className={classes.form}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Arahkan ke</FormLabel>
            <RadioGroup
              row
              aria-label="relate"
              name="relate"
              value={relate}
              onChange={e => setRelate(e.target.value)}>
              <FormControlLabel
                value="1"
                control={<Radio color="primary" />}
                label="Detail Produk"
              />
              <FormControlLabel
                value="2"
                control={<Radio color="primary" />}
                label="List Produk"
              />
            </RadioGroup>
          </FormControl>

          <FormControl component="fieldset" style={{ marginBottom: 15 }}>
            <FormLabel component="legend">Tipe</FormLabel>
            <RadioGroup
              row
              aria-label="type"
              name="type"
              value={type}
              onChange={e => setType(e.target.value)}>
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

          {relate === '1' ? (
            <div style={{ marginTop: 10 }}>
              {isEdit && (
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ marginBottom: 15 }}>
                  <InputLabel id="status">status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    name="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    label="Status">
                    <MenuItem value={1}>Aktif</MenuItem>
                    <MenuItem value={2}>Tidak Aktif</MenuItem>
                  </Select>
                </FormControl>
              )}

              <InputLabel
                htmlFor="product"
                error={error.produk ? true : false}
                className={classes.label}>
                ID {type === '1' ? 'Produk' : 'Jasa'}
              </InputLabel>
              <FormControl
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth>
                <OutlinedInput
                  name="product"
                  id="product"
                  color="primary"
                  onChange={e => setProduk(e.target.value)}
                  value={produk}
                  error={error.produk ? true : false}
                />
                <FormHelperText
                  id="outlined-helper-text"
                  error={error.produk ? true : false}>
                  {error.produk}
                </FormHelperText>
              </FormControl>

              <div className={classes.inputFile}>
                <InputLabel id="image" style={{ marginBottom: 15 }}>
                  Gambar
                </InputLabel>
                {!cropImage && (
                  <Avatar
                    alt="image"
                    src={image?.name ? URL.createObjectURL(image) : image}
                    variant="rounded"
                    className={classes.preview}
                  />
                )}

                <div style={{ textAlign: 'center' }}>
                  <ReactCrop
                    src={cropImage}
                    crop={crop}
                    onImageLoaded={imageLoaded}
                    onComplete={onCropComplete}
                    onChange={onChangeCrop}
                  />
                </div>

                {cropImage && (
                  <div style={{ textAlign: 'center' }}>
                    <p>Preview Crop</p>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        width: Math.round(completeCrop?.width ?? 0),
                        height: Math.round(completeCrop?.height ?? 0)
                      }}
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
                  {!cropImage && (
                    <label htmlFor="upload" className={classes.item}>
                      <IoCloudDownloadOutline />
                      Upload
                    </label>
                  )}
                  {!cropImage && (
                    <label
                      onClick={() => setImage('')}
                      className={classes.item}>
                      hapus
                    </label>
                  )}
                  {image?.name && (
                    <label
                      onClick={() => {
                        setCropImage(image?.name ? uri : image);
                      }}
                      className={classes.item}>
                      crop
                    </label>
                  )}
                  {cropImage && (
                    <label
                      onClick={() => setCropImage()}
                      className={classes.item}>
                      batal crop
                    </label>
                  )}
                  {cropImage && (
                    <label onClick={onClickToSetCrop} className={classes.item}>
                      set crop
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
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              {isEdit && (
                <FormControl
                  variant="outlined"
                  size="small"
                  fullWidth
                  style={{ marginBottom: 15 }}>
                  <InputLabel id="status">status</InputLabel>
                  <Select
                    labelId="status"
                    id="status"
                    name="status"
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    label="Status">
                    <MenuItem value={1}>Aktif</MenuItem>
                    <MenuItem value={2}>Tidak Aktif</MenuItem>
                  </Select>
                </FormControl>
              )}

              <InputLabel id="products" style={{ marginBottom: 15 }}>
                Promo (max 5)
              </InputLabel>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <Select
                  labelId="promos"
                  id="promos"
                  name="promos"
                  multiple
                  value={promos}
                  input={<Input />}
                  MenuProps={MenuProps}>
                  <List dense>
                    {dataPromo?.map(item => {
                      const labelId = `checkbox-list-secondary-label-${item.title}`;
                      return (
                        <ListItem
                          key={item.id}
                          button
                          onClick={onCheckboxPromos(item.id)}>
                          <ListItemAvatar>
                            <Avatar alt={`Avatar ${item.title}`} />
                          </ListItemAvatar>
                          <ListItemText id={labelId} primary={item.title} />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              onChange={onCheckboxPromos(item.id)}
                              checked={promos?.indexOf(item.id) !== -1}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </Select>
              </FormControl>

              <InputLabel id="categories" style={{ marginBottom: 15 }}>
                Kategori (max 5)
              </InputLabel>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <Select
                  labelId="categories"
                  id="categories"
                  name="categories"
                  multiple
                  value={categories}
                  input={<Input />}
                  MenuProps={MenuProps}>
                  <List dense>
                    {type === '1' &&
                      kategoriProduk?.map(item => {
                        const labelId = `checkbox-list-secondary-label-${item.name}`;
                        return (
                          <ListItem
                            key={item.id}
                            button
                            onClick={onCheckboxKategori(item.id)}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar ${item.name}`}
                                src={item.image}
                              />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={item.name} />
                            <ListItemSecondaryAction>
                              <Checkbox
                                edge="end"
                                onChange={onCheckboxKategori(item.id)}
                                checked={categories?.indexOf(item.id) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}

                    {type === '2' &&
                      kategoriJasa?.map(item => {
                        const labelId = `checkbox-list-secondary-label-${item.name}`;
                        return (
                          <ListItem
                            key={item.id}
                            button
                            onClick={onCheckboxKategori(item.id)}>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar ${item.name}`}
                                src={item.image}
                              />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={item.name} />
                            <ListItemSecondaryAction>
                              <Checkbox
                                edge="end"
                                onChange={onCheckboxKategori(item.id)}
                                checked={categories?.indexOf(item.id) !== -1}
                                inputProps={{ 'aria-labelledby': labelId }}
                              />
                            </ListItemSecondaryAction>
                          </ListItem>
                        );
                      })}
                  </List>
                </Select>
              </FormControl>

              <div className={classes.inputFile}>
                <InputLabel id="image" style={{ marginBottom: 15 }}>
                  Gambar
                </InputLabel>
                {!cropImage && (
                  <Avatar
                    alt="image"
                    src={image?.name ? URL.createObjectURL(image) : image}
                    variant="rounded"
                    className={classes.preview}
                  />
                )}

                <div style={{ textAlign: 'center' }}>
                  <ReactCrop
                    src={cropImage}
                    crop={crop}
                    onImageLoaded={imageLoaded}
                    onComplete={onCropComplete}
                    onChange={onChangeCrop}
                  />
                </div>

                {cropImage && (
                  <div style={{ textAlign: 'center' }}>
                    <p>Preview Crop</p>
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        width: Math.round(completeCrop?.width ?? 0),
                        height: Math.round(completeCrop?.height ?? 0)
                      }}
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
                  {!cropImage && (
                    <label htmlFor="upload" className={classes.item}>
                      <IoCloudDownloadOutline />
                      Upload
                    </label>
                  )}
                  {!cropImage && (
                    <label
                      onClick={() => setImage('')}
                      className={classes.item}>
                      hapus
                    </label>
                  )}
                  {image?.name && (
                    <label
                      onClick={() => {
                        setCropImage(image?.name ? uri : image);
                      }}
                      className={classes.item}>
                      crop
                    </label>
                  )}
                  {cropImage && (
                    <label
                      onClick={() => setCropImage()}
                      className={classes.item}>
                      batal crop
                    </label>
                  )}
                  {cropImage && (
                    <label onClick={onClickToSetCrop} className={classes.item}>
                      set crop
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
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={onCreate}
            className={classes.submit}>
            simpan
          </Button>
        </div>
      </CompDialog>

      {relate === '1' ? (
        <CompDialog open={openDetail} close={() => setOpenDetail(false)}>
          <Avatar
            alt="photo"
            src={detail.image}
            variant="rounded"
            style={{ width: '100%', height: '100%' }}
          />

          <InputLabel htmlFor="nama_toko" style={{ marginTop: 15 }}>
            Arahkan Ke
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput value={detail.relatedTo} disabled />
          </FormControl>

          <InputLabel htmlFor="nama_toko" style={{ marginTop: 15 }}>
            ID {detail.type === '1' ? 'Produk' : 'Jasa'}
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              value={detail.detail}
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(detail.detail);
                      enqueueSnackbar('ID telah dicopy', {
                        variant: 'success'
                      });
                    }}
                    onMouseDown={e => e.preventDefault()}
                    edge="end">
                    <IoCopyOutline />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </CompDialog>
      ) : (
        <CompDialog open={openDetail} close={() => setOpenDetail(false)}>
          <Avatar
            alt="photo"
            src={detail.image}
            variant="rounded"
            style={{ width: '100%', height: '100%' }}
          />

          <InputLabel htmlFor="nama_toko" style={{ marginTop: 15 }}>
            Arahkan Ke
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput value={detail.relatedTo} disabled />
          </FormControl>
        </CompDialog>
      )}

      <ConfirmDialog
        open={openHapus}
        close={() => setOpenHapus(false)}
        submit={onDelete}
        title="Hapus Main">
        Apakah yakin ingin hapus ?
      </ConfirmDialog>
    </div>
  );
}

export default TabMain;
