import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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
  CardContent
} from '@material-ui/core';

// react icons
import {
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline
} from 'react-icons/io5';

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
} from 'services';

// utils
import { currency, dateConverterReq, dateConverterRes } from 'utils';

function Voucher({ setDataVoucher, dataVoucher }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data open dialog
  const [open, setOpen] = useState({
    detail: false,
    form: false,
    hapus: false
  });

  // data paginasi
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  // data id
  const [id, setID] = useState('');

  // data untuk update
  const [isEdit, setIsEdit] = useState(false);

  // data detail
  const [dataDetail, setDataDetail] = useState({});

  // data form
  const [form, setForm] = useState({
    code: '',
    type: '1',
    expired_at: '',
    min_amount: '',
    amount: '',
    description: '',
    tac: '',
    image: ''
  });

  // data errors form
  const [error, setError] = useState({
    code: '',
    type: '1',
    expired_at: '',
    min_amount: '',
    amount: '',
    description: '',
    tac: '',
    image: ''
  });

  // change input field pada form
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

  // validation form
  const validate = () => {
    const newError = { ...error };

    if (!form.code) {
      newError.code = 'Field masih kosong';
    }

    if (!form.type) {
      newError.type = 'Field masih kosong';
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

    if (!form.description) {
      newError.description = 'Field masih kosong';
    }

    if (!form.tac) {
      newError.tac = 'Field masih kosong';
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
          code,
          type,
          expired_at,
          min_amount,
          amount,
          description,
          tac,
          image
        } = form;

        // form-data kosong
        const formdata = new FormData();

        // mengisi data menggunakan append
        formdata.append('code', code);
        formdata.append('type', parseInt(type));
        formdata.append('expired_at', expired_at);
        formdata.append('min_amount', min_amount);
        formdata.append('amount', amount);
        formdata.append('description', description);
        formdata.append('tac', tac);

        // cek image yang baru atau tetap yang lama
        if (image.name) {
          formdata.append('image', image);
        }

        // services
        const result = await updateVoucher(id, formdata).catch(err => err);

        if (result.success) {
          setForm({
            code: '',
            type: '1',
            expired_at: '',
            min_amount: '',
            amount: '',
            description: '',
            tac: '',
            image: ''
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
            code: '',
            type: '1',
            expired_at: '',
            min_amount: '',
            amount: '',
            description: '',
            tac: '',
            image: ''
          });
          setOpen({ ...open, form: false });

          // cek error validation dari api
          if (result.data.response.data.errors) {
            enqueueSnackbar('Beberapa data yang diberikan tidak valid', {
              variant: 'error'
            });
          }
        }
      } else {
        // tambah data

        // state
        const {
          code,
          type,
          expired_at,
          min_amount,
          amount,
          description,
          tac,
          image
        } = form;

        // form-data kosong
        const formdata = new FormData();

        // mengisi data menggunakan append
        formdata.append('code', code);
        formdata.append('type', parseInt(type));
        formdata.append('expired_at', expired_at);
        formdata.append('min_amount', min_amount);
        formdata.append('amount', amount);
        formdata.append('description', description);
        formdata.append('tac', tac);
        formdata.append('image', image);

        // services
        const result = await createVoucher(formdata).catch(err => err);

        if (result.success) {
          setForm({
            code: '',
            type: '1',
            expired_at: '',
            min_amount: '',
            amount: '',
            description: '',
            tac: '',
            image: ''
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
            code: '',
            type: '1',
            expired_at: '',
            min_amount: '',
            amount: '',
            description: '',
            tac: '',
            image: ''
          });
          setOpen({ ...open, form: false });

          // cek error validation dari api
          if (result.data.response.data.errors) {
            enqueueSnackbar('Beberapa data yang diberikan tidak valid', {
              variant: 'error'
            });
          }
        }
      }
    }
  };

  // hapus data
  const hapus = async () => {
    // services
    const result = await deleteVoucher(id).catch(err => err);

    // cek sukses atau gagal
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
          }
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
            onChange={e =>
              readVoucher(e.target.value).then(res =>
                setDataVoucher(res.data.data)
              )
            }
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
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
                disabled={data.isDeleted}
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
                  disabled={data.isDeleted}
                  size="small"
                  color="primary"
                  onClick={() => {
                    setID(data.id);
                    setIsEdit(true);
                    setForm({
                      ...form,
                      code: data.code,
                      type: data.voucherType && data.voucherType.id.toString(),
                      expired_at: dateConverterReq(data.expiredAt),
                      min_amount: data.minAmount,
                      amount: data.amount,
                      description: data.description,
                      tac: data.termAndCondition,
                      image: data.image
                    });
                    setOpen({ ...open, form: true });
                  }}>
                  <IoPencilOutline />
                </IconButton>
                <IconButton
                  disabled={data.isDeleted}
                  size="small"
                  color="primary"
                  onClick={() => {
                    setID(data.id);
                    setOpen({ ...open, hapus: true });
                  }}>
                  <IoTrashOutline />
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
          {dataDetail.termAndCondition}
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
          <InputLabel htmlFor="code" error={error.code ? true : false}>
            Nama Voucher
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

          <FormControl component="fieldset" style={{ marginBottom: 15 }}>
            <FormLabel component="legend">Tipe Voucher</FormLabel>
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
            <FormHelperText id="outlined-helper-text" error={error.expired_at}>
              {error.expired_at}
            </FormHelperText>
          </FormControl>

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
            <FormHelperText id="outlined-helper-text" error={error.min_amount}>
              {error.min_amount}
            </FormHelperText>
          </FormControl>

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
