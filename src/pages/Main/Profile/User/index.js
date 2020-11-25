import { useState } from "react";
import useStyles from "./styles";

// notistack
import { useSnackbar } from "notistack";

// material-ui core
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";

// material-ui icons
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

function User() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isAktif, setIsAktif] = useState(false);

  const [form, setForm] = useState({
    src_avatar: "",
    firts_name: "",
    last_name: "",
    email: "",
  });
  const [error, setError] = useState({
    src_avatar: "",
    firts_name: "",
    last_name: "",
    email: "",
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

    if (!form.firts_name) {
      newError.firts_name = "Field masih kosong";
    }

    if (!form.last_name) {
      newError.last_name = "Field masih kosong";
    }

    if (!form.email) {
      newError.email = "Field masih kosong";
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
        src_avatar: "",
        firts_name: "",
        last_name: "",
        email: "",
      });
      enqueueSnackbar("Berhasil memperbarui profile anda", {
        variant: "success",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitle}>
        <label className={classes.label}>informasi akun</label>
        <div>
          Edit
          <Switch
            checked={isAktif}
            onChange={(e) => {
              setError({
                src_avatar: "",
                firts_name: "",
                last_name: "",
                email: "",
              });
              setIsAktif(e.target.checked);
            }}
            name="is_aktif"
            color="primary"
          />
        </div>
      </div>

      <div className={classes.wrapperInfo}>
        <div className={classes.wrapperImageUpload}>
          <img
            src={
              form.src_avatar
                ? form.src_avatar
                : "https://images.unsplash.com/photo-1605628458120-5e52dd239a14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
            }
            alt="foto"
            className={classes.img}
          />
          <input
            type="file"
            name="src_avatar"
            id="upload"
            value={form.src_avatar}
            onChange={handleChange}
            style={{ display: "none" }}
          />
          {isAktif && (
            <label htmlFor="upload" className={classes.upload}>
              <CloudUploadIcon />
              gambar
            </label>
          )}
        </div>
        <div className={classes.wrapperInput}>
          <InputLabel
            htmlFor="firts_name"
            error={error.firts_name ? true : false}
          >
            Firts Name
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="firts_name"
              id="firts_name"
              color="primary"
              onChange={handleChange}
              value={form.firts_name}
              error={error.firts_name ? true : false}
              disabled={isAktif ? false : true}
            />
            <FormHelperText id="outlined-helper-text" error={error.firts_name}>
              {error.firts_name}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="last_name"
            error={error.last_name ? true : false}
          >
            Last Name
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="last_name"
              id="last_name"
              color="primary"
              onChange={handleChange}
              value={form.last_name}
              error={error.last_name ? true : false}
              disabled={isAktif ? false : true}
            />
            <FormHelperText id="outlined-helper-text" error={error.last_name}>
              {error.last_name}
            </FormHelperText>
          </FormControl>

          <InputLabel htmlFor="email" error={error.email ? true : false}>
            Email
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth
          >
            <OutlinedInput
              name="email"
              id="email"
              color="primary"
              onChange={handleChange}
              value={form.email}
              error={error.email ? true : false}
              disabled={isAktif ? false : true}
            />
            <FormHelperText id="outlined-helper-text" error={error.email}>
              {error.email}
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submit}
            disabled={isAktif ? false : true}
          >
            simpan
          </Button>
        </div>
      </div>
    </div>
  );
}

export default User;
