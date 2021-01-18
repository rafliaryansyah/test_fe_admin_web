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
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50
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
  MenuItem,
  FormHelperText,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

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
  readBanners,
  createHighLightBanners,
  updateHighLightBanners,
  deleteHighLightBanners,
  getStores
} from 'services';

function TabHighLight({ setDataBanners, dataBanners }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    active: 0,
    history: 0
  });

  const [open, setOpen] = useState({
    form: false,
    hapus: false
  });

  const [stores, setStores] = useState([]);

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  // tipe form
  const [type, setType] = useState('1');

  // form untuk tipe produk
  const [formProduk, setFormProduk] = useState({
    headline: '',
    status: '',
    product: [],
    image: ''
  });

  // form untuk tipe services
  const [formServices, setFormServices] = useState({
    headline: '',
    status: '',
    services: [],
    image: ''
  });

  // error form untuk tipe produk
  const [errorProduk, setErrorProduk] = useState({
    headline: '',
    status: '',
    product: '',
    image: ''
  });

  // error form untuk tipe services
  const [errorServices, setErrorServices] = useState({
    headline: '',
    status: '',
    services: '',
    image: ''
  });

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

    if (!formProduk.status) {
      newError.status = 'Field masih kosong';
    }

    if (!formProduk.headline) {
      newError.headline = 'Field masih kosong';
    }

    return newError;
  };

  // validasi form
  const validateServices = () => {
    const newError = { ...errorServices };

    if (!formServices.status) {
      newError.status = 'Field masih kosong';
    }

    if (!formServices.headline) {
      newError.headline = 'Field masih kosong';
    }

    return newError;
  };

  useEffect(() => {
    getStores('', '')
      .then(res => {
        setStores(res.data.data);
      })
      .catch(err => err);
  }, []);

  const onSubmitProduk = async e => {
    e.preventDefault();

    const findErrors = validateProduk();

    if (Object.values(findErrors).some(err => err !== '')) {
      setErrorProduk(findErrors);
    } else {
      // state form produk
      const { type, status, headline, product, image } = formProduk;

      // form-data yang kosong
      const formdata = new FormData();

      // mengisi form-data menggunakan append
      formdata.append('type', parseInt(type));
      formdata.append('status', status);
      formdata.append('headline', headline);
      formdata.append('product', product);
      formdata.append('image', image);

      // services
      const result = await createHighLightBanners(formdata).catch(err => err);

      // cek sukses atau tidak
      if (result.success) {
        setFormProduk({
          type: '1',
          headline: '',
          status: '',
          product: [],
          image: ''
        });
        setOpen({ ...open, form: false });

        // read kembali data baru
        setTimeout(() => {
          readBanners()
            .then(res => {
              setDataBanners(res.data.data);
            })
            .catch(err => err);
        }, 3000);
        enqueueSnackbar('Berhasil menambah data baru', { variant: 'success' });
      } else {
        setFormProduk({
          type: '1',
          headline: '',
          status: '',
          product: [],
          image: ''
        });
        setOpen({ ...open, form: false });
        enqueueSnackbar('Gagal menambah data baru', { variant: 'error' });
      }
    }
  };

  // hapus data
  const onDelete = async () => {
    // services
    const result = await deleteHighLightBanners(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpen({ ...open, hapus: false });

      // read kembali data baru
      setTimeout(() => {
        readBanners()
          .then(res => {
            setDataBanners(res.data.data);
          })
          .catch(err => err);
      }, 3000);
      enqueueSnackbar('Berhasil menghapus data', { variant: 'success' });
    } else {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar('Gagal menghapus data', { variant: 'success' });
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
          <Carousel
            ssr
            partialVisbile
            itemClass={classes.card}
            responsive={responsive}>
            {dataBanners.highlightBanner ? (
              dataBanners.highlightBanner.data.map(item => (
                <Card key={item}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="230"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID('');
                        setIsEdit(true);
                        setType('1');
                        setFormProduk({
                          ...formProduk
                        });
                        setOpen({ ...open, form: true });
                      }}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setID('');
                        setOpen({ ...open, hapus: true });
                      }}>
                      <IoTrashOutline />
                    </IconButton>
                  </CardActions>
                </Card>
              ))
            ) : (
              <div>item image kosong</div>
            )}
          </Carousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight produk history</label>
          <br />
          <br />
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, form: true })}>
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
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>highlight jasa history</label>
          <br />
          <br />
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, highlightJasa: true })}>
            buat highlight jasa
          </Button>
        </div>
      </div>

      <CompDialog
        open={open.form}
        close={() => setOpen({ ...open, form: false })}
        title={type === '1' ? 'Form HighLight Produk' : 'Form HighLight Jasa'}>
        <div className={classes.form}>
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

          {type === '1' ? <div>Produk</div> : <div>Jasa</div>}

          <Button
            variant="contained"
            color="primary"
            onClick={e => (type === '1' ? onSubmitProduk(e) : null)}
            className={classes.submit}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={open.hapus}
        close={() => setOpen({ ...open, hapus: false })}
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
