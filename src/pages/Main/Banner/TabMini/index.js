import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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

// useTheme
import { useTheme } from '@material-ui/core/styles';

// react icons
import {
  IoPencilOutline,
  IoTrashOutline,
  IoCloudDownloadOutline,
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

function TabMini() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const theme = useTheme();

  // data open
  const [openFP, setOpenFP] = useState(false);
  const [openFS, setOpenFS] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // data promos dan category
  const [dataPromo, setDataPromo] = useState([]);
  const [dataKategori, setDataKategori] = useState([]);

  // data mini dan detail
  const [miniProduk, setMiniProduk] = useState([]);
  const [miniService, setMiniService] = useState([]);
  const [detail, setDetail] = useState({});

  // tambah atau edit data
  const [isEdit, setIsEdit] = useState(false);

  // id item image
  const [id, setID] = useState('');

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
    readBannersMini('product', false)
      .then(res => {
        setMiniProduk(res.data.data);
      })
      .catch(err => err);
    readBannersMini('service', false)
      .then(res => {
        setMiniService(res.data.data);
      })
      .catch(err => err);
  }, []);

  // read data promo dan kategori
  useEffect(() => {
    readPromo('')
      .then(res => setDataPromo(res.data.data))
      .catch(err => err);
  }, []);

  useEffect(() => {
    getCategory('1')
      .then(res => setDataKategori(res.data.data))
      .catch(err => err);
    getCategory('2')
      .then(res => setDataKategori(res.data.data))
      .catch(err => err);
  }, []);

  // create dan update data tipe produk
  const onSubmitProduk = async e => {
    e.preventDefault();

    // cek relate
    if (relate === '1') {
      // validasi
      if (!product) {
        setError({ ...error, product: 'Field masih kosong' });
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
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFP(false);

          // read kembali data baru
          readBannersMini('product', false)
            .then(res => {
              setMiniProduk(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');
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

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFP(false);

          // read kembali data baru
          readBannersMini('product', false)
            .then(res => {
              setMiniProduk(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil membuat data baru', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFP(false);

          enqueueSnackbar('Gagal membuat data baru', { variant: 'error' });
        }
      }
    } else {
      if (isEdit) {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeProduk);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFP(false);

          // read kembali data baru
          readBannersMini('product', false)
            .then(res => {
              setMiniProduk(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
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
          formdata.append(`promos[${index}]`, promo);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFP(false);

          // read kembali data baru
          readBannersMini('product', false)
            .then(res => {
              setMiniProduk(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil membuat data baru', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeProduk(1);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFP(false);

          enqueueSnackbar('Gagal membuat data baru', { variant: 'error' });
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
      if (!product) {
        setError({ ...error, product: 'Field masih kosong' });
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
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFS(false);

          // read kembali data baru
          readBannersMini('service', false)
            .then(res => {
              setMiniService(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');
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

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFS(false);

          // read kembali data baru
          readBannersMini('service', false)
            .then(res => {
              setMiniService(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil membuat data baru', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setProduct('');
          setImage('');
          setOpenFS(false);

          enqueueSnackbar('Gagal membuat data baru', { variant: 'error' });
        }
      }
    } else {
      if (isEdit) {
        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('relate', relate);
        formdata.append('type_banner', typeService);
        formdata.append('status', status);

        promos.map((promo, index) => {
          formdata.append(`promos[${index}]`, promo);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFS(false);

          // read kembali data baru
          readBannersMini('service', false)
            .then(res => {
              setMiniService(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
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
          formdata.append(`promos[${index}]`, promo);
        });

        categories.map((category, index) => {
          formdata.append(`categories[${index}]`, category);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createMiniBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFS(false);

          // read kembali data baru
          readBannersMini('service', false)
            .then(res => {
              setMiniService(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil membuat data baru', {
            variant: 'success'
          });
        } else {
          setRelate('1');
          setTypeService(2);
          setStatus(2);
          setPromos([]);
          setCategories([]);
          setImage('');
          setOpenFS(false);

          enqueueSnackbar('Gagal membuat data baru', { variant: 'error' });
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
      readBannersMini('product', false)
        .then(res => {
          setMiniProduk(res.data.data);
        })
        .catch(err => err);

      readBannersMini('service', false)
        .then(res => {
          setMiniService(res.data.data);
        })
        .catch(err => err);

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
          setImage(file);
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
    <div className={classes.wrapper}>
      <div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini produk aktif</label>
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini produk history</label>
          <br />
          <br />
          {miniProduk && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsiveHistory}>
              {miniProduk.map(item =>
                item.relatedTo === 'Product Detail' ? (
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
                          setStatus(2);
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
                          setStatus(2);
                          setPromos(item.detail?.promos);
                          setCategories(item.detail?.categories);
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
                          setOpenHapus(true);
                        }}>
                        <IoTrashOutline />
                      </IconButton>
                    </CardActions>
                  </Card>
                )
              )}
            </Carousel>
          )}
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
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini jasa history</label>
          <br />
          <br />
          {miniService && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsiveHistory}>
              {miniService.map(item =>
                item.relatedTo === 'Product Detail' ? (
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
                          setStatus(2);
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
                          setStatus(2);
                          setPromos(item.detail?.promos);
                          setCategories(item.detail?.categories);
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
                          setOpenHapus(true);
                        }}>
                        <IoTrashOutline />
                      </IconButton>
                    </CardActions>
                  </Card>
                )
              )}
            </Carousel>
          )}
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
          setOpenFP(false);
        }}
        title="Form Mini Produk">
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
                error={error.product ? true : false}
                className={classes.label}>
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

              <div className={classes.inputFile}>
                <Avatar
                  alt="photo"
                  src={image.name ? URL.createObjectURL(image) : image}
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload" className={classes.itemUpload}>
                  <IoCloudDownloadOutline />
                  Upload
                </label>
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
                    {dataPromo.map(item => {
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
                              checked={promos.indexOf(item.id) !== -1}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </Select>
              </FormControl>

              <InputLabel id="products" style={{ marginBottom: 15 }}>
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
                    {dataKategori.map(item => {
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
                              checked={categories.indexOf(item.id) !== -1}
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
                <Avatar
                  alt="photo"
                  src={image.name ? URL.createObjectURL(image) : image}
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload" className={classes.itemUpload}>
                  <IoCloudDownloadOutline />
                  Upload
                </label>
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
          setOpenFS(false);
        }}
        title="Form Mini Jasa">
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
                error={error.product ? true : false}
                className={classes.label}>
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

              <div className={classes.inputFile}>
                <Avatar
                  alt="photo"
                  src={image.name ? URL.createObjectURL(image) : image}
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload" className={classes.itemUpload}>
                  <IoCloudDownloadOutline />
                  Upload
                </label>
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
                    {dataPromo.map(item => {
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
                              checked={promos.indexOf(item.id) !== -1}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </Select>
              </FormControl>

              <InputLabel id="products" style={{ marginBottom: 15 }}>
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
                    {dataKategori.map(item => {
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
                              checked={categories.indexOf(item.id) !== -1}
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
                <Avatar
                  alt="photo"
                  src={image.name ? URL.createObjectURL(image) : image}
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImage}
                  style={{ display: 'none' }}
                />
                <label htmlFor="upload" className={classes.itemUpload}>
                  <IoCloudDownloadOutline />
                  Upload
                </label>
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
            onClick={onSubmitService}
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
            style={{ width: '100%', height: 250 }}
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
            ID Produk
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
            style={{ width: '100%', height: 250 }}
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
