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
  InputAdornment
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
  readBannersMain,
  createMainBanners,
  updateMainBanners,
  deleteMainBanners
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

// tanda kalau di pilih
function getStyles(name, promos, theme) {
  return {
    fontWeight:
      promos.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function TabMain({ setDataBanners, dataBanners }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const [open, setOpen] = useState({
    detail: false,
    form: false,
    hapus: false
  });

  // data mains dan detail
  const [mains, setMains] = useState([]);
  const [dataDetail, setDataDetail] = useState({});

  // tambah atau edit data
  const [isEdit, setIsEdit] = useState(false);

  // id item image
  const [id, setID] = useState('');

  // 1. Detail Produk atau 2. List Produk
  const [relate, setRelate] = useState('1');

  // form data tipe detail produk
  const [formDetailProduk, setFormDetailProduk] = useState({
    status: 1,
    product: '',
    image: ''
  });

  // form data tipe list produk
  const [formListProduk, setFormListProduk] = useState({
    type: '1',
    status: 1,
    promos: [],
    categories: [],
    image: ''
  });

  // error data
  const [errorDetailProduk, setErrorDetailProduk] = useState({
    status: '',
    product: '',
    image: ''
  });

  // error data
  const [errorListProduk, setErrorListProduk] = useState({
    type: '',
    status: '',
    image: ''
  });

  // change tipe detail produk
  const onChangeDetailProduk = e => {
    setFormDetailProduk({
      ...formDetailProduk,
      [e.target.name]: e.target.value
    });

    setErrorDetailProduk({
      ...errorDetailProduk,
      [e.target.name]: ''
    });
  };

  // change tipe list produk
  const onChangeListProduk = e => {
    setFormListProduk({
      ...formListProduk,
      [e.target.name]: e.target.value
    });

    setErrorListProduk({
      ...errorListProduk,
      [e.target.name]: ''
    });
  };

  // validasi tipe detail produk
  const validateDetailProduk = () => {
    const newError = { ...errorDetailProduk };

    if (!formDetailProduk.product) {
      newError.product = 'Field kosong';
    }

    if (!formDetailProduk.status) {
      newError.status = 'Field kosong';
    }

    return newError;
  };

  // validasi tipe list produk
  const validateListProduk = () => {
    const newError = { ...errorListProduk };

    if (!formListProduk.type) {
      newError.type = 'Field kosong';
    }

    if (!formListProduk.status) {
      newError.status = 'Field kosong';
    }

    return newError;
  };

  // read data banner
  useEffect(() => {
    readBannersMain()
      .then(res => {
        setMains(res.data.data);
      })
      .catch(err => err);
  }, []);

  // tambah data
  const onCreate = async e => {
    e.preventDefault();

    // cek relate ke 1 atau 2
    if (relate === '1') {
      const findErrors = validateDetailProduk();

      if (Object.values(findErrors).some(err => err !== '')) {
        setErrorDetailProduk(findErrors);
      } else {
        if (isEdit) {
          // state untuk tipe detail produk
          const { product, status, image } = formDetailProduk;

          // form-data untuk detail produk yang kosong
          const formDataForDetailProduk = new FormData();

          // mengisi form-data menggunakan append
          formDataForDetailProduk.append('relate', parseInt(relate));
          formDataForDetailProduk.append('status', status);
          formDataForDetailProduk.append('product', product);

          // cek gambar baru atau tetap yang lama
          if (image.name) {
            formDataForDetailProduk.append('image', image);
          }

          // services
          const result = await updateMainBanners(
            id,
            formDataForDetailProduk
          ).catch(err => err);

          // cek sukses atau gagal
          if (result.success) {
            setFormDetailProduk({
              status: 1,
              product: '',
              image: ''
            });
            setOpen({ ...open, form: false });

            // read kembali data baru
            readBannersMain()
              .then(res => {
                setMains(res.data.data);
              })
              .catch(err => err);
            enqueueSnackbar('Berhasil memperbarui data', {
              variant: 'success'
            });
          } else {
            setFormDetailProduk({
              status: 1,
              product: '',
              image: ''
            });
            setOpen({ ...open, form: false });
            enqueueSnackbar('Gagal memperbarui data', {
              variant: 'success'
            });
          }
        } else {
          // state untuk tipe detail produk
          const { product, status, image } = formDetailProduk;

          // form-data untuk detail produk yang kosong
          const formDataForDetailProduk = new FormData();

          // mengisi form-data menggunakan append
          formDataForDetailProduk.append('relate', parseInt(relate));
          formDataForDetailProduk.append('status', status);
          formDataForDetailProduk.append('product', product);

          // cek gambar baru atau tetap yang lama
          if (image.name) {
            formDataForDetailProduk.append('image', image);
          }

          // services
          const result = await createMainBanners(formDataForDetailProduk).catch(
            err => err
          );

          // cek sukses atau gagal
          if (result.success) {
            setFormDetailProduk({
              status: 1,
              product: '',
              image: ''
            });
            setOpen({ ...open, form: false });

            // read kembali data baru
            readBannersMain()
              .then(res => {
                setMains(res.data.data);
              })
              .catch(err => err);

            enqueueSnackbar('Berhasil membuat data baru', {
              variant: 'success'
            });
          } else {
            setFormDetailProduk({
              status: 1,
              product: '',
              image: ''
            });
            setOpen({ ...open, form: false });
            enqueueSnackbar('Gagal membuat data baru', {
              variant: 'success'
            });
          }
        }
      }
    } else {
      const findErrors = validateListProduk();

      if (Object.values(findErrors).some(err => err !== '')) {
        setErrorListProduk(findErrors);
      } else {
        if (isEdit) {
          // state untuk tipe list produk
          const { type, status, promos, categories, image } = formListProduk;

          // form-data untuk list produk yang kosong
          const formDataForListProduk = new FormData();

          // mengisi form-data menggunakan append
          formDataForListProduk.append('relate', parseInt(relate));
          formDataForListProduk.append('type', parseInt(type));
          formDataForListProduk.append('status', status);
          formDataForListProduk.append('promos', promos);
          formDataForListProduk.append('categories', categories);

          // cek gambar baru atau tetap yang lama
          if (image.name) {
            formDataForListProduk.append('image', image);
          }

          // services
          const result = await updateMainBanners(
            id,
            formDataForListProduk
          ).catch(err => err);

          // cek sukses atau gagal
          if (result.success) {
            setFormListProduk({
              type: '1',
              status: 1,
              promos: [],
              categories: [],
              image: ''
            });
            setOpen({ ...open, form: false });

            // read kembali data baru
            readBannersMain()
              .then(res => {
                setMains(res.data.data);
              })
              .catch(err => err);

            enqueueSnackbar('Berhasil memperbarui data', {
              variant: 'success'
            });
          } else {
            setFormListProduk({
              type: '1',
              status: 1,
              promos: [],
              categories: [],
              image: ''
            });
            setOpen({ ...open, form: false });
            enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
          }
        } else {
          // state untuk tipe list produk
          const { type, status, promos, categories, image } = formListProduk;

          // form-data untuk list produk yang kosong
          const formDataForListProduk = new FormData();

          // mengisi form-data menggunakan append
          formDataForListProduk.append('relate', parseInt(relate));
          formDataForListProduk.append('type', parseInt(type));
          formDataForListProduk.append('status', status);
          formDataForListProduk.append('promos', promos);
          formDataForListProduk.append('categories', categories);

          // cek gambar baru atau tetap yang lama
          if (image.name) {
            formDataForListProduk.append('image', image);
          }

          // services
          const result = await createMainBanners(formDataForListProduk).catch(
            err => err
          );

          // cek sukses atau gagal
          if (result.success) {
            setFormListProduk({
              type: '1',
              status: 1,
              promos: [],
              categories: [],
              image: ''
            });
            setOpen({ ...open, form: false });

            // read kembali data baru
            readBannersMain()
              .then(res => {
                setMains(res.data.data);
              })
              .catch(err => err);

            enqueueSnackbar('Berhasil membuat data baru', {
              variant: 'success'
            });
          } else {
            setFormListProduk({
              type: '1',
              status: 1,
              promos: [],
              categories: [],
              image: ''
            });
            setOpen({ ...open, form: false });
            enqueueSnackbar('Gagal membuat data baru', {
              variant: 'success'
            });
          }
        }
      }
    }
  };

  // hapus data
  const onDelete = async () => {
    const result = await deleteMainBanners(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpen({ ...open, hapus: false });

      // read kembali data baru
      readBannersMain()
        .then(res => {
          setMains(res.data.data);
        })
        .catch(err => err);

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    } else {
      setOpen({ ...open, hapus: false });

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    }
  };

  // upload image form tipe detail produk
  const onSelectedImgForDetailProduk = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setErrorDetailProduk({
        ...errorDetailProduk,
        image: `Tipe file tidak didukung: ${file.type}`
      });
    } else if (file.size >= 512000) {
      setErrorDetailProduk({
        ...errorDetailProduk,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setErrorDetailProduk({
          ...errorDetailProduk,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setErrorDetailProduk({
          ...errorDetailProduk,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setErrorDetailProduk({
          ...errorDetailProduk,
          image: ''
        });

        try {
          setFormDetailProduk({
            ...formDetailProduk,
            image: file
          });
        } catch (e) {
          setErrorDetailProduk({
            ...errorDetailProduk,
            image: e.message
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // upload image form tipe list produk
  const onSelectedImgForListProduk = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setErrorListProduk({
        ...errorListProduk,
        image: `Tipe file tidak didukung: ${file.type}`
      });
    } else if (file.size >= 512000) {
      setErrorListProduk({
        ...errorListProduk,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setErrorListProduk({
          ...errorListProduk,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setErrorListProduk({
          ...errorListProduk,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setErrorListProduk({
          ...errorListProduk,
          image: ''
        });

        try {
          setFormListProduk({
            ...formListProduk,
            image: file
          });
        } catch (e) {
          setErrorListProduk({
            ...errorListProduk,
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
          <label className={classes.title}>main banner aktif</label>
          <br />
          <br />
          <Carousel
            ssr
            partialVisible
            itemClass={classes.card}
            responsive={responsive}>
            {mains?.map(item =>
              item.relatedTo === 'Product Detail' ? (
                <Card key={item.id}>
                  <CardActionArea
                    onClick={() => {
                      setDataDetail(item);
                      setRelate(
                        item.relatedTo === 'Product Detail' ? '1' : '2'
                      );
                      setOpen({ ...open, detail: true });
                    }}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="230"
                      image={item.image}
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID(item.id);
                        setIsEdit(true);
                        setRelate(
                          item.relatedTo === 'Product Detail' ? '1' : '2'
                        );
                        setFormDetailProduk({
                          ...formDetailProduk,
                          status: item.status?.id,
                          product: item.detail,
                          image: item.image
                        });
                        setOpen({ ...open, form: true });
                      }}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID(item.id);
                        setOpen({ ...open, hapus: true });
                      }}>
                      <IoTrashOutline />
                    </IconButton>
                  </CardActions>
                </Card>
              ) : (
                <Card key={item.id}>
                  <CardActionArea
                    onClick={() => {
                      setDataDetail(item);
                      setRelate(
                        item.relatedTo === 'Product Detail' ? '1' : '2'
                      );
                      setOpen({ ...open, detail: true });
                    }}>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="230"
                      image={item.image}
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID(item.id);
                        setIsEdit(true);
                        setRelate(
                          item.relatedTo === 'Product Detail' ? '1' : '2'
                        );
                        setFormListProduk({
                          ...formListProduk,
                          type: item.detail?.type === 'Product' ? '1' : '2',
                          status: item.status?.id,
                          promos: item.detail?.promos,
                          categories: item.detail?.categories,
                          image: item.image
                        });
                        setOpen({ ...open, form: true });
                      }}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID(item.id);
                        setOpen({ ...open, hapus: true });
                      }}>
                      <IoTrashOutline />
                    </IconButton>
                  </CardActions>
                </Card>
              )
            )}
          </Carousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main banner history</label>
          <br />
          <br />
          {/* <Carousel
            itemClass={classes.card}
            responsive={responsiveHistory}></Carousel> */}
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, form: true })}>
            buat banner
          </Button>
        </div>
      </div>

      <CompDialog
        open={open.form}
        close={() => {
          setIsEdit(false);
          setFormDetailProduk({
            status: 1,
            product: '',
            image: ''
          });
          setFormListProduk({
            type: '1',
            status: 1,
            promos: [],
            categories: [],
            image: ''
          });
          setOpen({ ...open, form: false });
        }}
        title="Form Banner">
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
                  value={formDetailProduk.status}
                  onChange={onChangeDetailProduk}
                  label="Status">
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={2}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>

              <InputLabel
                htmlFor="product"
                error={errorDetailProduk.product ? true : false}
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
                  onChange={onChangeDetailProduk}
                  value={formDetailProduk.product}
                  error={errorDetailProduk.product ? true : false}
                />
                <FormHelperText
                  id="outlined-helper-text"
                  error={errorDetailProduk.product ? true : false}>
                  {errorDetailProduk.product}
                </FormHelperText>
              </FormControl>

              <div className={classes.inputFile}>
                <Avatar
                  alt="photo"
                  src={
                    formDetailProduk.image.name
                      ? URL.createObjectURL(formDetailProduk.image)
                      : formDetailProduk.image
                  }
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImgForDetailProduk}
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
                error={errorDetailProduk.image ? true : false}>
                {errorDetailProduk.image}
              </FormHelperText>
            </div>
          ) : (
            <div style={{ marginTop: 10 }}>
              <FormControl component="fieldset" style={{ marginBottom: 15 }}>
                <FormLabel component="legend">Tipe</FormLabel>
                <RadioGroup
                  row
                  aria-label="type"
                  name="type"
                  value={formListProduk.type}
                  onChange={onChangeListProduk}>
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
                  value={formListProduk.status}
                  onChange={onChangeListProduk}
                  label="Status">
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={2}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <InputLabel id="promos">Promo</InputLabel>
                <Select
                  labelId="promos"
                  id="promos"
                  name="promos"
                  multiple
                  value={formListProduk.promos}
                  onChange={onChangeListProduk}
                  input={<Input />}
                  label="Promo"
                  MenuProps={MenuProps}>
                  {names?.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, formListProduk.promos, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <InputLabel id="categories">Kategori</InputLabel>
                <Select
                  labelId="categories"
                  id="categories"
                  name="categories"
                  multiple
                  value={formListProduk.categories}
                  onChange={onChangeListProduk}
                  input={<Input />}
                  label="Kategori"
                  MenuProps={MenuProps}>
                  {names?.map(name => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, formListProduk.categories, theme)}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <div className={classes.inputFile}>
                <Avatar
                  alt="photo"
                  src={
                    formListProduk.image.name
                      ? URL.createObjectURL(formListProduk.image)
                      : formListProduk.image
                  }
                  variant="rounded"
                  className={classes.preview}
                />
                <input
                  type="file"
                  id="upload"
                  accept="image/jpeg,image/png"
                  onChange={onSelectedImgForListProduk}
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
                error={errorListProduk.image ? true : false}>
                {errorListProduk.image}
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
        <CompDialog
          open={open.detail}
          close={() => setOpen({ ...open, detail: false })}>
          <Avatar
            alt="photo"
            src={dataDetail.image}
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
            <OutlinedInput value={dataDetail.relatedTo} disabled />
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
              value={dataDetail.detail}
              disabled
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(dataDetail.detail);
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
        <CompDialog
          open={open.detail}
          close={() => setOpen({ ...open, detail: false })}>
          <Avatar
            alt="photo"
            src={dataDetail.image}
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
            <OutlinedInput value={dataDetail.relatedTo} disabled />
          </FormControl>
        </CompDialog>
      )}

      <ConfirmDialog
        open={open.hapus}
        close={() => setOpen({ ...open, hapus: false })}
        submit={onDelete}
        title="Hapus Banner">
        Apakah yakin ingin hapus ?
      </ConfirmDialog>
    </div>
  );
}

TabMain.propTypes = {
  setDataBanners: propTypes.func,
  dataBanners: propTypes.object
};

const mapStateToProps = state => ({
  dataBanners: state.banner.banners
});

const mapDispatchToProps = dispatch => ({
  setDataBanners: value => dispatch(setBanners(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabMain);
