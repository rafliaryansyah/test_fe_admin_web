import { useState } from 'react';
import useStyles from './styles';

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
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent
} from '@material-ui/core';

// material-ui icons
import { Search, Delete, Edit } from '@material-ui/icons';

// components
import { Paginasi, CompDialog, ConfirmDialog } from '../../../components';

function Promo({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    form: false,
    hapus: false
  });

  const [form, setForm] = useState({
    nama_promo: '',
    periode_promo: '',
    potongan_harga: '',
    deskripsi: '',
    syarat_ketentuan: ''
  });
  const [error, setError] = useState({
    nama_promo: '',
    periode_promo: '',
    potongan_harga: '',
    deskripsi: '',
    syarat_ketentuan: ''
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

    if (!form.nama_promo) {
      newError.nama_promo = 'Field masih kosong';
    }

    if (!form.periode_promo) {
      newError.periode_promo = 'Field masih kosong';
    }

    if (!form.potongan_harga) {
      newError.potongan_harga = 'Field masih kosong';
    }

    if (!form.deskripsi) {
      newError.deskripsi = 'Field masih kosong';
    }

    if (!form.syarat_ketentuan) {
      newError.syarat_ketentuan = 'Field masih kosong';
    }

    return newError;
  };

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      setForm({
        nama_promo: '',
        periode_promo: '',
        potongan_harga: '',
        deskripsi: '',
        syarat_ketentuan: ''
      });
      setOpen({ ...open, form: false });
      enqueueSnackbar('Berhasil menambahkan voucher baru', {
        variant: 'success'
      });
    }
  };

  const handleHapus = () => {};

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
        <Card>
          <CardActionArea onClick={() => setOpen({ ...open, detail: true })}>
            <CardContent>
              <div className={classes.titlePromo}>
                <span>akhirtahun</span>
              </div>
              <div className={classes.wrapperTeks}>
                <span className={classes.teksPromo}>
                  periode promo: Jumat, 05/Feb/2021
                </span>
                <span className={classes.teksPromo}>
                  potongan harga: Rp10.000
                </span>
                <span className={classes.teksPromo}>produk terkait: 100</span>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.action}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpen({ ...open, form: true })}>
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

        <Card>
          <CardActionArea onClick={() => setOpen({ ...open, detail: true })}>
            <CardContent>
              <div className={classes.titlePromo}>
                <span>akhirtahun</span>
              </div>
              <div className={classes.wrapperTeks}>
                <span className={classes.teksPromo}>
                  periode promo: Jumat, 05/Feb/2021
                </span>
                <span className={classes.teksPromo}>
                  potongan harga: Rp10.000
                </span>
                <span className={classes.teksPromo}>produk terkait: 100</span>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.action}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpen({ ...open, form: true })}>
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

        <Card>
          <CardActionArea onClick={() => setOpen({ ...open, detail: true })}>
            <CardContent>
              <div className={classes.titlePromo}>
                <span>akhirtahun</span>
              </div>
              <div className={classes.wrapperTeks}>
                <span className={classes.teksPromo}>
                  periode promo: Jumat, 05/Feb/2021
                </span>
                <span className={classes.teksPromo}>
                  potongan harga: Rp10.000
                </span>
                <span className={classes.teksPromo}>produk terkait: 100</span>
              </div>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.action}>
            <IconButton
              size="small"
              color="primary"
              onClick={() => setOpen({ ...open, form: true })}>
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

      <Paginasi count={5} page={1} onClick={(e, value) => value} />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}
        title="AKHIRTAHUN">
        <p className={classes.nama}>
          Potongan harga Rp50.000 untuk semua produk
        </p>
        <div className={classes.desk}>
          <span className={classes.teks}>Periode Promo</span>
          <span className={classes.teks}>Jumat, 05/Feb/2021</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Potongan Harga</span>
          <span className={classes.teks}>Rp10.000</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Status</span>
          <span className={classes.teks}>Aktif</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Produk Terkait</span>
          <span className={classes.teks}>100</span>
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
          <InputLabel
            htmlFor="nama_promo"
            error={error.nama_promo ? true : false}>
            Nama Promo
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="nama_promo"
              id="nama_promo"
              color="primary"
              onChange={handleChange}
              value={form.nama_promo}
              error={error.nama_promo ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.nama_promo}>
              {error.nama_promo}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="periode_promo"
            error={error.periode_promo ? true : false}>
            Periode Promo
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type="date"
              name="periode_promo"
              id="periode_promo"
              color="primary"
              onChange={handleChange}
              value={form.periode_promo}
              error={error.periode_promo ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.periode_promo}>
              {error.periode_promo}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="potongan_harga"
            error={error.potongan_harga ? true : false}>
            Potongan Harga
          </InputLabel>

          <FormControl component="fieldset" className={classes.jenisKelamin}>
            <RadioGroup
              row
              aria-label="pilih_format"
              name="pilih_format"
              value={form.pilih_format}
              onChange={handleChange}>
              <FormControlLabel
                value="%"
                control={<Radio color="primary" />}
                label="%"
              />
              <FormControlLabel
                value="rupiah"
                control={<Radio color="primary" />}
                label="Rupiah"
              />
            </RadioGroup>
          </FormControl>

          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="potongan_harga"
              id="potongan_harga"
              color="primary"
              onChange={handleChange}
              value={form.potongan_harga}
              error={error.potongan_harga ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.potongan_harga}>
              {error.potongan_harga}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="deskripsi"
            error={error.deskripsi ? true : false}>
            Deskripsi
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="deskripsi"
              id="deskripsi"
              color="primary"
              onChange={handleChange}
              value={form.deskripsi}
              error={error.deskripsi ? true : false}
              multiline
            />
            <FormHelperText id="outlined-helper-text" error={error.deskripsi}>
              {error.deskripsi}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="syarat_ketentuan"
            error={error.syarat_ketentuan ? true : false}>
            Syarat Ketentuan
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="syarat_ketentuan"
              id="syarat_ketentuan"
              color="primary"
              onChange={handleChange}
              value={form.syarat_ketentuan}
              error={error.syarat_ketentuan ? true : false}
              multiline
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.syarat_ketentuan}>
              {error.syarat_ketentuan}
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
        submit={handleHapus}>
        Yakin ingin menghapus promo ?
      </ConfirmDialog>
    </div>
  );
}

export default Promo;
