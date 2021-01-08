import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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

// react multi carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
  FormHelperText
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
  createMainBanners,
  updateMainBanners,
  deleteMainBanners
} from 'services';

function TabMain({ setDataBanners, dataBanners }) {
  const classes = useStyles();

  const [state, setState] = useState({
    active: 0,
    history: 0
  });

  const [open, setOpen] = useState({
    form: false,
    hapus: false
  });

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    type: '1',
    relate: '1',
    status: '1',
    position: '1',
    image: '',
    product: ''
  });

  const [error, setError] = useState({
    type: '',
    relate: '',
    status: '',
    position: '',
    image: '',
    product: ''
  });

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

    if (!form.relate) {
      newError.relate = 'Field masih kosong';
    }

    if (!form.status) {
      newError.status = 'Field masih kosong';
    }

    if (!form.position) {
      newError.position = 'Field masih kosong';
    }

    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    if (!form.product) {
      newError.product = 'Field masih kosong';
    }

    return newError;
  };

  useEffect(() => {
    readBanners()
      .then(res => {
        setDataBanners(res.data.data);
      })
      .catch(err => err);
  }, []);

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // cek apakah edit atau buat data baru
      if (isEdit) {
        // edit data
        // state
        const { type, relate, status, position, image, product } = form;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', parseInt(type));
        formdata.append('relate', parseInt(relate));
        formdata.append('status', parseInt(status));
        formdata.append('position', parseInt(position));
        formdata.append('image', image);
        formdata.append('product', product);

        // services
        const result = await updateMainBanners(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setForm({
            type: '1',
            relate: '1',
            status: '1',
            position: '1',
            image: '',
            product: ''
          });
          setOpen({ ...open, form: false });

          // read kembali data baru
          setTimeout(() => {
            readBanners()
              .then(res => {
                setDataBanners(res.data.data);
              })
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            type: '1',
            relate: '1',
            status: '1',
            position: '1',
            image: '',
            product: ''
          });
          setOpen({ ...open, form: false });
        }
      } else {
        // buat data
        // state
        const { type, relate, status, position, image, product } = form;

        // form-data yang kosong
        const formdata = new FormData();

        // mengisi form-data menggunakan append
        formdata.append('type', parseInt(type));
        formdata.append('relate', parseInt(relate));
        formdata.append('status', parseInt(status));
        formdata.append('position', parseInt(position));
        formdata.append('image', image);
        formdata.append('product', product);

        // services
        const result = await createMainBanners(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setForm({
            type: '1',
            relate: '1',
            status: '1',
            position: '1',
            image: '',
            product: ''
          });
          setOpen({ ...open, form: false });

          // read kembali data baru
          setTimeout(() => {
            readBanners()
              .then(res => {
                setDataBanners(res.data.data);
              })
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            type: '1',
            relate: '1',
            status: '1',
            position: '1',
            image: '',
            product: ''
          });
          setOpen({ ...open, form: false });
        }
      }
    }
  };

  // hapus data
  const hapus = async () => {
    const result = await deleteMainBanners(id).catch(err => err);

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
      }, 5000);
    } else {
      setOpen({ ...open, hapus: false });
    }
  };

  // upload image
  const handleUploadFile = async e => {
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
          setForm({
            ...form,
            image: file
          });
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
          <label className={classes.title}>main banner aktif</label>
          <br />
          <br />
          <Carousel
            ssr
            partialVisbile
            itemClass="image-item"
            responsive={responsive}>
            {/* {dataBanners &&
              dataBanners.mainBanner &&
              dataBanners.mainBanner.data &&
              dataBanners.mainBanner.data.map(data => (
                <div key={data}>
                  <Card>
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
                          setID();
                          setIsEdit(true);
                          setForm({
                            ...form
                          });
                          setOpen({ ...open, form: true });
                        }}>
                        <IoPencilOutline />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setID();
                          setOpen({ ...open, hapus: true });
                        }}>
                        <IoTrashOutline />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              ))} */}
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="130"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, form: true })}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, hapus: true })}>
                      <IoTrashOutline />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </Carousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>main banner history</label>
          <br />
          <br />
          <Carousel
            ssr
            partialVisbile
            itemClass="image-item"
            responsive={responsiveHistory}>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt="Contemplative Reptile"
                      height="130"
                      image="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                      title="Contemplative Reptile"
                    />
                  </CardActionArea>
                  <CardActions className={classes.action}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, form: true })}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, hapus: true })}>
                      <IoTrashOutline />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </Carousel>
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
        close={() => setOpen({ ...open, form: false })}
        title="Form Banner">
        <div className={classes.form}>
          <FormControl component="fieldset">
            <FormLabel component="legend" error={error.ke ? true : false}>
              Arahkan ke
            </FormLabel>
            <RadioGroup
              row
              aria-label="ke"
              name="ke"
              value={form.ke}
              onChange={handleChange}>
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
            <FormHelperText
              id="outlined-helper-text"
              error={error.ke ? true : false}>
              {error.ke}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product"
            error={error.id_product ? true : false}
            className={classes.label}>
            ID Produk
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product"
              id="id_product"
              color="primary"
              onChange={handleChange}
              value={form.id_product}
              error={error.id_product ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product ? true : false}>
              {error.id_product}
            </FormHelperText>
          </FormControl>

          <div className={classes.inputFile}>
            <Avatar
              alt="photo"
              src={
                form.image.name ? URL.createObjectURL(form.image) : form.image
              }
              variant="rounded"
              className={classes.preview}
            />
            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={handleUploadFile}
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

          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
            disabled={form.ke && form.id_product && form.image ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={open.hapus}
        close={() => setOpen({ ...open, hapus: false })}
        submit={hapus}
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
