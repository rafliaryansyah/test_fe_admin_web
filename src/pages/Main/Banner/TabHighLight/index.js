import { useState } from 'react';
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
  InputLabel,
  OutlinedInput,
  Select,
  TextField,
  List,
  MenuItem,
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
  createHighLightBanners,
  updateHighLightBanners,
  deleteHighLightBanners
} from 'services';

function TabHighLight({ setDataBanners, dataBanners }) {
  const classes = useStyles();

  const [state, setState] = useState({
    active: 0,
    history: 0
  });

  const [open, setOpen] = useState({
    highlightProduk: false,
    hapusHighlightProduk: false,
    highlightJasa: false,
    hapusHighlightJasa: false
  });

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [form, setForm] = useState({
    headline: '',
    id_product1: '',
    id_product2: '',
    id_product3: '',
    id_product4: '',
    id_product5: '',
    image: ''
  });

  const [error, setError] = useState({
    headline: '',
    id_product1: '',
    id_product2: '',
    id_product3: '',
    id_product4: '',
    id_product5: '',
    image: ''
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

    if (!form.headline) {
      newError.headline = 'Field masih kosong';
    }

    if (!form.id_product1) {
      newError.id_product1 = 'Field masih kosong';
    }

    if (!form.id_product2) {
      newError.id_product2 = 'Field masih kosong';
    }

    if (!form.id_product3) {
      newError.id_product3 = 'Field masih kosong';
    }

    if (!form.id_product4) {
      newError.id_product4 = 'Field masih kosong';
    }

    if (!form.id_product5) {
      newError.id_product5 = 'Field masih kosong';
    }

    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

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
        const result = await updateHighLightBanners(id, formdata).catch(
          err => err
        );

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
        const result = await createHighLightBanners(formdata).catch(err => err);

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
          <label className={classes.title}>highlight produk aktif</label>
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
                      onClick={() =>
                        setOpen({ ...open, highlightProduk: true })
                      }>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        setOpen({ ...open, hapusHighlightProduk: true })
                      }>
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
          <label className={classes.title}>highlight produk history</label>
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
                      onClick={() =>
                        setOpen({ ...open, highlightProduk: true })
                      }>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        setOpen({ ...open, hapusHighlightProduk: true })
                      }>
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
            onClick={() => setOpen({ ...open, highlightProduk: true })}>
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
                      onClick={() => setOpen({ ...open, highlightJasa: true })}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        setOpen({ ...open, hapusHighlightJasa: true })
                      }>
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
          <label className={classes.title}>highlight jasa history</label>
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
                      onClick={() => setOpen({ ...open, highlightJasa: true })}>
                      <IoPencilOutline />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() =>
                        setOpen({ ...open, hapusHighlightJasa: true })
                      }>
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
            onClick={() => setOpen({ ...open, highlightJasa: true })}>
            buat highlight jasa
          </Button>
        </div>
      </div>
      <CompDialog
        open={open.highlightProduk}
        close={() => setOpen({ ...open, highlightProduk: false })}
        title="Buat HighLight Produk">
        <div className={classes.form}>
          <InputLabel
            htmlFor="headline"
            error={error.headline ? true : false}
            className={classes.label}>
            Headline
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="headline"
              id="headline"
              color="primary"
              onChange={handleChange}
              value={form.headline}
              error={error.headline ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.headline ? true : false}>
              {error.headline}
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
            </label>
          </div>
          <br />
          <FormHelperText
            id="outlined-helper-text"
            error={error.image ? true : false}>
            {error.image}
          </FormHelperText>

          <InputLabel
            htmlFor="id_product1"
            error={error.id_product1 ? true : false}
            className={classes.label}>
            Pilih Produk (max 5)
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <Select
              id="id_product1"
              value={form.id_product1}
              onChange={handleChange}>
              <TextField
                className={classes.input}
                placeholder="Search"
                fullWidth
                onChange={e => console.log(e.target.value)}
              />
              <List>
                <MenuItem value={1}>Satu</MenuItem>
              </List>
            </Select>
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product1 ? true : false}>
              {error.id_product1}
            </FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
            disabled={
              form.headline &&
              form.id_product1 &&
              form.id_product2 &&
              form.id_product3 &&
              form.id_product4 &&
              form.id_product5 &&
              form.image
                ? false
                : true
            }>
            simpan
          </Button>
        </div>
      </CompDialog>
      <CompDialog
        open={open.highlightJasa}
        close={() => setOpen({ ...open, highlightJasa: false })}
        title="Buat HighLight Jasa">
        <div className={classes.form}>
          <InputLabel
            htmlFor="headline"
            error={error.headline ? true : false}
            className={classes.label}>
            Headline
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="headline"
              id="headline"
              color="primary"
              onChange={handleChange}
              value={form.headline}
              error={error.headline ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.headline ? true : false}>
              {error.headline}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product1"
            error={error.id_product1 ? true : false}
            className={classes.label}>
            ID Produk 1
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product1"
              id="id_product1"
              color="primary"
              onChange={handleChange}
              value={form.id_product1}
              error={error.id_product1 ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product1 ? true : false}>
              {error.id_product1}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product2"
            error={error.id_product2 ? true : false}
            className={classes.label}>
            ID Produk 2
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product2"
              id="id_product2"
              color="primary"
              onChange={handleChange}
              value={form.id_product2}
              error={error.id_product2 ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product2 ? true : false}>
              {error.id_product2}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product3"
            error={error.id_product3 ? true : false}
            className={classes.label}>
            ID Produk 3
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product3"
              id="id_product3"
              color="primary"
              onChange={handleChange}
              value={form.id_product3}
              error={error.id_product3 ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product3 ? true : false}>
              {error.id_product3}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product4"
            error={error.id_product4 ? true : false}
            className={classes.label}>
            ID Produk 4
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product4"
              id="id_product4"
              color="primary"
              onChange={handleChange}
              value={form.id_product4}
              error={error.id_product4 ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product4 ? true : false}>
              {error.id_product4}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="id_product5"
            error={error.id_product5 ? true : false}
            className={classes.label}>
            ID Produk 5
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="id_product5"
              id="id_product5"
              color="primary"
              onChange={handleChange}
              value={form.id_product5}
              error={error.id_product5 ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.id_product5 ? true : false}>
              {error.id_product5}
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
              Upload Foto
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
            disabled={
              form.headline &&
              form.id_product1 &&
              form.id_product2 &&
              form.id_product3 &&
              form.id_product4 &&
              form.id_product5 &&
              form.image
                ? false
                : true
            }>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={open.hapusHighlightProduk}
        close={() => setOpen({ ...open, hapusHighlightProduk: false })}
        submit={hapus}
        title="Hapus Banner">
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
