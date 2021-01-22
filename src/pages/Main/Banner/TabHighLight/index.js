import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// notistack
import { useSnackbar } from 'notistack';

// responsive carousel
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 0
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: -15
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
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  MenuItem,
  FormHelperText,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

// useTheme
import { useTheme } from '@material-ui/core/styles';

// react icons
import {
  IoPencilOutline,
  IoTrashOutline,
  IoCloudDownloadOutline
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog } from 'components';

// redux
import { connect } from 'react-redux';
import { setBanners } from 'modules';

// services
import {
  readBannersHighlight,
  readDetailBannersHighlight,
  createHighLightBanners,
  updateHighLightBanners,
  deleteHighLightBanners,
  getStores,
  getStore
} from 'services';

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

// utils
import { dateConverterRes } from 'utils';

function TabHighLight() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  // open dialog form dan confirm
  const [openHPD, setOpenHPD] = useState(false);
  const [openHP, setOpenHP] = useState(false);
  const [openHSD, setOpenHSD] = useState(false);
  const [openHS, setOpenHS] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // data toko dan produknya
  const [stores, setStores] = useState([]);
  const [namaStore, setNamaStore] = useState('');
  const [produkToko, setProdukToko] = useState([]);
  const [serviceToko, setServiceToko] = useState([]);

  // data id highlight
  const [id, setID] = useState('');

  // cek update atau create
  const [isEdit, setIsEdit] = useState(false);

  // data highlight type produk
  const [highlightProduks, setHighlightProduks] = useState([]);

  // data highlight type service
  const [highlightServices, setHighlightServices] = useState([]);

  // data detail highlight berdasarkan tipe
  const [detailHP, setDetailHP] = useState({});
  const [detailHS, setDetailHS] = useState({});

  // form untuk tipe produk
  const [formProduk, setFormProduk] = useState({
    type: 1,
    headline: '',
    status: 2,
    products: [],
    image: ''
  });

  // form untuk tipe services
  const [formServices, setFormServices] = useState({
    type: 2,
    headline: '',
    status: 2,
    services: [],
    image: ''
  });

  // error form untuk tipe produk
  const [errorProduk, setErrorProduk] = useState({
    headline: '',
    status: '',
    image: ''
  });

  // error form untuk tipe services
  const [errorServices, setErrorServices] = useState({
    headline: '',
    status: '',
    image: ''
  });

  // checkbox tipe produk
  const onCheckboxProduk = value => () => {
    const currentIndex = formProduk.products.indexOf(value);
    const newChecked = [...formProduk.products];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFormProduk({ ...formProduk, products: newChecked });
  };

  // checkbox tipe service
  const onCheckboxService = value => () => {
    const currentIndex = formServices.services.indexOf(value);
    const newChecked = [...formServices.services];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setFormServices({ ...formServices, services: newChecked });
  };

  // change untuk tipe produk
  const onChangeProduk = e => {
    setFormProduk({
      ...formProduk,
      [e.target.name]: e.target.value
    });

    setErrorProduk({
      ...errorProduk,
      [e.target.name]: ''
    });
  };

  // change untuk tipe services
  const onChangeServices = e => {
    setFormServices({
      ...formServices,
      [e.target.name]: e.target.value
    });

    setErrorServices({
      ...errorServices,
      [e.target.name]: ''
    });
  };

  // validasi form
  const validateProduk = () => {
    const newError = { ...errorProduk };

    if (!formProduk.headline) {
      newError.headline = 'Field masih kosong';
    }

    return newError;
  };

  // validasi form
  const validateServices = () => {
    const newError = { ...errorServices };

    if (!formServices.headline) {
      newError.headline = 'Field masih kosong';
    }

    return newError;
  };

  // read data banner type product dan service
  useEffect(() => {
    readBannersHighlight('product')
      .then(res => {
        setHighlightProduks(res.data.data);
      })
      .catch(err => err);
  }, []);

  useEffect(() => {
    readBannersHighlight('service')
      .then(res => {
        setHighlightServices(res.data.data);
      })
      .catch(err => err);
  }, []);

  // read data toko
  useEffect(() => {
    getStores('', '')
      .then(res => {
        setStores(res.data.data);
      })
      .catch(err => err);
  }, []);

  // create dan update data tipe produk
  const onSubmitProduk = async e => {
    e.preventDefault();

    const findErrors = validateProduk();

    if (Object.values(findErrors).some(err => err !== '')) {
      setErrorProduk(findErrors);
    } else {
      if (isEdit) {
        // state form produk
        const { type, headline, status, products, image } = formProduk;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', type);
        formdata.append('status', status);
        formdata.append('headline', headline);

        products.map((product, index) => {
          formdata.append(`products[${index}]`, product);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateHighLightBanners(id, formdata).catch(
          err => err
        );

        // cek sukses atau tidak
        if (result.success) {
          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });
          setOpenHP(false);

          // read kembali data baru
          readBannersHighlight('product')
            .then(res => {
              setHighlightProduks(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });
          setOpenHP(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // state form produk
        const { type, headline, status, products, image } = formProduk;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', type);
        formdata.append('status', status);
        formdata.append('headline', headline);

        products.map((product, index) => {
          formdata.append(`products[${index}]`, product);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createHighLightBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });
          setOpenHP(false);

          // read kembali data baru
          readBannersHighlight('product')
            .then(res => {
              setHighlightProduks(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil menambah data baru', {
            variant: 'success'
          });
        } else {
          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });
          setOpenHP(false);

          enqueueSnackbar('Gagal menambah data baru', { variant: 'error' });
        }
      }
    }
  };

  // create dan update data tipe services
  const onSubmitServices = async e => {
    e.preventDefault();

    const findErrors = validateServices();

    if (Object.values(findErrors).some(err => err !== '')) {
      setErrorServices(findErrors);
    } else {
      if (isEdit) {
        // state form services
        const { type, headline, status, services, image } = formServices;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', type);
        formdata.append('headline', headline);
        formdata.append('status', status);

        // ambil data per index
        services.map((service, index) => {
          formdata.append(`services[${index}]`, service);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateHighLightBanners(id, formdata).catch(
          err => err
        );

        // cek sukses atau tidak
        if (result.success) {
          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });
          setOpenHS(false);

          // read kembali data baru
          readBannersHighlight('service')
            .then(res => {
              setHighlightServices(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
        } else {
          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });

          setOpenHS(false);

          enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
        }
      } else {
        // state form services
        const { type, headline, status, services, image } = formServices;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', type);
        formdata.append('headline', headline);
        formdata.append('status', status);

        // ambil data per index
        services.map((service, index) => {
          formdata.append(`services[${index}]`, service);
        });

        // cek apakah image baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await createHighLightBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });
          setOpenHS(false);

          // read kembali data baru
          readBannersHighlight('service')
            .then(res => {
              setHighlightServices(res.data.data);
            })
            .catch(err => err);

          enqueueSnackbar('Berhasil menambah data baru', {
            variant: 'success'
          });
        } else {
          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });

          setOpenHS(false);

          enqueueSnackbar('Gagal menambah data baru', { variant: 'error' });
        }
      }
    }
  };

  // hapus data
  const onDelete = async () => {
    // services
    const result = await deleteHighLightBanners(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpenHapus(false);

      // read kembali data baru
      readBannersHighlight('product')
        .then(res => {
          setHighlightProduks(res.data.data);
        })
        .catch(err => err);

      readBannersHighlight('service')
        .then(res => {
          setHighlightServices(res.data.data);
        })
        .catch(err => err);

      enqueueSnackbar('Berhasil menghapus data', { variant: 'success' });
    } else {
      setOpenHapus(false);

      enqueueSnackbar('Gagal menghapus data', { variant: 'error' });
    }
  };

  // upload image produk
  const onSelectedForProduk = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file?.type)) {
      setErrorProduk({
        ...errorProduk,
        image: `Tipe file tidak didukung: ${file?.type}`
      });
    } else if (file?.size >= 512000) {
      setErrorProduk({
        ...errorProduk,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setErrorProduk({
          ...errorProduk,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setErrorProduk({
          ...errorProduk,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setErrorProduk({
          ...errorProduk,
          image: ''
        });

        try {
          setFormProduk({
            ...formProduk,
            image: file
          });
        } catch (e) {
          setErrorProduk({
            ...errorProduk,
            image: e.message
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // upload image produk
  const onSelectedForServices = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file?.type)) {
      setErrorServices({
        ...errorServices,
        image: `Tipe file tidak didukung: ${file?.type}`
      });
    } else if (file?.size >= 512000) {
      setErrorServices({
        ...errorServices,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setErrorServices({
          ...errorServices,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setErrorServices({
          ...errorServices,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setErrorServices({
          ...errorServices,
          image: ''
        });

        try {
          setFormServices({
            ...formServices,
            image: file
          });
        } catch (e) {
          setErrorServices({
            ...errorServices,
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
          <label className={classes.title}>highlight produk aktif</label>
          <br />
          <br />
          {highlightProduks && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsive}>
              {highlightProduks.map(
                item =>
                  item.bannerStatus?.id === 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id)
                            .then(res => {
                              setDetailHP(res.data.data);
                            })
                            .catch(err => err);
                          setOpenHPD(true);
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
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setFormProduk({
                              ...formProduk,
                              type: item.bannerType?.id,
                              headline: item.headline,
                              status: item.bannerStatus?.id,
                              image: item.image
                            });
                            setOpenHP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
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
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk history</label>
          <br />
          <br />
          {highlightProduks && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsiveHistory}>
              {highlightProduks.map(
                item =>
                  item.bannerStatus?.id !== 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id)
                            .then(res => {
                              setDetailHP(res.data.data);
                            })
                            .catch(err => err);
                          setOpenHPD(true);
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
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setFormProduk({
                              ...formProduk,
                              type: item.bannerType?.id,
                              headline: item.headline,
                              status: item.bannerStatus?.id,
                              image: item.image
                            });
                            setOpenHP(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
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
            onClick={() => setOpenHP(true)}>
            buat highlight produk
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa aktif</label>
          <br />
          <br />
          {highlightServices && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsive}>
              {highlightServices.map(
                item =>
                  item.bannerStatus?.id === 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id)
                            .then(res => {
                              setDetailHS(res.data.data);
                            })
                            .catch(err => err);
                          setOpenHSD(true);
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
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setFormServices({
                              ...formServices,
                              type: item.bannerType?.id,
                              headline: item.headline,
                              status: item.bannerStatus?.id,
                              image: item.image
                            });
                            setOpenHS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
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
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa history</label>
          <br />
          <br />
          {highlightServices && (
            <Carousel
              ssr
              partialVisbile
              itemClass={classes.card}
              responsive={responsive}>
              {highlightServices.map(
                item =>
                  item.bannerStatus?.id !== 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id)
                            .then(res => {
                              setDetailHS(res.data.data);
                            })
                            .catch(err => err);
                          setOpenHSD(true);
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
                          onClick={() => {
                            setID(item.id);
                            setIsEdit(true);
                            setFormServices({
                              ...formServices,
                              type: item.bannerType?.id,
                              headline: item.headline,
                              status: item.bannerStatus?.id,
                              image: item.image
                            });
                            setOpenHS(true);
                          }}>
                          <IoPencilOutline />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="primary"
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
            onClick={() => setOpenHS(true)}>
            buat highlight jasa
          </Button>
        </div>
      </div>

      <CompDialog
        open={openHPD}
        close={() => {
          setDetailHP({});
          setOpenHPD(false);
        }}
        title="Detail Highlight">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Avatar
            alt="photo"
            src={detailHP.detail?.image}
            variant="rounded"
            className={classes.preview}
          />
          <br />
          <div>
            <InputLabel htmlFor="headline" className={classes.label}>
              Headline
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={detailHP.detail?.headline}
                disabled={true}
              />
            </FormControl>

            <InputLabel htmlFor="produk" className={classes.label}>
              Jumlah Produk
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={detailHP.detail?.totalProduct}
                disabled={true}
              />
            </FormControl>

            <InputLabel htmlFor="createAt">Tanggal dibuat</InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={
                  detailHP.detail
                    ? dateConverterRes(detailHP.detail?.createdAt)
                    : null
                }
                disabled={true}
              />
            </FormControl>
          </div>
        </div>
        <div style={{ overflow: 'auto', maxHeight: 500 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Produk</TableCell>
                  <TableCell align="right">Penjual</TableCell>
                  <TableCell align="right">Harga</TableCell>
                  <TableCell align="right">Kategori</TableCell>
                  <TableCell align="right">Tipe</TableCell>
                  <TableCell align="right">Berat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailHP.highlights?.data?.map(produk => (
                  <TableRow key={produk.id}>
                    <TableCell
                      align="center"
                      width={150}
                      height={50}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 9,
                        gridGap: 5
                      }}>
                      <Avatar
                        variant="rounded"
                        sizes="small"
                        alt={produk.name}
                        src={`${produk.imagePath}${produk.images?.[0]}`}
                      />
                      <span>{produk.name}</span>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      {produk.seller}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      {produk.price}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        display: 'flex',
                        fontSize: 9,
                        textTransform: 'capitalize',
                        color: theme.palette.primary.main
                      }}>
                      {produk.categories?.map((kategori, index) => (
                        <span key={index}>{kategori.name}</span>
                      ))}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      Produk
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>{`${produk.heavy?.total} ${produk.heavy?.type}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CompDialog>

      <CompDialog
        open={openHSD}
        close={() => {
          setDetailHS({});
          setOpenHSD(false);
        }}
        title="Detail Highlight">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Avatar
            alt="photo"
            src={detailHS.detail?.image}
            variant="rounded"
            className={classes.preview}
          />
          <br />
          <div>
            <InputLabel htmlFor="headline" className={classes.label}>
              Headline
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={detailHS.detail?.headline}
                disabled={true}
              />
            </FormControl>

            <InputLabel htmlFor="produk" className={classes.label}>
              Jumlah Jasa
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={detailHS.detail?.totalProduct}
                disabled={true}
              />
            </FormControl>

            <InputLabel htmlFor="createAt">Tanggal dibuat</InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                color="primary"
                value={
                  detailHS.detail
                    ? dateConverterRes(detailHS.detail?.createdAt)
                    : null
                }
                disabled={true}
              />
            </FormControl>
          </div>
        </div>
        <div style={{ overflow: 'auto', maxHeight: 500 }}>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Produk</TableCell>
                  <TableCell align="right">Penjual</TableCell>
                  <TableCell align="right">Harga</TableCell>
                  <TableCell align="right">Kategori</TableCell>
                  <TableCell align="right">Tipe</TableCell>
                  <TableCell align="right">Berat</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {detailHS.highlights?.data?.map(produk => (
                  <TableRow key={produk.id}>
                    <TableCell
                      align="center"
                      width={150}
                      height={50}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 9,
                        gridGap: 5
                      }}>
                      <Avatar
                        variant="rounded"
                        sizes="small"
                        alt={produk.name}
                        src={`${produk.imagePath}${produk.images?.[0]}`}
                      />
                      <span>{produk.name}</span>
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      {produk.seller}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      {produk.price}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        display: 'flex',
                        fontSize: 9,
                        textTransform: 'capitalize',
                        color: theme.palette.primary.main
                      }}>
                      {produk.categories?.map((kategori, index) => (
                        <span key={index}>{kategori.name}</span>
                      ))}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>
                      Jasa
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 9
                      }}>{`${produk.heavy?.total} ${produk.heavy?.type}`}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CompDialog>

      <CompDialog
        open={openHP}
        close={() => {
          setIsEdit(false);
          setFormProduk({
            ...formProduk,
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });
          setOpenHP(false);
        }}
        title="Form Highlight Produk">
        <div className={classes.form}>
          <InputLabel
            htmlFor="headline"
            error={errorProduk.headline ? true : false}
            className={classes.label}>
            Headline
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="headline"
              id="headline"
              color="primary"
              onChange={onChangeProduk}
              value={formProduk.headline}
              error={errorProduk.headline ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={errorProduk.headline ? true : false}>
              {errorProduk.headline}
            </FormHelperText>
          </FormControl>

          {isEdit && (
            <div>
              <InputLabel id="status" style={{ marginBottom: 15 }}>
                Status
              </InputLabel>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <Select
                  labelId="status"
                  id="status"
                  name="status"
                  value={formProduk.status}
                  onChange={onChangeProduk}>
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={2}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          <div className={classes.inputFile}>
            <InputLabel id="image" style={{ marginBottom: 15 }}>
              Gambar (max 500KB)
            </InputLabel>
            <Avatar
              alt="photo"
              src={
                formProduk.image.name
                  ? URL.createObjectURL(formProduk.image)
                  : formProduk.image
              }
              variant="rounded"
              className={classes.preview}
            />
            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={onSelectedForProduk}
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
            error={errorProduk.image ? true : false}>
            {errorProduk.image}
          </FormHelperText>

          <InputLabel id="namaStore" style={{ marginBottom: 15 }}>
            Pilih Toko
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: 15 }}>
            <Select
              labelId="namaStore"
              id="namaStore"
              name="namaStore"
              value={namaStore}
              onChange={e => setNamaStore(e.target.value)}>
              <TextField
                id="search"
                name="search"
                value={stores}
                onChange={e =>
                  getStores('', e.target.value)
                    .then(res => {
                      setStores(res.data.data);
                    })
                    .catch(err => err)
                }
                placeholder="search"
                fullWidth
              />
              {stores.map(store => (
                <MenuItem
                  key={store.id}
                  value={store.name}
                  onClick={() => {
                    getStore(store.id)
                      .then(res => {
                        const data =
                          res.data.data.merchantProductsAndService.products
                            .data;
                        setProdukToko(data);
                      })
                      .catch(err => err);
                  }}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel id="products" style={{ marginBottom: 15 }}>
            Produk (max 5)
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            className={classes.formControl}>
            <Select
              labelId="products"
              id="products"
              name="products"
              multiple
              value={formProduk.products}
              input={<Input />}
              MenuProps={MenuProps}>
              <List dense>
                {produkToko.map(produk => {
                  const labelId = `checkbox-list-secondary-label-${produk.name}`;
                  return (
                    <ListItem
                      key={produk.id}
                      button
                      onClick={onCheckboxProduk(produk.id)}>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar ${produk.name}`}
                          src={produk.images[0].image}
                        />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={produk.name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={onCheckboxProduk(produk.id)}
                          checked={
                            formProduk.products.indexOf(produk.id) !== -1
                          }
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Select>
          </FormControl>

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
        open={openHS}
        close={() => {
          setIsEdit(false);
          setFormServices({
            ...formServices,
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });
          setOpenHS(false);
        }}
        title="Form Highlight Jasa">
        <div className={classes.form}>
          <InputLabel
            htmlFor="headline"
            error={errorServices.headline ? true : false}
            className={classes.label}>
            Headline
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="headline"
              id="headline"
              color="primary"
              onChange={onChangeServices}
              value={formServices.headline}
              error={errorServices.headline ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={errorServices.headline ? true : false}>
              {errorServices.headline}
            </FormHelperText>
          </FormControl>

          {isEdit && (
            <div>
              <InputLabel id="status" style={{ marginBottom: 15 }}>
                Status
              </InputLabel>
              <FormControl
                variant="outlined"
                size="small"
                fullWidth
                style={{ marginBottom: 15 }}>
                <Select
                  labelId="status"
                  id="status"
                  name="status"
                  value={formServices.status}
                  onChange={onChangeServices}>
                  <MenuItem value={1}>Aktif</MenuItem>
                  <MenuItem value={2}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>
            </div>
          )}

          <div className={classes.inputFile}>
            <InputLabel id="image">Gambar (max 500KB)</InputLabel>
            <Avatar
              alt="photo"
              src={
                formServices.image.name
                  ? URL.createObjectURL(formServices.image)
                  : formServices.image
              }
              variant="rounded"
              className={classes.preview}
            />
            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={onSelectedForServices}
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
            error={errorServices.image ? true : false}>
            {errorServices.image}
          </FormHelperText>

          <InputLabel id="namaStore" style={{ marginBottom: 15 }}>
            Pilih Toko
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: 15 }}>
            <Select
              labelId="namaStore"
              id="namaStore"
              name="namaStore"
              value={namaStore}
              onChange={e => setNamaStore(e.target.value)}>
              <TextField
                id="search"
                name="search"
                value={stores}
                onChange={e =>
                  getStores('', e.target.value)
                    .then(res => {
                      setStores(res.data.data);
                    })
                    .catch(err => err)
                }
                placeholder="search"
                fullWidth
              />
              {stores.map(store => (
                <MenuItem
                  key={store.id}
                  value={store.name}
                  onClick={() => {
                    getStore(store.id)
                      .then(res => {
                        const data =
                          res.data.data.merchantProductsAndService.services
                            .data;
                        setServiceToko(data);
                      })
                      .catch(err => err);
                  }}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <InputLabel id="services" style={{ marginBottom: 15 }}>
            Jasa (max 5)
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            style={{ marginBottom: 15 }}>
            <Select
              labelId="services"
              id="services"
              name="services"
              multiple
              value={formServices.services}
              input={<Input />}
              MenuProps={MenuProps}>
              <List dense>
                {serviceToko.map(jasa => {
                  const labelId = `checkbox-list-secondary-label-${jasa.name}`;
                  return (
                    <ListItem
                      key={jasa.id}
                      button
                      onClick={onCheckboxService(jasa.id)}>
                      <ListItemAvatar>
                        <Avatar
                          alt={`Avatar ${jasa.name}`}
                          src={jasa.images[0].image}
                        />
                      </ListItemAvatar>
                      <ListItemText id={labelId} primary={jasa.name} />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          onChange={onCheckboxService(jasa.id)}
                          checked={
                            formServices.services.indexOf(jasa.id) !== -1
                          }
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={onSubmitServices}
            className={classes.submit}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={openHapus}
        close={() => setOpenHapus(false)}
        submit={onDelete}
        title="Hapus Highlight">
        Apakah yakin ingin hapus ?
      </ConfirmDialog>
    </div>
  );
}

TabHighLight.propTypes = {
  setDataBanners: propTypes.func,
  dataBanners: propTypes.object
};

const mapStateToProps = state => ({
  dataBanners: state.banner.banners
});

const mapDispatchToProps = dispatch => ({
  setDataBanners: value => dispatch(setBanners(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabHighLight);
