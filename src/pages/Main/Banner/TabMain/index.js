import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

// select
import MultiSelect from 'react-select';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import ScrollContainer from 'react-indiana-drag-scroll';

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
  InputAdornment,
  Select,
  MenuItem
} from '@material-ui/core';

// react icons
import {
  IoPencilOutline,
  IoTrashOutline,
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

function TabMain() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // open dialog
  const [openForm, setOpenForm] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // promo dan kategori pertipe
  const [dataPromo, setDataPromo] = useState([]);
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
  const [image, setImage] = useState('');
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);

  // error form
  const [error, setError] = useState({
    produk: '',
    image: ''
  });

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: '%', width: 30, height: 20 });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

  // mencocokan data response promo
  const autoSelectPromos = values => {
    values?.map(title => {
      dataPromo.findIndex(
        promo =>
          promo.label === title &&
          promos.push({ value: promo.value, label: promo.label })
      );
    });
  };

  // mencocokan data response kategori
  const autoSelectCategoriesProduk = values => {
    values?.map(name => {
      kategoriProduk.findIndex(
        kategori =>
          kategori.label === name &&
          categories.push({ value: kategori.value, label: kategori.label })
      );
    });
  };

  // mencocokan data response kategori
  const autoSelectCategoriesJasa = values => {
    values?.map(name => {
      kategoriJasa.findIndex(
        kategori =>
          kategori.label === name &&
          categories.push({ value: kategori.value, label: kategori.label })
      );
    });
  };

  // read data banner
  useEffect(() => {
    readBannersMain(false).then(res => {
      setMains(res.data.data);
    });
  }, []);

  // read data promo
  useEffect(() => {
    readPromo(false, 999999).then(res => {
      const data = [];

      res.data.data.map(promo => {
        data.push({ value: promo.id, label: promo.title });
      });

      setDataPromo(data);
    });
  }, []);

  // read data kategori per tipe
  useEffect(() => {
    getCategory(false, '1', 999999).then(res => {
      const data = [];

      res.data.data.map(kategori => {
        data.push({ value: kategori.id, label: kategori.name });
      });

      setKategoriProduk(data);
    });

    getCategory(false, '2', 999999).then(res => {
      const data = [];

      res.data.data.map(kategori => {
        data.push({ value: kategori.id, label: kategori.name });
      });

      setKategoriJasa(data);
    });
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

          setRelate('1');
          setType('1');
          setStatus(2);
          setProduk('');
          setImage('');

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
        formdata.append('image', image);

        // service
        const result = await createMainBanners(formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          setRelate('1');
          setType('1');
          setStatus(2);
          setProduk('');
          setImage('');

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
          formdata.append(`promos[${index}]`, promo.value);
        });

        // ambil data categories per index
        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
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

          setRelate('1');
          setType('1');
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

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
          formdata.append(`promos[${index}]`, promo.value);
        });

        // ambil data categories per index
        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
        });

        formdata.append('image', image);

        // service
        const result = await createMainBanners(formdata).catch(err => err);

        // cek sukses atau gagal
        if (result.success) {
          setOpenForm(false);

          setRelate('1');
          setType('1');
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

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

      setImage(base64ToFile);

      setURI();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main aktif</label>
          <br />
          <br />
          <div>
            <ScrollContainer
              vertical={false}
              nativeMobileScroll
              className={classes.scrollContainer}>
              <div className={classes.wrapperItem}>
                {mains?.map(
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
                            height="480px"
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
                            height="480px"
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
                              autoSelectPromos(item.detail?.promos);
                              autoSelectCategoriesProduk(
                                item.detail?.categories
                              );
                              autoSelectCategoriesJasa(item.detail?.categories);
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
              </div>
            </ScrollContainer>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main history</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {mains?.map(
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
                          height="480px"
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
                          height="480px"
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
                            autoSelectPromos(item.detail?.promos);
                            autoSelectCategoriesProduk(item.detail?.categories);
                            autoSelectCategoriesJasa(item.detail?.categories);
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
            </div>
          </ScrollContainer>
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
          setURI();
          setOpenForm(false);
        }}
        title="Form Main">
        <div className={classes.form}>
          <div>
            <FormLabel component="legend">Arahkan ke</FormLabel>
            <FormControl component="fieldset">
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
          </div>

          <div>
            <FormLabel component="legend">Tipe</FormLabel>
            <FormControl component="fieldset">
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
          </div>

          {relate === '1' ? (
            <div>
              {isEdit && (
                <div>
                  <InputLabel id="status" style={{ marginBottom: 10 }}>
                    status
                  </InputLabel>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Select
                      labelId="status"
                      id="status"
                      name="status"
                      value={status}
                      onChange={e => setStatus(e.target.value)}>
                      <MenuItem value={1}>Aktif</MenuItem>
                      <MenuItem value={2}>Tidak Aktif</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

              <div style={{ margin: '15px 0px' }}>
                <InputLabel
                  htmlFor="product"
                  error={error.produk ? true : false}>
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
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 414 / 332 )</InputLabel>
                {!uri && (
                  <Avatar
                    src={image?.name ? URL.createObjectURL(image) : image}
                    variant="rounded"
                    classes={{
                      root: classes.previewRoot
                    }}
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
                <FormHelperText
                  id="outlined-helper-text"
                  error={error.image ? true : false}>
                  {error.image}
                </FormHelperText>
              </div>
            </div>
          ) : (
            <div>
              {isEdit && (
                <div>
                  <InputLabel id="status" style={{ marginBottom: 10 }}>
                    status
                  </InputLabel>
                  <FormControl variant="outlined" size="small" fullWidth>
                    <Select
                      labelId="status"
                      id="status"
                      name="status"
                      value={status}
                      onChange={e => setStatus(e.target.value)}>
                      <MenuItem value={1}>Aktif</MenuItem>
                      <MenuItem value={2}>Tidak Aktif</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              )}

              <div style={{ marginTop: 15 }}>
                <InputLabel id="products">Promo (max 5)</InputLabel>
                <MultiSelect
                  name="promos"
                  defaultValue={promos}
                  onChange={setPromos}
                  options={dataPromo}
                  placeHolder="Silakan pilih promo"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div style={{ margin: '30px 0px' }}>
                <InputLabel id="categories">Kategori (max 5)</InputLabel>
                <MultiSelect
                  name="categories"
                  defaultValue={categories}
                  onChange={setCategories}
                  options={type === '1' ? kategoriProduk : kategoriJasa}
                  placeHolder="Silakan pilih kategori"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 414 / 332 )</InputLabel>
                {!uri && (
                  <Avatar
                    src={image?.name ? URL.createObjectURL(image) : image}
                    variant="rounded"
                    classes={{
                      root: classes.previewRoot
                    }}
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
                <FormHelperText
                  id="outlined-helper-text"
                  error={error.image ? true : false}>
                  {error.image}
                </FormHelperText>
              </div>
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
            src={detail.image}
            variant="rounded"
            classes={{
              root: classes.previewRoot
            }}
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
            src={detail.image}
            variant="rounded"
            classes={{
              root: classes.previewRoot
            }}
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
