import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// debounce untuk fitur pencarian
import { debounce } from 'debounce';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Button,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  OutlinedInput,
  InputAdornment,
  Radio,
  RadioGroup,
  Card,
  CardActionArea,
  CardActions,
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

// services
import {
  createPromo,
  readPromo,
  detailPromoProduct,
  detailPromoService,
  updatePromo,
  deletePromo
} from 'services';

// redux
import { connect } from 'react-redux';
import { setID, setDari, setTerkait } from 'modules';

// utils
import { currency, dateConverterReq, dateConverterRes } from 'utils';

function Promo({ setDataID, setDataDari, setDataTerkait, history }) {
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

  // data cek untuk update
  const [isEdit, setIsEdit] = useState(false);

  // data promos
  const [promos, setPromos] = useState([]);

  // data detail
  const [dataDetail, setDataDetail] = useState({});

  // data form
  const [form, setForm] = useState({
    title: '',
    started_at: '',
    ended_at: '',
    discount_type: 'percent',
    discount: '',
    description: '',
    tac: ''
  });

  // data errors form
  const [error, setError] = useState({
    title: '',
    started_at: '',
    ended_at: '',
    discount_type: '',
    discount: '',
    description: '',
    tac: ''
  });

  // change input form
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

  // validasi
  const validate = () => {
    const newError = { ...error };

    if (!form.title) {
      newError.title = 'Field masih kosong';
    }

    if (!form.started_at) {
      newError.started_at = 'Field masih kosong';
    }

    if (!form.ended_at) {
      newError.ended_at = 'Field masih kosong';
    }

    if (!form.discount_type) {
      newError.discount_type = 'Field masih kosong';
    }

    if (!form.discount) {
      newError.discount = 'Field masih kosong';
    }

    if (!form.description) {
      newError.description = 'Field masih kosong';
    }

    if (!form.tac) {
      newError.tac = 'Field masih kosong';
    }

    return newError;
  };

  // read data promo
  useEffect(() => {
    readPromo(false).then(res => {
      setPromos(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    });
  }, []);

  // tambah atau edit data
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
          started_at,
          ended_at,
          discount_type,
          discount,
          description,
          tac
        } = form;

        // form-data
        const formdata = new FormData(); // data kosong

        // data terisi berdasarkan name dan value
        formdata.append('title', title);
        formdata.append('started_at', started_at);
        formdata.append('ended_at', ended_at);
        formdata.append('discount_type', discount_type);
        formdata.append('discount', discount);
        formdata.append('description', description);
        formdata.append('tac', tac);

        // services
        const result = await updatePromo(id, formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenForm(false);

          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });

          // read kembali data
          readPromo(false).then(res => {
            setPromos(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });

          enqueueSnackbar('Berhasil memperbarui data', {
            variant: 'success'
          });
        } else {
          // cek validasi errors
          if (
            result.data.response.data.errors?.title ||
            result.data.response.data.errors?.started_at ||
            result.data.response.data.errors?.ended_at
          ) {
            setError({
              ...error,
              title: result.data.response.data.errors?.title
                ? 'Nama tidak boleh ada spasi.'
                : '',
              started_at: result.data.response.data.errors?.started_at
                ? 'Minimal tanggal setelah hari ini.'
                : '',
              ended_at: result.data.response.data.errors?.ended_at
                ? 'Minimal tanggal setelah tanggal mulai.'
                : ''
            });
          }

          // cek image
          if (result.data.response.data.errors?.image) {
            setForm({
              title: '',
              started_at: '',
              ended_at: '',
              discount_type: 'percent',
              discount: '',
              description: '',
              tac: ''
            });

            setOpenForm(false);

            enqueueSnackbar('Image masih kosong.', { variant: 'error' });
          }
        }
      } else {
        // state
        const {
          title,
          started_at,
          ended_at,
          discount_type,
          discount,
          description,
          tac
        } = form;

        // form-data
        const formdata = new FormData(); // data kosong

        // data terisi berdasarkan name dan value
        formdata.append('title', title);
        formdata.append('started_at', started_at);
        formdata.append('ended_at', ended_at);
        formdata.append('discount_type', discount_type);
        formdata.append('discount', discount);
        formdata.append('description', description);
        formdata.append('tac', tac);

        // services
        const result = await createPromo(formdata).catch(err => err);

        // cek sukses atau tidak
        if (result.success) {
          setOpenForm(false);

          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });

          // read kembali data
          readPromo(false).then(res => {
            setPromos(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          });

          enqueueSnackbar('Berhasil menambah data', {
            variant: 'success'
          });
        } else {
          // cek validasi errors
          if (
            result.data.response.data.errors?.title ||
            result.data.response.data.errors?.started_at ||
            result.data.response.data.errors?.ended_at
          ) {
            setError({
              ...error,
              title: result.data.response.data.errors?.title
                ? 'Nama tidak boleh ada spasi.'
                : '',
              started_at: result.data.response.data.errors?.started_at
                ? 'Minimal tanggal setelah hari ini.'
                : '',
              ended_at: result.data.response.data.errors?.ended_at
                ? 'Minimal tanggal setelah tanggal mulai.'
                : ''
            });
          }

          // cek image
          if (result.data.response.data.errors?.image) {
            setForm({
              title: '',
              started_at: '',
              ended_at: '',
              discount_type: 'percent',
              discount: '',
              description: '',
              tac: ''
            });

            setOpenForm(false);

            enqueueSnackbar('Image masih kosong.', { variant: 'error' });
          }
        }
      }
    }
  };

  // hapus data
  const onHapus = async () => {
    // services
    const result = await deletePromo(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpenHapus(false);

      // read kembali data
      readPromo(false).then(res => {
        setPromos(res.data.data);
        setCurrentPage(res.data.meta.current_page);
        setLastPage(res.data.meta.last_page);
      });

      enqueueSnackbar('Berhasil menghapus data', {
        variant: 'success'
      });
    } else {
      setOpenHapus(false);

      enqueueSnackbar('Gagal menghapus data', {
        variant: 'error'
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenForm(true)}
          className={classes.formControl}>
          buat promo
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
              readPromo(false, e.target.value).then(res => {
                setPromos(res.data.data);
              });
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
        {promos?.map(data => (
          <Card
            key={data.id}
            style={{ boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)' }}>
            <CardActionArea
              disabled={data.isDeleted}
              onClick={() => {
                setDataDetail(data);
                setOpenDetail(true);
              }}>
              <CardContent>
                <div className={classes.titlePromo}>
                  <span>{data.title}</span>
                </div>
                <div className={classes.wrapperTeks}>
                  <span className={classes.teksPromo}>
                    <span style={{ fontWeight: 'bold' }}>periode promo</span>
                    <span>{dateConverterRes(data.endedAt)}</span>
                  </span>
                  {data.discountType && data.discountType.slug === 'percent' ? (
                    <span className={classes.teksPromo}>
                      <span style={{ fontWeight: 'bold' }}>potongan harga</span>
                      <span>{`${data.discount}${data.discountType.name}`}</span>
                    </span>
                  ) : (
                    <span className={classes.teksPromo}>
                      <span style={{ fontWeight: 'bold' }}>potongan harga</span>
                      <span>{data.discount && currency(data.discount)}</span>
                    </span>
                  )}
                  <span className={classes.teksPromo}>
                    <span style={{ fontWeight: 'bold' }}>item terkait</span>
                    <span>
                      {data.countRelatedProduct + data.countRelatedService}
                    </span>
                  </span>
                </div>
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
                    started_at: dateConverterReq(data.startedAt),
                    ended_at: dateConverterReq(data.endedAt),
                    discount_type: data.discountType && data.discountType.slug,
                    discount: data.discount,
                    description: data.description,
                    tac: data.termAndConditions
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

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) =>
          readPromo(false, '', value).then(res => {
            setPromos(res.data.data);
            setCurrentPage(res.data.meta.current_page);
            setLastPage(res.data.meta.last_page);
          })
        }
      />

      <CompDialog
        open={openDetail}
        close={() => {
          setDataDetail({});
          setOpenDetail(false);
        }}
        title={dataDetail.title}>
        <p className={classes.nama}>{dataDetail.description}</p>
        <div className={classes.desk}>
          <span className={classes.teks}>Periode Promo</span>
          <span className={classes.teks}>{`${dateConverterRes(
            dataDetail.startedAt
          )} - ${dateConverterRes(dataDetail.endedAt)}`}</span>
        </div>
        {dataDetail.discountType &&
        dataDetail.discountType.slug === 'percent' ? (
          <div className={classes.desk}>
            <span className={classes.teks}>Potongan Harga</span>
            <span className={classes.teks}>
              {`${dataDetail.discount}${dataDetail.discountType.name}`}
            </span>
          </div>
        ) : (
          <div className={classes.desk}>
            <span className={classes.teks}>Potongan Harga</span>
            <span className={classes.teks}>
              {currency(dataDetail.discount)}
            </span>
          </div>
        )}
        <div className={classes.desk}>
          <span className={classes.teks}>Produk Terkait</span>
          <span className={classes.teks}>
            {dataDetail.countRelatedProduct} |
            <span
              className={classes.cekTerkait}
              onClick={() => {
                detailPromoProduct(dataDetail.id)
                  .then(res => {
                    setDataID(dataDetail.id);
                    setDataDari('promo-produk');
                    setDataTerkait(res.data);
                    history.replace('/produk-terkait');
                  })
                  .catch(err => err);
              }}>
              cek
            </span>
          </span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Jasa Terkait</span>
          <span className={classes.teks}>
            {dataDetail.countRelatedService} |
            <span
              className={classes.cekTerkait}
              onClick={() => {
                detailPromoService(dataDetail.id)
                  .then(res => {
                    setDataID(dataDetail.id);
                    setDataDari('promo-jasa');
                    setDataTerkait(res.data);
                    history.replace('/produk-terkait');
                  })
                  .catch(err => err);
              }}>
              cek
            </span>
          </span>
        </div>
        <div className={classes.garis}></div>
        <label className={classes.label}>syarat & ketentuan</label>
        <p className={classes.teksSyaratDanKetentuan}>
          {dataDetail.termAndConditions}
        </p>
      </CompDialog>

      <CompDialog
        open={openForm}
        close={() => {
          setIsEdit(false);
          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });
          setOpenForm(false);
        }}
        title="Form Promo">
        <div className={classes.form}>
          <InputLabel htmlFor="title" error={error.title ? true : false}>
            Nama Promo
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              id="title"
              name="title"
              color="primary"
              onChange={handleChange}
              value={form.title}
              error={error.title ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.title}>
              {error.title}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="started_at"
            error={error.started_at ? true : false}>
            Tanggal Mulai
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type="date"
              name="started_at"
              id="started_at"
              color="primary"
              onChange={handleChange}
              value={form.started_at}
              error={error.started_at ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.started_at}>
              {error.started_at}
            </FormHelperText>
          </FormControl>

          <InputLabel htmlFor="ended_at" error={error.ended_at ? true : false}>
            Tanggal Berakhir
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type="date"
              name="ended_at"
              id="ended_at"
              color="primary"
              onChange={handleChange}
              value={form.ended_at}
              error={error.ended_at ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.ended_at}>
              {error.ended_at}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="discount_type"
            error={error.discount_type ? true : false}>
            Potongan Harga
          </InputLabel>

          <FormControl component="fieldset" style={{ marginBottom: -15 }}>
            <RadioGroup
              row
              aria-label="discount_type"
              name="discount_type"
              value={form.discount_type}
              onChange={handleChange}>
              <FormControlLabel
                value="percent"
                control={<Radio color="primary" />}
                label="%"
              />
              <FormControlLabel
                value="amount"
                control={<Radio color="primary" />}
                label="Rp."
              />
            </RadioGroup>
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type="number"
              name="discount"
              id="discount"
              color="primary"
              onChange={handleChange}
              value={form.discount}
              error={error.discount ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.discount}>
              {error.discount}
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
              onChange={handleChange}
              value={form.description}
              error={error.description ? true : false}
              multiline
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
              onChange={handleChange}
              value={form.tac}
              error={error.tac ? true : false}
              multiline
            />
            <FormHelperText id="outlined-helper-text" error={error.tac}>
              {error.tac}
            </FormHelperText>
          </FormControl>

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
        title="Hapus Promo"
        close={() => setOpenHapus(false)}
        submit={onHapus}>
        Yakin ingin menghapus?
      </ConfirmDialog>
    </div>
  );
}

Promo.propTypes = {
  setDataID: propTypes.func,
  setDataDari: propTypes.func,
  setDataTerkait: propTypes.func
};

const mapDispatchToProps = dispatch => ({
  setDataID: value => dispatch(setID(value)),
  setDataDari: value => dispatch(setDari(value)),
  setDataTerkait: value => dispatch(setTerkait(value))
});

export default connect(null, mapDispatchToProps)(Promo);
