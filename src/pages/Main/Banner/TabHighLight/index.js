import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// scroll
import ScrollContainer from 'react-indiana-drag-scroll';

// select
import MultiSelect from 'react-select';

// notistack
import { useSnackbar } from 'notistack';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
  MenuItem,
  FormHelperText,
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
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5';

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

// utils
import { dateConverterRes, fileExtention, uriToFile } from 'utils';

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

  // data id dan type highlight
  const [id, setID] = useState('');
  const [type, setType] = useState(0);

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

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: '%', width: 30, height: 20 });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

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

    if (!formProduk.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  // validasi form
  const validateServices = () => {
    const newError = { ...errorServices };

    if (!formServices.headline) {
      newError.headline = 'Field masih kosong';
    }

    if (!formServices.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  // read data banner type product dan service
  useEffect(() => {
    readBannersHighlight('product', false).then(res => {
      setHighlightProduks(res.data.data);
    });
  }, []);

  useEffect(() => {
    readBannersHighlight('service', false).then(res => {
      setHighlightServices(res.data.data);
    });
  }, []);

  // read data toko
  useEffect(() => {
    getStores('', '').then(res => {
      setStores(res.data.data);
    });
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
          formdata.append(`products[${index}]`, product.value);
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
          setOpenHP(false);

          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });

          // read kembali data baru
          readBannersHighlight('product', false).then(res => {
            setHighlightProduks(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
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
          formdata.append(`products[${index}]`, product.value);
        });

        formdata.append('image', image);

        // services
        const result = await createHighLightBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenHP(false);

          setFormProduk({
            type: 1,
            headline: '',
            status: 2,
            products: [],
            image: ''
          });

          // read kembali data baru
          readBannersHighlight('product', false).then(res => {
            setHighlightProduks(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenHP(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
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
          formdata.append(`services[${index}]`, service.value);
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
          setOpenHS(false);

          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });

          // read kembali data baru
          readBannersHighlight('service', false).then(res => {
            setHighlightServices(res.data.data);
          });

          enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
        } else {
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
          formdata.append(`services[${index}]`, service.value);
        });

        formdata.append('image', image);

        // services
        const result = await createHighLightBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenHS(false);

          setFormServices({
            type: 2,
            headline: '',
            status: 2,
            services: [],
            image: ''
          });

          // read kembali data baru
          readBannersHighlight('service', false).then(res => {
            setHighlightServices(res.data.data);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          setOpenHS(false);

          enqueueSnackbar('Gagal menambah data', { variant: 'error' });
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

      // cek tipe untuk read kembali data baru
      if (type === 1) {
        readBannersHighlight('product', false).then(res => {
          setHighlightProduks(res.data.data);
        });
      } else {
        readBannersHighlight('service', false).then(res => {
          setHighlightServices(res.data.data);
        });
      }

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
          setErrorServices({
            ...errorServices,
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
  const onClickToSetCropProduk = e => {
    e.preventDefault();

    if (uri) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(uri);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setFormProduk({ ...formProduk, image: base64ToFile });

      setURI();
    }
  };

  // set crop
  const onClickToSetCropService = e => {
    e.preventDefault();

    if (uri) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(uri);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setFormServices({ ...formServices, image: base64ToFile });

      setURI();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div>
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk aktif</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {highlightProduks?.map(
                item =>
                  item.bannerStatus?.id === 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id).then(res => {
                            setDetailHP(res.data.data);

                            setOpenHPD(true);
                          });
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="480px"
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
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.bannerType?.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
              )}
            </div>
          </ScrollContainer>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk history</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainerHostory}>
            <div className={classes.wrapperItem}>
              {highlightProduks?.map(
                item =>
                  item.bannerStatus?.id !== 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id).then(res => {
                            setDetailHP(res.data.data);

                            setOpenHPD(true);
                          });
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="480px"
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
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.bannerType?.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
              )}
            </div>
          </ScrollContainer>
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
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainer}>
            <div className={classes.wrapperItem}>
              {highlightServices?.map(
                item =>
                  item.bannerStatus?.id === 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id).then(res => {
                            setDetailHS(res.data.data);

                            setOpenHSD(true);
                          });
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="480px"
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
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.bannerType?.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
              )}
            </div>
          </ScrollContainer>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa history</label>
          <br />
          <br />
          <ScrollContainer
            vertical={false}
            nativeMobileScroll
            className={classes.scrollContainerHostory}>
            <div className={classes.wrapperItem}>
              {highlightServices?.map(
                item =>
                  item.bannerStatus?.id !== 1 && (
                    <Card key={item.id}>
                      <CardActionArea
                        disabled={item.isDeleted}
                        onClick={() => {
                          readDetailBannersHighlight(item.id).then(res => {
                            setDetailHS(res.data.data);

                            setOpenHSD(true);
                          });
                        }}>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="480px"
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
                          disabled={item.isDeleted}
                          onClick={() => {
                            setID(item.id);
                            setType(item.bannerType?.id);
                            setOpenHapus(true);
                          }}>
                          <IoTrashOutline />
                        </IconButton>
                      </CardActions>
                    </Card>
                  )
              )}
            </div>
          </ScrollContainer>
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
            src={detailHP.detail?.image}
            variant="rounded"
            classes={{
              root: classes.previewRoot
            }}
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
            src={detailHS.detail?.image}
            variant="rounded"
            classes={{
              root: classes.previewRoot
            }}
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
          setErrorProduk({
            ...errorProduk,
            headline: '',
            status: '',
            image: ''
          });
          setURI();
          setOpenHP(false);
        }}
        title="Form Highlight Produk">
        <div className={classes.form}>
          <div>
            <InputLabel
              htmlFor="headline"
              error={errorProduk.headline ? true : false}>
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
          </div>

          {isEdit && (
            <div>
              <InputLabel id="status" style={{ marginBottom: 10 }}>
                Status
              </InputLabel>
              <FormControl variant="outlined" size="small" fullWidth>
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

          <div style={{ margin: '15px 0px' }}>
            <InputLabel id="namaStore" style={{ marginBottom: 10 }}>
              Pilih Toko
            </InputLabel>
            <FormControl variant="outlined" size="small" fullWidth>
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
                <div style={{ maxHeight: 109, overflowY: 'auto' }}>
                  {stores.map(store => (
                    <MenuItem
                      key={store.id}
                      value={store.name}
                      onClick={() => {
                        getStore(store.id)
                          .then(res => {
                            const data = [];

                            res.data.data.merchantProductsAndService.products.data.map(
                              produk => {
                                data.push({
                                  value: produk.id,
                                  label: produk.name
                                });
                              }
                            );

                            setProdukToko(data);
                          })
                          .catch(err => err);
                      }}>
                      {store.name}
                    </MenuItem>
                  ))}
                </div>
              </Select>
            </FormControl>
          </div>

          <div>
            <InputLabel id="demo-mutiple-name-label">Produk (max 5)</InputLabel>
            <MultiSelect
              name="produks"
              defaultValue={formProduk.products}
              onChange={e =>
                setFormProduk({
                  ...formProduk,
                  products: e
                })
              }
              options={produkToko}
              placeHolder="Silakan pilih produk"
              isMulti
              autoFocus
              isFocused
            />
          </div>

          <div className={classes.inputFile}>
            <InputLabel id="image">Gambar ( 414 / 332 )</InputLabel>
            {!uri && (
              <Avatar
                src={
                  formProduk.image?.name
                    ? URL.createObjectURL(formProduk.image)
                    : formProduk.image
                }
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
              onChange={onSelectedForProduk}
              style={{ display: 'none' }}
            />

            <div className={classes.actionUploadFile}>
              <label htmlFor="upload" className={classes.item}>
                pilih foto
              </label>
              {uri && (
                <label
                  onClick={onClickToSetCropProduk}
                  className={classes.item}>
                  set
                </label>
              )}
            </div>
            <FormHelperText
              id="outlined-helper-text"
              error={errorProduk.image ? true : false}>
              {errorProduk.image}
            </FormHelperText>
          </div>

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
          setErrorServices({
            ...errorServices,
            headline: '',
            status: '',
            image: ''
          });
          setURI();
          setOpenHS(false);
        }}
        title="Form Highlight Jasa">
        <div className={classes.form}>
          <div>
            <InputLabel
              htmlFor="headline"
              error={errorServices.headline ? true : false}>
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
          </div>

          {isEdit && (
            <div>
              <InputLabel id="status" style={{ marginBottom: 10 }}>
                Status
              </InputLabel>
              <FormControl variant="outlined" size="small" fullWidth>
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

          <div style={{ margin: '15px 0px' }}>
            <InputLabel id="namaStore" style={{ marginBottom: 10 }}>
              Pilih Toko
            </InputLabel>
            <FormControl variant="outlined" size="small" fullWidth>
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
                          const data = [];

                          res.data.data.merchantProductsAndService.services.data.map(
                            service => {
                              data.push({
                                value: service.id,
                                label: service.name
                              });
                            }
                          );

                          setServiceToko(data);
                        })
                        .catch(err => err);
                    }}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            <InputLabel id="demo-mutiple-name-label">Jasa (max 5)</InputLabel>
            <MultiSelect
              name="services"
              defaultValue={formServices.services}
              onChange={e =>
                setFormServices({
                  ...formServices,
                  services: e
                })
              }
              options={serviceToko}
              placeHolder="Silakan pilih jasa"
              isMulti
              autoFocus
              isFocused
            />
          </div>

          <div className={classes.inputFile}>
            <InputLabel id="image">Gambar ( 414 / 332 )</InputLabel>
            {!uri && (
              <Avatar
                src={
                  formServices.image?.name
                    ? URL.createObjectURL(formServices.image)
                    : formServices.image
                }
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
              onChange={onSelectedForServices}
              style={{ display: 'none' }}
            />

            <div className={classes.actionUploadFile}>
              <label htmlFor="upload" className={classes.item}>
                pilih foto
              </label>
              {uri && (
                <label
                  onClick={onClickToSetCropService}
                  className={classes.item}>
                  set
                </label>
              )}
            </div>
            <FormHelperText
              id="outlined-helper-text"
              error={errorServices.image ? true : false}>
              {errorServices.image}
            </FormHelperText>
          </div>

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
