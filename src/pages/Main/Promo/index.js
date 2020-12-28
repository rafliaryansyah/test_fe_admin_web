import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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

// material-ui icons
import { Search, Delete, Edit } from '@material-ui/icons';

// components
import { Paginasi, CompDialog, ConfirmDialog } from 'components';

// services
import { createPromo, readPromo, updatePromo, deletePromo } from 'services';

// redux
import { connect } from 'react-redux';
import { setPromos } from 'modules';

// utils
import { currency, dateConverterReq, dateConverterRes } from 'utils';

function Promo({ setDataPromos, dataPromos }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    form: false,
    hapus: false
  });

  const [id, setID] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  const [dataDetail, setDataDetail] = useState({});

  const [form, setForm] = useState({
    title: '',
    started_at: '',
    ended_at: '',
    discount_type: 'percent',
    discount: '',
    description: '',
    tac: ''
  });

  const [error, setError] = useState({
    title: '',
    started_at: '',
    ended_at: '',
    discount_type: '',
    discount: '',
    description: '',
    tac: ''
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

  // proses merender untuk read data
  useEffect(() => {
    readPromo()
      .then(res => setDataPromos(res.data.data))
      .catch(err => err);
  }, []);

  // tambah atau edit data
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
          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Berhasil memperbarui promo', {
            variant: 'success'
          });

          // read kembali data
          setTimeout(() => {
            readPromo()
              .then(res => setDataPromos(res.data.data))
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Gagal memperbarui promo', {
            variant: 'error'
          });
        }
      } else {
        // tambah data

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
          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Berhasil menambahkan promo baru', {
            variant: 'success'
          });

          // read kembali data
          setTimeout(() => {
            readPromo()
              .then(res => setDataPromos(res.data.data))
              .catch(err => err);
          }, 5000);
        } else {
          setForm({
            title: '',
            started_at: '',
            ended_at: '',
            discount_type: 'percent',
            discount: '',
            description: '',
            tac: ''
          });
          setOpen({ ...open, form: false });
          enqueueSnackbar('Gagal menambahkan promo baru', {
            variant: 'error'
          });
        }
      }
    }
  };

  // hapus data
  const hapus = async () => {
    // services
    const result = await deletePromo(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpen({ ...open, form: false });
      enqueueSnackbar('Berhasil menghapus promo', {
        variant: 'success'
      });

      // read kembali data
      setTimeout(() => {
        readPromo()
          .then(res => setDataPromos(res.data.data))
          .catch(err => err);
      }, 5000);
    } else {
      setOpen({ ...open, form: false });
      enqueueSnackbar('Gagal menghapus promo', {
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
          onClick={() =>
            setOpen({
              ...open,
              form: true
            })
          }>
          buat promo
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.main}>
        {dataPromos &&
          dataPromos.map(data => (
            <Card key={data.id}>
              <CardActionArea
                onClick={() => {
                  setDataDetail(data);
                  setOpen({ ...open, detail: true });
                }}>
                <CardContent>
                  <div className={classes.titlePromo}>
                    <span>{data.title}</span>
                  </div>
                  <div className={classes.wrapperTeks}>
                    <span className={classes.teksPromo}>
                      periode promo:
                      {`${dateConverterRes(
                        data.startedAt
                      )} - ${dateConverterRes(data.endedAt)}`}
                    </span>
                    {data.discountType &&
                    data.discountType.slug === 'percent' ? (
                      <span className={classes.teksPromo}>
                        potongan harga:
                        {`${data.discount}${data.discountType.name}`}
                      </span>
                    ) : (
                      <span className={classes.teksPromo}>
                        potongan harga:
                        {currency(data.discount)}
                      </span>
                    )}
                    <span className={classes.teksPromo}>
                      produk terkait: {data.countRelatedProduct}
                    </span>
                  </div>
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
                      title: data.title,
                      started_at: dateConverterReq(data.startedAt),
                      ended_at: dateConverterReq(data.endedAt),
                      discount_type:
                        data.discountType && data.discountType.slug,
                      discount: data.discount,
                      description: data.description,
                      tac: data.termAndConditions
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

      <Paginasi count={5} page={1} onClick={(e, value) => value} />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}
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
          <span className={classes.teks}>{dataDetail.countRelatedProduct}</span>
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
        close={() => setOpen({ ...open, form: false })}
        title="Form Voucher">
        <div className={classes.form}>
          <InputLabel htmlFor="title" error={error.title ? true : false}>
            Title
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
            Tipe Diskon
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
            description
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
            onClick={submit}>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={open.hapus}
        title="Hapus Promo"
        close={() => setOpen({ ...open, hapus: false })}
        submit={hapus}>
        Yakin ingin menghapus promo ?
      </ConfirmDialog>
    </div>
  );
}

Promo.propTypes = {
  setDataPromos: propTypes.func,
  dataPromos: propTypes.array
};

const mapStateToProps = state => ({
  dataPromos: state.promo.promos
});

const mapDispatchToProps = dispatch => ({
  setDataPromos: value => dispatch(setPromos(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Promo);
