import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Button,
  IconButton,
  // TextField,
  InputLabel,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  OutlinedInput,
  InputAdornment,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent
} from '@material-ui/core';

// material-ui icons
import { Search, Delete, Edit } from '@material-ui/icons';

// components
import { Paginasi, CompDialog, ConfirmDialog } from 'components';

// redux
import { connect } from 'react-redux';
import { setVoucher } from 'modules';

// services
import {
  createVoucher,
  readVoucher,
  updateVoucher,
  deleteVoucher
  // getCategory
} from 'services';

// utils
import { currency, dateConverterReq, dateConverterRes } from 'utils';

function Voucher({ setDataVoucher, dataVoucher }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    form: false,
    hapus: false
  });

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [categoryID, setCategoryID] = useState([]);

  const [dataDetail, setDataDetail] = useState({});

  const [form, setForm] = useState({
    type: '1',
    status: '1',
    category: '',
    code: '',
    min_amount: '',
    amount: '',
    quantity: '',
    image: '',
    description: '',
    tac: '',
    expired_at: ''
  });

  const [error, setError] = useState({
    type: '',
    status: '',
    category: '',
    code: '',
    min_amount: '',
    amount: '',
    quantity: '',
    image: '',
    description: '',
    tac: '',
    expired_at: ''
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

    if (!form.status) {
      newError.status = 'Field masih kosong';
    }

    if (!form.category) {
      newError.category = 'Field masih kosong';
    }

    if (!form.code) {
      newError.code = 'Field masih kosong';
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

    if (!form.expired_at) {
      newError.expired_at = 'Field masih kosong';
    }

    return newError;
  };

  // useEffect untuk merender agar data di read (list)
  useEffect(() => {
    readVoucher()
      .then(res => {
        setDataVoucher(res.data.data);
        setPagination({
          ...pagination,
          current_page: res.data.meta.current_page
        });
        setPagination({
          ...pagination,
          last_page: res.data.meta.last_page
        });
      })
      .catch(err => err);
  }, []);

  // submit untuk menambah atau mengedit data
  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      if (isEdit) {
        // edit data

        // state
        const {
          type,
          status,
          category,
          code,
          min_amount,
          amount,
          quantity,
          image,
          description,
          tac,
          expired_at
        } = form;

        // form-data kosong
        const formdata = new FormData();

        // mengisi data menggunakan append
        formdata.append('type', parseInt(type));
        formdata.append('status', parseInt(status));
        formdata.append('category', category);
        formdata.append('code', code);
        formdata.append('min_amount', min_amount);
        formdata.append('amount', amount);
        formdata.append('quantity', quantity);
        formdata.append('image', image);
        formdata.append('description', description);
        formdata.append('tac', tac);
        formdata.append('expired_at', expired_at);

        // services
        const result = await updateVoucher(id, formdata).catch(err => err);

        if (result.success) {
          setForm({
            type: '1',
            status: '1',
            category: '',
            code: '',
            min_amount: '',
            amount: '',
            quantity: '',
            image: '',
            description: '',
            tac: '',
            expired_at: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Berhasil memperbarui voucher', {
            variant: 'success'
          });

          // read kembali data
          setTimeout(() => {
            readVoucher()
              .then(res => {
                setDataVoucher(res.data.data);
                setPagination({
                  ...pagination,
                  current_page: res.data.meta.current_page
                });
                setPagination({
                  ...pagination,
                  last_page: res.data.meta.last_page
                });
              })
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            type: '1',
            status: '1',
            category: '',
            code: '',
            min_amount: '',
            amount: '',
            quantity: '',
            image: '',
            description: '',
            tac: '',
            expired_at: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Gagal memmperbarui voucher', {
            variant: 'error'
          });
        }
      } else {
        // tambah data

        // state
        const {
          type,
          status,
          category,
          code,
          min_amount,
          amount,
          quantity,
          image,
          description,
          tac,
          expired_at
        } = form;

        // form-data kosong
        const formdata = new FormData();

        // mengisi data menggunakan append
        formdata.append('type', parseInt(type));
        formdata.append('status', parseInt(status));
        formdata.append('category', category);
        formdata.append('code', code);
        formdata.append('min_amount', min_amount);
        formdata.append('amount', amount);
        formdata.append('quantity', quantity);
        formdata.append('image', image);
        formdata.append('description', description);
        formdata.append('tac', tac);
        formdata.append('expired_at', expired_at);

        // services
        const result = await createVoucher(formdata).catch(err => err);

        if (result.success) {
          setForm({
            type: '1',
            status: '1',
            category: '',
            code: '',
            min_amount: '',
            amount: '',
            quantity: '',
            image: '',
            description: '',
            tac: '',
            expired_at: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Berhasil menambahkan voucher baru', {
            variant: 'success'
          });

          // read kembali data
          setTimeout(() => {
            readVoucher()
              .then(res => {
                setDataVoucher(res.data.data);
                setPagination({
                  ...pagination,
                  current_page: res.data.meta.current_page
                });
                setPagination({
                  ...pagination,
                  last_page: res.data.meta.last_page
                });
              })
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            type: '1',
            status: '1',
            category: '',
            code: '',
            min_amount: '',
            amount: '',
            quantity: '',
            image: '',
            description: '',
            tac: '',
            expired_at: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Gagal menambahkan voucher baru', {
            variant: 'error'
          });
        }
      }
    }
  };

  // hapus data
  const hapus = async () => {
    const result = await deleteVoucher(id).catch(err => err);

    if (result.success) {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar('Berhasil menghapus voucher', {
        variant: 'success'
      });

      // read kembali data
      setTimeout(() => {
        readVoucher()
          .then(res => {
            setDataVoucher(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
            setPagination({
              ...pagination,
              last_page: res.data.meta.last_page
            });
          })
          .catch(err => err);
      }, 5000);
    } else {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar('Gagal menghapus voucher', {
        variant: 'error'
      });
    }
  };

  // upload image
  const handleUploadFile = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file && file.type}`
      });
    } else if (file && file.size >= 2097152) {
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
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() =>
            setOpen({
              ...open,
              form: true
            })
          }>
          tambah voucher
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            onChange={e =>
              readVoucher(e.target.value).then(res =>
                setDataVoucher(res.data.data)
              )
            }
            endAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.main}>
        {dataVoucher &&
          dataVoucher.map(data => (
            <Card key={data.id}>
              <CardActionArea
                onClick={() => {
                  setDataDetail(data);
                  setOpen({ ...open, detail: true });
                }}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  image={data.image}
                  title="Contemplative Reptile"
                />
                <CardContent className={classes.content}>
                  <span>{data.code}</span>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.action}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setID(data.id);
                    setIsEdit(true);
                    setForm({
                      ...form,
                      type: data.voucherType && data.voucherType.id.toString(),
                      status: data.voucherStatus && data.voucherStatus.id,
                      category: data.voucherCategory && data.voucherCategory.id,
                      code: data.code,
                      min_amount: data.minAmount,
                      amount: data.amount,
                      quantity: data.quantity,
                      image: data.image,
                      description: data.description,
                      tac: data.termAndCondition,
                      expired_at: dateConverterReq(data.expiredAt)
                    });
                    setOpen({ ...open, form: true });
                  }}>
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    setID(data.id);
                    setOpen({ ...open, hapus: true });
                  }}>
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </div>

      <Paginasi
        count={pagination.last_page}
        page={pagination.current_page}
        onChange={(e, value) =>
          readVoucher('', value).then(res => {
            setDataVoucher(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
          })
        }
      />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}
        title={dataDetail.code}>
        <img src={dataDetail.image} alt="photo" className={classes.img} />
        <p className={classes.nama}>{dataDetail.description}</p>
        <div className={classes.desk}>
          <span className={classes.teks}>Berlaku hingga</span>
          <span className={classes.teks}>
            {dateConverterRes(dataDetail.expiredAt)}
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
          <span className={classes.teks}>
            {dataDetail.voucherStatus && dataDetail.voucherStatus.name}
          </span>
        </div>
        <div className={classes.garis}></div>
        <label className={classes.label}>syarat & ketentuan</label>
        <p className={classes.teksSyaratDanKetentuan}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lacus gravida
          dui duis dolor mattis. Turpis ac eu vitae, a non porta egestas
          facilisi. Dignissim interdum senectus tempus mus nunc. Sit venenatis
          habitant volutpat erat vel. Eu nunc eros id consequat venenatis
          viverra ut. Amet, enim massa diam vulputate pellentesque leo tellus
          massa eget. Fringilla volutpat fermentum, malesuada nunc, et rhoncus.
          Luctus vitae, magna in dictumst etiam. Enim, tincidunt sed a quam
          viverra ultricies ante eget. Gravida semper condimentum ac viverra
          ultricies vulputate commodo. Turpis nunc, at a tortor risus arcu. Eget
          rhoncus non sit morbi eu lorem. Quisque nunc nibh adipiscing ultrices
          iaculis vitae orci purus. Fermentum facilisi tortor elit a.
        </p>
      </CompDialog>

      <CompDialog
        open={open.form}
        close={() => {
          setIsEdit(false);
          setOpen({ ...open, form: false });
        }}
        title="Form Voucher">
        <div className={classes.form}>
          <FormControl component="fieldset" style={{ marginBottom: 15 }}>
            <FormLabel component="legend">Tipe</FormLabel>
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

          <InputLabel
            htmlFor="status"
            error={error.status ? true : false}
            style={{ marginBottom: 15 }}>
            Status
          </InputLabel>
          <FormControl variant="outlined" style={{ marginBottom: 15 }}>
            <Select
              id="status"
              name="status"
              onChange={handleChange}
              value={form.status}>
              <MenuItem value={1}>Aktif</MenuItem>
              <MenuItem value={2}>Tidak Aktif</MenuItem>
            </Select>
          </FormControl>

          <InputLabel htmlFor="category" error={error.category ? true : false}>
            Kategori ID
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="category"
              id="category"
              color="primary"
              onChange={handleChange}
              value={form.category}
              error={error.category ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.category}>
              {error.category}
            </FormHelperText>
          </FormControl>

          {/* <FormControl variant="outlined" size="small" margin="normal">
            <Select
              name="category"
              id="category"
              value={form.category}
              onChange={handleChange}>
              <TextField
                placeholder="Search"
                name="search"
                id="search"
                fullWidth
                onChange={e =>
                  getCategory(e.target.value)
                    .then(res => setCategoryID(res.data.data))
                    .catch(err => err)
                }
                className={classes.input}
              />
              {categoryID &&
                categoryID.map(data => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText
              id="outlined-helper-text"
              error={error.category ? true : false}>
              {error.category}
            </FormHelperText>
          </FormControl> */}

          <InputLabel htmlFor="code" error={error.code ? true : false}>
            Kode
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="code"
              id="code"
              color="primary"
              onChange={handleChange}
              value={form.code}
              error={error.code ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.code}>
              {error.code}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="min_amount"
            error={error.min_amount ? true : false}>
            Minimal Jumlah
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
            <FormHelperText id="outlined-helper-text" error={error.min_amount}>
              {error.min_amount}
            </FormHelperText>
          </FormControl>

          <InputLabel htmlFor="amount" error={error.amount ? true : false}>
            Jumlah
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

          <InputLabel htmlFor="quantity" error={error.quantity ? true : false}>
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

          <div className={classes.inputFile}>
            <div className={classes.itemPreview}>
              {form.image ? (
                <img src={form.image} alt="photo" className={classes.preview} />
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
              Upload Foto
            </label>
          </div>
          <br />
          <FormHelperText
            id="outlined-helper-text"
            error={error.image ? true : false}>
            {error.image}
          </FormHelperText>

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
            <FormHelperText id="outlined-helper-text" error={error.description}>
              {error.description}
            </FormHelperText>
          </FormControl>

          <InputLabel htmlFor="tac" error={error.tac ? true : false}>
            Tac
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

          <InputLabel
            htmlFor="expired_at"
            error={error.expired_at ? true : false}>
            Tanggal Kedaluarsa
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
            <FormHelperText id="outlined-helper-text" error={error.expired_at}>
              {error.expired_at}
            </FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submit}>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={open.hapus}
        title="Hapus Voucher"
        close={() => setOpen({ ...open, hapus: false })}
        submit={hapus}>
        Yakin ingin menghapus voucher ?
      </ConfirmDialog>
    </div>
  );
}

Voucher.propTypes = {
  setDataVoucher: propTypes.func,
  dataVoucher: propTypes.array
};

const mapStateToProps = state => ({
  dataVoucher: state.voucher.vouchers
});

const mapDispatchToProps = dispatch => ({
  setDataVoucher: value => dispatch(setVoucher(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Voucher);
