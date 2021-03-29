import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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
  Select,
  MenuItem,
  InputAdornment
} from '@material-ui/core';

// react icons
import {
  IoPencilOutline,
  IoTrashOutline,
  IoCopyOutline
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog } from 'components';

// redux
import { connect } from 'react-redux';
import { setBanners } from 'modules';

// services
import {
  readBannersMini,
  createMiniBanners,
  updateMiniBanners,
  deleteMiniBanners,
  readPromo,
  getCategory
} from 'services';

// utils
import { fileExtention, uriToFile } from 'utils';

function TabMini() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data open
  const [openFP, setOpenFP] = useState(false);
  const [openFS, setOpenFS] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // data promos dan category
  const [dataPromo, setDataPromo] = useState([]);
  const [kategoriProduk, setKategoriProduk] = useState([]);
  const [kategoriJasa, setKategoriJasa] = useState([]);

  // data mini dan detail
  const [miniProduk, setMiniProduk] = useState([]);
  const [miniService, setMiniService] = useState([]);
  const [detail, setDetail] = useState({});

  // tambah atau edit data
  const [isEdit, setIsEdit] = useState(false);

  // id item image
  const [id, setID] = useState('');
  const [type, setType] = useState(0);

  // relate ke 1. Detail Produk atau 2. List Produk
  const [relate, setRelate] = useState('1');

  // tipe
  const [typeProduk, setTypeProduk] = useState(1);
  const [typeService, setTypeService] = useState(2);

  // form
  const [status, setStatus] = useState(2);
  const [product, setProduct] = useState('');
  const [image, setImage] = useState('');
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);

  // form error
  const [error, setError] = useState({
    product: '',
    image: ''
  });

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: 'px', width: 30, height: 20 });
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

  // read data mini
  useEffect(() => {
    readBannersMini('product', false).then(res => {
      setMiniProduk(res.data.data);
    });
    readBannersMini('service', false).then(res => {
      setMiniService(res.data.data);
    });
  }, []);

  // read data promo dan kategori
  useEffect(() => {
    readPromo(false, 999999).then(res => {
      const data = [];

      res.data.data.map(promo => {
        data.push({ value: promo.id, label: promo.title });
      });

      setDataPromo(data);
    });
  }, []);

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

  // create dan update data tipe produk
  const onSubmitProduk = async e => {
    e.preventDefault();

    // cek relate
    if (relate === '1') {
      // validasi
      if (!product || !image) {
        return setError({
          ...error,
          product: !product ? 'Field masih kosong' : '',
          image: !image ? 'Field masih kosong' : ''
        });
      }

      if (isEdit) {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeProduk);
        formdata.append('status', status);
        formdata.append('product', product);

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFP(false);

          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');

          // read kembali data baru
          readBannersMini('product', false).then(res => {
            setMiniProduk(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setOpenFP(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeProduk);
        formdata.append('status', status);
        formdata.append('product', product);
        formdata.append('image', image);

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFP(false);

          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');

          // read kembali data baru
          readBannersMini('product', false).then(res => {
            setMiniProduk(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenFP(false);

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
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeProduk);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo.value);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFP(false);

          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

          // read kembali data baru
          readBannersMini('product', false).then(res => {
            setMiniProduk(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setOpenFP(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeProduk);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo.value);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
        });

        formdata.append('image', image);

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFP(false);

          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

          // read kembali data baru
          readBannersMini('product', false).then(res => {
            setMiniProduk(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenFP(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
        }
      }
    }
  };

  // create dan update data tipe service
  const onSubmitService = async e => {
    e.preventDefault();

    // cek relate
    if (relate === '1') {
      // validasi
      if (!product || !image) {
        return setError({
          ...error,
          product: !product ? 'Field masih kosong' : '',
          image: !image ? 'Field masih kosong' : ''
        });
      }

      if (isEdit) {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeService);
        formdata.append('status', status);
        formdata.append('product', product);

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFS(false);

          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');

          // read kembali data baru
          readBannersMini('service', false).then(res => {
            setMiniService(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setOpenFS(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeService);
        formdata.append('status', status);
        formdata.append('product', product);
        formdata.append('image', image);

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFS(false);

          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');

          // read kembali data baru
          readBannersMini('service', false).then(res => {
            setMiniService(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenFS(false);

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
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeService);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo.value);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFS(false);

          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

          // read kembali data baru
          readBannersMini('service', false).then(res => {
            setMiniService(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setOpenFS(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeService);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo.value);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category.value);
        });

        formdata.append('image', image);

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenFS(false);

          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');

          // read kembali data baru
          readBannersMini('service', false).then(res => {
            setMiniService(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenFS(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
        }
      }
    }
  };

  // hapus data
  const onDelete = async () => {
    const result = await deleteMiniBanners(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpenHapus(false);

      // read kembali data baru
      if (type === 'Product') {
        readBannersMini('product', false).then(res => {
          setMiniProduk(res.data.data);
        });
      } else {
        readBannersMini('service', false).then(res => {
          setMiniService(res.data.data);
        });
      }

      enqueueSnackbar('Berhasil menghapus data', { variant: 'success' });
    } else {
      setOpenHapus(false);

      enqueueSnackbar('Gagal menghapus data', { variant: 'error' });
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
          <label className={classes.title}>mini produk aktif</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {miniProduk?.map(item =>
                item.status?.id === 1 ? (
                  item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeProduk(1);
                            setStatus(item.status?.id);
                            setProduct(item.detail);
                            setImage(item.image);
                            setOpenFP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
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
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeProduk(1);
                            setStatus(item.status?.id);
                            autoSelectPromos(item.detail?.promos);
                            autoSelectCategoriesProduk(item.detail?.categories);
                            setImage(item.image);
                            setOpenFP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                ) : null
              )}
            </div>
          </ScrollContainer>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini produk history</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {miniProduk?.map(item =>
                item.status?.id !== 1 ? (
                  item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeProduk(1);
                            setStatus(item.status?.id);
                            setProduct(item.detail);
                            setImage(item.image);
                            setOpenFP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
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
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeProduk(1);
                            setStatus(item.status?.id);
                            autoSelectPromos(item.detail?.promos);
                            autoSelectCategoriesProduk(item.detail?.categories);
                            setImage(item.image);
                            setOpenFP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                ) : null
              )}
            </div>
          </ScrollContainer>
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenFP(true)}>
            buat mini produk
          </Button>
        </div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini jasa aktif</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {miniService?.map(item =>
                item.status?.id === 1 ? (
                  item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeService(2);
                            setStatus(item.status?.id);
                            setProduct(item.detail);
                            setImage(item.image);
                            setOpenFS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
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
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeService(2);
                            setStatus(item.status?.id);
                            autoSelectPromos(item.detail?.promos);
                            autoSelectCategoriesJasa(item.detail?.categories);
                            setImage(item.image);
                            setOpenFS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                ) : null
              )}
            </div>
          </ScrollContainer>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini jasa history</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {miniService?.map(item =>
                item.status?.id !== 1 ? (
                  item.relatedTo === 'Product Detail' ? (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          setDetail(item);
                          setRelate(
                            item.relatedTo === 'Product Detail' ? '1' : '2'
                          );
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeService(2);
                            setStatus(item.status?.id);
                            setProduct(item.detail);
                            setImage(item.image);
                            setOpenFS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
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
                          setType(item.type);
                          setOpenDetail(true);
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="280px"
                          image={item.image}
                          title={item.headline}
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
                            setTypeService(2);
                            setStatus(item.status?.id);
                            autoSelectPromos(item.detail?.promos);
                            autoSelectCategoriesJasa(item.detail?.categories);
                            setImage(item.image);
                            setOpenFS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.type);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
                ) : null
              )}
            </div>
          </ScrollContainer>
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenFS(true)}>
            buat mini jasa
          </Button>
        </div>
      </div>

      <CompDialog
        open={openFP}
        close={() => {
          setIsEdit(false);
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');
          setPromos([]);
          setCategories([]);
          setError({
            ...error,
            product: '',
            image: ''
          });
          setURI();
          setOpenFP(false);
        }}
        title="Form Mini Produk">
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

              <div style={{ margin: '30px 0px' }}>
                <InputLabel
                  htmlFor="product"
                  error={error.product ? true : false}>
                  ID Produk
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
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    error={error.product ? true : false}
                  />
                  <FormHelperText
                    id="outlined-helper-text"
                    error={error.product ? true : false}>
                    {error.product}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 223 / 84 )</InputLabel>
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
            <div style={{ marginTop: 10 }}>
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

              <div style={{ marginTop: 30 }}>
                <InputLabel id="products">Promo (max 5)</InputLabel>
                <MultiSelect
                  name="promos"
                  onChange={setPromos}
                  options={dataPromo}
                  placeHolder="Silakan pilih promo"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div style={{ margin: '30px 0px' }}>
                <InputLabel id="products">Kategori (max 5)</InputLabel>
                <MultiSelect
                  name="categories"
                  onChange={setCategories}
                  options={kategoriProduk}
                  placeHolder="Silakan pilih kategori"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 223 / 84 )</InputLabel>
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
            onClick={onSubmitProduk}
            className={classes.submit}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <CompDialog
        open={openFS}
        close={() => {
          setIsEdit(false);
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');
          setPromos([]);
          setCategories([]);
          setError({
            ...error,
            product: '',
            image: ''
          });
          setURI();
          setOpenFS(false);
        }}
        title="Form Mini Jasa">
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

              <div style={{ margin: '30px 0px' }}>
                <InputLabel
                  htmlFor="product"
                  error={error.product ? true : false}>
                  ID Jasa
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
                    value={product}
                    onChange={e => setProduct(e.target.value)}
                    error={error.product ? true : false}
                  />
                  <FormHelperText
                    id="outlined-helper-text"
                    error={error.product ? true : false}>
                    {error.product}
                  </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 223 / 84 )</InputLabel>
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
            <div style={{ marginTop: 10 }}>
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

              <div style={{ marginTop: 30 }}>
                <InputLabel id="products">Promo (max 5)</InputLabel>
                <MultiSelect
                  name="promos"
                  onChange={setPromos}
                  options={dataPromo}
                  placeHolder="Silakan pilih promo"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div style={{ margin: '30px 0px' }}>
                <InputLabel id="products">Kategori (max 5)</InputLabel>
                <MultiSelect
                  name="categories"
                  onChange={setCategories}
                  options={kategoriJasa}
                  placeHolder="Silakan pilih kategori"
                  isMulti
                  autoFocus
                  isFocused
                />
              </div>

              <div className={classes.inputFile}>
                <InputLabel id="image">Gambar ( 223 / 84 )</InputLabel>
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
            onClick={onSubmitService}
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
            ID {type === 'Product' ? 'Produk' : 'Jasa'}
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
        title="Hapus Mini">
        Apakah yakin ingin hapus ?
      </ConfirmDialog>
    </div>
  );
}

TabMini.propTypes = {
  setDataBanners: propTypes.func,
  dataBanners: propTypes.object
};

const mapStateToProps = state => ({
  dataBanners: state.banner.banners
});

const mapDispatchToProps = dispatch => ({
  setDataBanners: value => dispatch(setBanners(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabMini);
