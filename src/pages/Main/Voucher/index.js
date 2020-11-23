import { useState } from "react";
import useStyles from "./styles";

// notistack
import { useSnackbar } from "notistack";

// material-ui core
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// material-ui icons
import SearchIcon from "@material-ui/icons/Search";

// components
import Paginasi from "../../../components/Paginasi";
import DetailDialog from "../../../components/DetailDialog";

function Voucher({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    form: false,
  });

  const [form, setForm] = useState({
    nama: "",
    berlaku_hingga: "",
    minimum_transaksi: "",
    potongan_harga: "",
    deskripsi: "",
    status: "",
  });
  const [error, setError] = useState({
    nama: "",
    berlaku_hingga: "",
    minimum_transaksi: "",
    potongan_harga: "",
    deskripsi: "",
    status: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newError = { ...error };

    if (!form.nama) {
      newError.nama = "Field masih kosong";
    }

    if (!form.berlaku_hingga) {
      newError.berlaku_hingga = "Field masih kosong";
    }

    if (!form.minimum_transaksi) {
      newError.minimum_transaksi = "Field masih kosong";
    }

    if (!form.potongan_harga) {
      newError.potongan_harga = "Field masih kosong";
    }

    if (!form.deskripsi) {
      newError.deskripsi = "Field masih kosong";
    }

    if (!form.status) {
      newError.status = "Field masih kosong";
    }

    return newError;
  };

  const submit = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      setForm({
        nama: "",
        berlaku_hingga: "",
        minimum_transaksi: "",
        potongan_harga: "",
        deskripsi: "",
        status: "",
      });
      setOpen({ ...open, form: false });
      enqueueSnackbar("Berhasil menambahkan voucher baru", {
        variant: "success",
      });
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
              form: true,
            })
          }
        >
          tambah voucher
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.wrapperTable}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>No</th>
              <th className={classes.th}>Banner</th>
              <th className={classes.th}>Nama</th>
              <th className={classes.th}>Berlaku Hingga</th>
              <th className={classes.th}>Minimum Transaksi</th>
              <th className={classes.th}>Potongan Harga</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => setOpen({ ...open, detail: true })}
              className={classes.tr}
            >
              <td className={classes.td}>1</td>
              <td className={classes.td}>
                <img
                  src="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
                  alt=""
                  className={classes.banner}
                />
              </td>
              <td className={classes.td}>AKHIRTAHUN</td>
              <td className={classes.td}>Jumat, 05/Februari/2021</td>
              <td className={classes.td}>Rp 10.000</td>
              <td className={classes.td}>Rp 50.000</td>
              <td className={classes.td}>Aktif</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Paginasi count={5} page={1} onClick={() => console.log("click")} />
      <DetailDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}
        title="AKHIRTAHUN"
      >
        <img
          src="https://ecs7.tokopedia.net/img/blog/seller/2020/04/voucher-toko.jpg"
          alt="avatar"
          className={classes.img}
        />
        <p className={classes.nama}>
          Potongan harga Rp50.000 untuk semua produk
        </p>
        <div className={classes.desk}>
          <span className={classes.teks}>Berlaku hingga</span>
          <span className={classes.teks}>Jumat, 05/Feb/2021</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Minimum transaksi</span>
          <span className={classes.teks}>Rp10.000</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Potongan Harga</span>
          <span className={classes.teks}>Rp50.000</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>Status</span>
          <span className={classes.teks}>Aktif</span>
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
      </DetailDialog>
      <DetailDialog
        open={open.form}
        close={() => setOpen({ ...open, form: false })}
        title="Form Tambah"
      >
        <div className={classes.form}>
          <InputLabel htmlFor="nama" error={error.nama ? true : false}>
            Nama
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="nama"
              id="nama"
              color="primary"
              onChange={handleChange}
              value={form.nama}
              error={error.nama ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.nama}>
              {error.nama}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="berlaku_hingga"
            error={error.berlaku_hingga ? true : false}
          >
            Berlaku Hingga
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="berlaku_hingga"
              id="berlaku_hingga"
              color="primary"
              onChange={handleChange}
              value={form.berlaku_hingga}
              error={error.berlaku_hingga ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.berlaku_hingga}
            >
              {error.berlaku_hingga}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="minimum_transaksi"
            error={error.minimum_transaksi ? true : false}
          >
            Minimum Transaksi
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="minimum_transaksi"
              id="minimum_transaksi"
              color="primary"
              onChange={handleChange}
              value={form.minimum_transaksi}
              error={error.minimum_transaksi ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.minimum_transaksi}
            >
              {error.minimum_transaksi}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="potongan_harga"
            error={error.potongan_harga ? true : false}
          >
            Potongan Harga
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
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
              error={error.potongan_harga}
            >
              {error.potongan_harga}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="deskripsi"
            error={error.deskripsi ? true : false}
          >
            Deskripsi
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
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

          <div className={classes.select}>
            <InputLabel htmlFor="status" error={error.status ? true : false}>
              Status
            </InputLabel>
            <FormControl variant="outlined" size="small" margin="normal">
              <Select
                name="status"
                id="status"
                value={form.status}
                onChange={handleChange}
                error={error.status ? true : false}
              >
                <MenuItem value="Aktif">Aktif</MenuItem>
                <MenuItem value="Tidak Aktif">Tidak Aktif</MenuItem>
              </Select>
              <FormHelperText id="outlined-helper-text" error={error.status}>
                {error.status}
              </FormHelperText>
            </FormControl>
          </div>

          <Button
            variant="contained"
            color="primary"
            size="small"
            fullWidth
            onClick={submit}
          >
            Tambah
          </Button>
        </div>
      </DetailDialog>
    </div>
  );
}

export default Voucher;
