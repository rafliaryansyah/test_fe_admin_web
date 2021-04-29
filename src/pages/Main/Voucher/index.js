import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// debounce untuk fitur pencarian
import { debounce } from 'debounce';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  Button,
  IconButton,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  OutlinedInput,
  InputAdornment,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';

// react icons
import {
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline
} from 'react-icons/io5';

// components
import { Paginasi, CompDialog, ConfirmDialog } from 'components';

// services
import {
  createVoucher,
  readVoucher,
  updateVoucher,
  deleteVoucher,
  getCategory
} from 'services';

// utils
import {
  currency,
  dateConverterReq,
  dateConverterRes,
  fileExtention,
  uriToFile
} from 'utils';

function Voucher() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data open dialog
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openHapus, setOpenHapus] = useState(false);

  // data paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data id
  const [id, setID] = useState('');

  // data untuk update
  const [isEdit, setIsEdit] = useState(false);

  // data voucher
  const [vouchers, setVouchers] = useState([]);

  // data detail
  const [dataDetail, setDataDetail] = useState({});

  // data kategori
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [categoryJasa, setCategoryJasa] = useState([]);

  // data form
  const [form, setForm] = useState({
    title: '',
    type: '1',
    status: '1',
    category: '',
    expired_at: '',
    min_amount: '',
    amount: '',
    quantity: '',
    description: '',
    tac: '',
    image: ''
  });

  // data errors form
  const [error, setError] = useState({
    title: '',
    type: '',
    status: '',
    category: '',
    expired_at: '',
    min_amount: '',
    amount: '',
    quantity: '',
    description: '',
    tac: '',
    image: ''
  });

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({
    unit: '%',
    width: 30,
    height: 20,
    aspect: 4 / 3
  });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

  // change input field pada form
  const handleChange = e => {
    console.log('e', e.target.name);
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError({
      ...error,
      [e.target.name]: ''
    });
  };

  // validation form
  const validate = () => {
    const newError = { ...error };

    if (!form.title) {
      newError.title = 'Field masih kosong';
    }

    if (!form.type) {
      newError.type = 'Field masih kosong';
    }

    if (!form.status) {
      newError.status = 'Field masih kosong';
    }

    if (!form.category) {
      newError.category = 'Field masih kosong';
    }

    if (!form.expired_at) {
      newError.expired_at = 'Field masih kosong';
    }

    if (!form.min_amount) {
      newError.min_amount = 'Field masih kosong';
    }

    if (!form.amount) {
      newError.amount = 'Field masih kosong';
    }

    if (!form.quantity) {
      newError.quantity = 'Field masih kosong';
    }

    if (!form.description) {
      newError.description = 'Field masih kosong';
    }

    if (!form.tac) {
      newError.tac = 'Field masih kosong';
    }

    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  // read data
  useEffect(() => {
    readVoucher(false).then(res => {
      setVouchers(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    });
  }, []);

  // read data kategori
  useEffect(() => {
    getCategory(false, '1', 10).then(res => {
      setCategoryProduct(res.data.data);
    });
    getCategory(false, '2', 10).then(res => {
      setCategoryJasa(res.data.data);
    });
  }, []);

  // tambah atau edit
  const onSubmit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      if (isEdit) {
        // state
        const {
          title,
          type,
          status,
          category,
          expired_at,
          min_amount,
          amount,
          quantity,
          description,
          tac,
          image
        } = form;

        // form-data kosong
        const dataUpdate = new FormData();

        // mengisi data menggunakan append
        dataUpdate.append('title', title);
        dataUpdate.append('type', parseInt(type));
        dataUpdate.append('status', status);
        dataUpdate.append('category', category);
        dataUpdate.append('expired_at', expired_at);
        dataUpdate.append('min_amount', min_amount);
        dataUpdate.append('amount', amount);
        dataUpdate.append('quantity', quantity);
        dataUpdate.append('description', description);
        dataUpdate.append('tac', tac);

        // cek image yang baru atau tetap yang lama
        if (image.name) {
          dataUpdate.append('image', image);
        }

        // services
        const result = await updateVoucher(id, dataUpdate).catch(err => err);

        if (result.success) {
          setOpenForm(false);

          setForm({
            title: '',
            type: '1',
            status: 1,
            category: '',
            expired_at: '',
            min_amount: '',
            amount: '',
            quantity: '',
            description: '',
            tac: '',
            image: ''
          });

          // read kembali data
          readVoucher(false).then(res => {
            setVouchers(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          // cek error validation dari api
          if (
            result.data.response.data.errors?.title ||
            result.data.response.data.errors?.expired_at ||
            result.data.response.data.errors?.min_amount
          ) {
            setError({
              ...error,
              title: result.data.response.data.errors?.title
                ? 'Nama sudah ada.'
                : '',
              expired_at: result.data.response.data.errors?.expired_at
                ? 'Minimal tanggal setelah hari ini.'
                : '',
              min_amount: result.data.response.data.errors?.min_amount
                ? 'Minimal transaksi harus lebih besar dari potongan harga.'
                : ''
            });
          }

          // cek error code 422
          if (result.data.response.data.code === 422) {
            setOpenForm(false);

            setForm({
              title: '',
              type: '1',
              status: 1,
              category: '',
              expired_at: '',
              min_amount: '',
              amount: '',
              quantity: '',
              description: '',
              tac: '',
              image: ''
            });

            enqueueSnackbar('Terjadi kesalahan', {
              variant: 'error'
            });
          }
        }
      } else {
        // state
        const {
          title,
          type,
          status,
          category,
          expired_at,
          min_amount,
          amount,
          quantity,
          description,
          tac,
          image
        } = form;

        // form-data kosong
        const dataCreate = new FormData();

        // mengisi data menggunakan append
        dataCreate.append('title', title);
        dataCreate.append('type', parseInt(type));
        dataCreate.append('status', status);
        dataCreate.append('category', category);
        dataCreate.append('expired_at', expired_at);
        dataCreate.append('min_amount', min_amount);
        dataCreate.append('amount', amount);
        dataCreate.append('quantity', quantity);
        dataCreate.append('description', description);
        dataCreate.append('tac', tac);
        dataCreate.append('image', image);

        // services
        const result = await createVoucher(dataCreate).catch(err => err);

        if (result.success) {
          setOpenForm(false);

          setForm({
            title: '',
            type: '1',
            status: 1,
            category: '',
            expired_at: '',
            min_amount: '',
            amount: '',
            quantity: '',
            description: '',
            tac: '',
            image: ''
          });

          // read kembali data
          readVoucher(false).then(res => {
            setVouchers(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          // cek error validation dari api
          if (
            result.data.response.data.errors?.title ||
            result.data.response.data.errors?.expired_at ||
            result.data.response.data.errors?.min_amount
          ) {
            setError({
              ...error,
              title: result.data.response.data.errors?.title
                ? 'Nama sudah ada.'
                : '',
              expired_at: result.data.response.data.errors?.expired_at
                ? 'Minimal tanggal setelah hari ini.'
                : '',
              min_amount: result.data.response.data.errors?.min_amount
                ? 'Minimal transaksi harus lebih besar dari potongan harga.'
                : ''
            });
          }

          // cek error code 422
          if (result.data.response.data.code === 422) {
            setOpenForm(false);

            setForm({
              title: '',
              type: '1',
              status: 1,
              category: '',
              expired_at: '',
              min_amount: '',
              amount: '',
              quantity: '',
              description: '',
              tac: '',
              image: ''
            });

            enqueueSnackbar('Terjadi kesalahan', {
              variant: 'error'
            });
          }
        }
      }
    }
  };

  // hapus data
  const onHapus = async () => {
    // services
    const result = await deleteVoucher(id).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenHapus(false);

      // read kembali data
      readVoucher(false).then(res => {
        setVouchers(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setLastPage(res.data.meta.last_page);
      });

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    } else {
      // cek error code 422
      if (result.data.response.data.code === 422) {
        setOpenHapus(false);

        enqueueSnackbar('Terjadi kesalahan', {
          variant: 'error'
        });
      }
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file && file.type}`
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

      setForm({ ...form, image: base64ToFile });

      setURI();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setOpenForm(true);
          }}
          className={classes.formControl}>
          tambah voucher
        </Button>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            onChange={debounce(e => {
              readVoucher(false, e.target.value).then(res =>
                setVouchers(res.data.data)
              );
            }, 3000)}
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.main}>
        {vouchers?.map(data => (
          <Card key={data.id} className={classes.card}>
            <CardActionArea
              disabled={data.isDeleted}
              onClick={() => {
                setDataDetail(data);
                setOpenDetail(true);
              }}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                width="100%"
                height="100%"
                image={data.image}
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <span style={{ fontSize: 8 }}>{data.title}</span>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.action}>
              <IconButton
                disabled={data.isDeleted}
                size="small"
                color="primary"
                onClick={() => {
                  setID(data.id);
                  setIsEdit(true);
                  setForm({
                    ...form,
                    title: data.title,
                    type: data.voucherType?.id.toString(),
                    status: data.voucherStatus?.id,
                    category: data.voucherCategory?.id,
                    expired_at: dateConverterReq(data.expiredAt),
                    min_amount: data.minAmount,
                    amount: data.amount,
                    quantity: data.quantity,
                    description: data.description,
                    tac: data.termAndCondition,
                    image: data.image
                  });
                  setOpenForm(true);
                }}>
                <IoPencilOutline />
              </IconButton>
              <IconButton
                disabled={data.isDeleted}
                size="small"
                color="primary"
                onClick={() => {
                  setID(data.id);
                  setOpenHapus(true);
                }}>
                <IoTrashOutline />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>

      <br />
      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) =>
          readVoucher(false, '', value).then(res => {
            setVouchers(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          })
        }
      />
      <br />

      <CompDialog
        open={openDetail}
        close={() => setOpenDetail(false)}
        title={dataDetail.title}>
        <Avatar
          alt="photo"
          src={dataDetail.image}
          variant="rounded"
          classes={{
            root: classes.previewRoot
          }}
        />
        <p className={classes.nama}>{dataDetail.description}</p>
        <div className={classes.desk}>
          <span className={classes.teks}>Berlaku hingga</span>
          <span className={classes.teks}>
            {dataDetail.expiredAt && dateConverterRes(dataDetail.expiredAt)}
          </span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Minimum transaksi</span>
          <span className={classes.teks}>{currency(dataDetail.minAmount)}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Potongan Harga</span>
          <span className={classes.teks}>{currency(dataDetail.amount)}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Status</span>
          <span className={classes.teks}>{dataDetail.voucherStatus?.name}</span>
        </div>
        <div className={classes.garis}></div>
        <label className={classes.label}>syarat & ketentuan</label>
        <p className={classes.teksSyaratDanKetentuan}>
          {dataDetail.termAndCondition}
        </p>
      </CompDialog>

      <CompDialog
        open={openForm}
        close={() => {
          setIsEdit(false);
          setForm({
            title: '',
            type: '1',
            status: 1,
            category: '',
            expired_at: '',
            min_amount: '',
            amount: '',
            quantity: '',
            description: '',
            tac: '',
            image: ''
          });
          setError({
            title: '',
            type: '',
            status: '',
            category: '',
            expired_at: '',
            min_amount: '',
            amount: '',
            quantity: '',
            description: '',
            tac: '',
            image: ''
          });
          setURI();
          setOpenForm(false);
        }}
        title="Form Voucher">
        <div className={classes.form}>
          <div>
            <InputLabel htmlFor="title" error={error.title ? true : false}>
              Nama Voucher
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                name="title"
                id="title"
                color="primary"
                onChange={handleChange}
                value={form.title}
                error={error.title ? true : false}
              />
              <FormHelperText id="outlined-helper-text" error={error.title}>
                {error.title}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <FormLabel component="legend">Tipe Voucher</FormLabel>
            <FormControl component="fieldset" style={{ marginTop: 15 }}>
              <RadioGroup
                row
                aria-label="type"
                name="type"
                value={form.type}
                onChange={handleChange}>
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

          <div>
            <InputLabel id="status" error={error.status ? true : false}>
              Status
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginTop: 15 }}>
              <Select
                labelId="status"
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}>
                <MenuItem value={1}>Aktif</MenuItem>
                <MenuItem value={2}>Tidak Aktif</MenuItem>
              </Select>
              <FormHelperText id="outlined-helper-text" error={error.status}>
                {error.status}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel id="category" error={error.category ? true : false}>
              Kategori
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              fullWidth
              style={{ marginTop: 15 }}>
              <Select
                labelId="category"
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}>
                <TextField
                  id="search"
                  name="search"
                  value={form.type === '1' ? categoryProduct : categoryJasa}
                  onChange={e => {
                    form.type === '1'
                      ? getCategory(false, '1', null, e.target.value)
                          .then(res => {
                            setCategoryProduct(res.data.data);
                          })
                          .catch(err => err)
                      : getCategory(false, '2', null, e.target.value)
                          .then(res => {
                            setCategoryJasa(res.data.data);
                          })
                          .catch(err => err);
                  }}
                  placeholder="search"
                  fullWidth
                />
                <div style={{ maxHeight: 109, overflowY: 'auto' }}>
                  {form.type === '1' &&
                    categoryProduct.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  {form.type === '2' &&
                    categoryJasa.map(item => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                </div>
              </Select>
              <FormHelperText id="outlined-helper-text" error={error.category}>
                {error.category}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel
              htmlFor="expired_at"
              error={error.expired_at ? true : false}>
              Berlaku Hingga
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                type="date"
                name="expired_at"
                id="expired_at"
                color="primary"
                onChange={handleChange}
                value={form.expired_at}
                error={error.expired_at ? true : false}
              />
              <FormHelperText
                id="outlined-helper-text"
                error={error.expired_at}>
                {error.expired_at}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel
              htmlFor="min_amount"
              error={error.min_amount ? true : false}>
              Minimum Transaksi
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                type="number"
                name="min_amount"
                id="min_amount"
                color="primary"
                onChange={handleChange}
                value={form.min_amount}
                error={error.min_amount ? true : false}
              />
              <FormHelperText
                id="outlined-helper-text"
                error={error.min_amount}>
                {error.min_amount}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel htmlFor="amount" error={error.amount ? true : false}>
              Potongan Harga
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                type="number"
                name="amount"
                id="amount"
                color="primary"
                onChange={handleChange}
                value={form.amount}
                error={error.amount ? true : false}
              />
              <FormHelperText id="outlined-helper-text" error={error.amount}>
                {error.amount}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel
              htmlFor="quantity"
              error={error.quantity ? true : false}>
              Kuantitas
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                type="number"
                name="quantity"
                id="quantity"
                color="primary"
                onChange={handleChange}
                value={form.quantity}
                error={error.quantity ? true : false}
              />
              <FormHelperText id="outlined-helper-text" error={error.quantity}>
                {error.quantity}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel
              htmlFor="description"
              error={error.description ? true : false}>
              Deskripsi
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                name="description"
                id="description"
                color="primary"
                multiline
                onChange={handleChange}
                value={form.description}
                error={error.description ? true : false}
              />
              <FormHelperText
                id="outlined-helper-text"
                error={error.description}>
                {error.description}
              </FormHelperText>
            </FormControl>
          </div>

          <div>
            <InputLabel htmlFor="tac" error={error.tac ? true : false}>
              Syarat & Ketentuan
            </InputLabel>
            <FormControl
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth>
              <OutlinedInput
                name="tac"
                id="tac"
                color="primary"
                multiline
                onChange={handleChange}
                value={form.tac}
                error={error.tac ? true : false}
              />
              <FormHelperText id="outlined-helper-text" error={error.tac}>
                {error.tac}
              </FormHelperText>
            </FormControl>
          </div>

          <div className={classes.inputFile}>
            <InputLabel
              id="image"
              style={{ marginBottom: 15 }}
              error={error.image ? true : false}>
              Gambar
            </InputLabel>
            {!uri && (
              <Avatar
                src={
                  form.image?.name
                    ? URL.createObjectURL(form.image)
                    : form.image
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

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSubmit}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={openHapus}
        title="Hapus Voucher"
        close={() => setOpenHapus(false)}
        submit={onHapus}>
        Yakin ingin menghapus?
      </ConfirmDialog>
    </div>
  );
}

export default Voucher;
