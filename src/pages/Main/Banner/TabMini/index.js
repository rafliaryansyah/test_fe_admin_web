import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// react items carousel
import ItemsCarousel from 'react-items-carousel';

// material-ui core
import {
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

// material-ui icons
import {
  Edit,
  Delete,
  ChevronLeft,
  ChevronRight,
  CloudUpload
} from '@material-ui/icons';

// components
import { CompDialog, ConfirmDialog } from 'components';

// redux
import { connect } from 'react-redux';
import { setBanners } from 'modules';

// services
import {
  readBanners,
  createMiniBanners,
  updateMiniBanners,
  deleteMiniBanners
} from 'services';

function TabMini({ setDataBanners, dataBanners }) {
  const classes = useStyles();

  const [state, setState] = useState({
    active: 0,
    history: 0
  });

  const [open, setOpen] = useState({
    buat: false,
    atur: false,
    hapus: false
  });

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  // atur
  const [headline, setHeadline] = useState('');
  const [errorHeadline, setErrorHeadline] = useState({
    pesan: ''
  });

  const validateAtur = () => {
    const newError = { ...errorHeadline };

    if (!headline) {
      newError.pesan = 'Field masih kosong';
    }

    return newError;
  };

  // buat
  const [form, setForm] = useState({
    ke: '',
    id_product: '',
    image: ''
  });

  const [error, setError] = useState({
    ke: '',
    id_product: '',
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

  const validateBuat = () => {
    const newError = { ...error };

    if (!form.ke) {
      newError.ke = 'Field masih kosong';
    }

    if (!form.id_product) {
      newError.id_product = 'Field masih kosong';
    }

    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    if (!headline) {
      newError.headline = 'Field masih kosong';
    }

    return newError;
  };

  // atur
  const submitAtur = async e => {
    e.preventDefault();

    const findErrors = validateAtur();

    if (Object.values(findErrors).some(err => err !== '')) {
      setErrorHeadline(findErrors);
    } else {
      console.log('Request Data Body :', headline);
    }
  };

  // buat atau edit data
  const submitCreated = async e => {
    e.preventDefault();

    const findErrors = validateBuat();

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
        const result = await updateMiniBanners(id, formdata).catch(err => err);

        console.log('result : ', result);

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
        const result = await createMiniBanners(formdata).catch(err => err);

        console.log('result : ', result);

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
    const result = await deleteMiniBanners(id).catch(err => err);

    console.log('result : ', result);

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
          <label className={classes.title}>mini banner produk aktif</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={3}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.active}
            requestToChangeActive={value =>
              setState({ ...state, active: value })
            }
            leftChevron={
              <div>
                <IconButton color="primary">
                  <ChevronLeft />
                </IconButton>
              </div>
            }
            rightChevron={
              <div>
                <IconButton color="primary">
                  <ChevronRight />
                </IconButton>
              </div>
            }>
            {dataBanners &&
              dataBanners.miniBanner &&
              dataBanners.miniBanner.data &&
              dataBanners.miniBanner.data.map(data => (
                <div key={data[0]}>
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
                          setOpen({ ...open, buat: true });
                        }}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => {
                          setID();
                          setOpen({ ...open, hapus: true });
                        }}>
                        <Delete />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              ))}
          </ItemsCarousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini banner produk history</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={5}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.history}
            requestToChangeActive={value =>
              setState({ ...state, history: value })
            }
            leftChevron={
              <div>
                <IconButton color="primary">
                  <ChevronLeft />
                </IconButton>
              </div>
            }
            rightChevron={
              <div>
                <IconButton color="primary">
                  <ChevronRight />
                </IconButton>
              </div>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
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
                      onClick={() => setOpen({ ...open, buat: true })}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, hapus: true })}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, atur: true })}>
            atur headline
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, buat: true })}>
            buat banner
          </Button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini banner jasa aktif</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={3}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.active}
            requestToChangeActive={value =>
              setState({ ...state, active: value })
            }
            leftChevron={
              <div>
                <IconButton color="primary">
                  <ChevronLeft />
                </IconButton>
              </div>
            }
            rightChevron={
              <div>
                <IconButton color="primary">
                  <ChevronRight />
                </IconButton>
              </div>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
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
                      onClick={() => setOpen({ ...open, buat: true })}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, hapus: true })}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <br />
        <br />
        <br />
        <div className={classes.wrapperCard}>
          <label className={classes.title}>mini banner jasa history</label>
          <br />
          <br />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={5}
            slidesToScroll={1}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={state.history}
            requestToChangeActive={value =>
              setState({ ...state, history: value })
            }
            leftChevron={
              <div>
                <IconButton color="primary">
                  <ChevronLeft />
                </IconButton>
              </div>
            }
            rightChevron={
              <div>
                <IconButton color="primary">
                  <ChevronRight />
                </IconButton>
              </div>
            }>
            {Array.from(new Array(10)).map((_, i) => (
              <div key={i}>
                <Card>
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
                      onClick={() => setOpen({ ...open, buat: true })}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => setOpen({ ...open, hapus: true })}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </div>
            ))}
          </ItemsCarousel>
        </div>
        <div className={classes.wrapperButton}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, atur: true })}>
            atur headline
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen({ ...open, buat: true })}>
            buat banner
          </Button>
        </div>
      </div>
      <CompDialog
        open={open.buat}
        close={() => setOpen({ ...open, buat: false })}
        title="Buat Banner">
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
            <div className={classes.itemPreview}>
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Foto Banner"
                  className={classes.preview}
                />
              ) : (
                'Image Preview'
              )}
            </div>
            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={handleUploadFile}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload" className={classes.itemUpload}>
              <CloudUpload color="primary" />
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
            onClick={submitCreated}
            className={classes.submit}
            disabled={form.ke && form.id_product && form.image ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>
      <CompDialog
        open={open.atur}
        close={() => setOpen({ ...open, atur: false })}
        title="Atur Headline">
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
              onChange={e => {
                setHeadline(e.target.value);
                setError({ ...error, headline: '' });
              }}
              value={headline}
              error={error.headline ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.headline ? true : false}>
              {error.headline}
            </FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={submitAtur}
            className={classes.submit}
            disabled={headline ? false : true}>
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
