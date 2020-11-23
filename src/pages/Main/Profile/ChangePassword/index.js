import { useState } from "react";
import useStyles from "./styles";

// notistack
import { useSnackbar } from "notistack";

// material-ui core
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Button from "@material-ui/core/Button";

function ChangePassword() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
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

    if (!form.old_password) {
      newError.old_password = "Field masih kosong";
    }

    if (!form.new_password) {
      newError.new_password = "Field masih kosong";
    }

    if (!form.confirm_password) {
      newError.confirm_password = "Field masih kosong";
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
        old_password: "",
        new_password: "",
        confirm_password: "",
      });
      enqueueSnackbar("Berhasil memperbarui password anda", {
        variant: "success",
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <InputLabel
        htmlFor="old_password"
        error={error.old_password ? true : false}
      >
        Password Lama
      </InputLabel>
      <FormControl variant="outlined" size="small" margin="normal" fullWidth>
        <OutlinedInput
          name="old_password"
          id="old_password"
          color="primary"
          onChange={handleChange}
          value={form.old_password}
          error={error.old_password ? true : false}
        />
        <FormHelperText id="outlined-helper-text" error={error.old_password}>
          {error.old_password}
        </FormHelperText>
      </FormControl>

      <InputLabel
        htmlFor="new_password"
        error={error.new_password ? true : false}
      >
        Password Baru
      </InputLabel>
      <FormControl variant="outlined" size="small" margin="normal" fullWidth>
        <OutlinedInput
          name="new_password"
          id="new_password"
          color="primary"
          onChange={handleChange}
          value={form.new_password}
          error={error.new_password ? true : false}
        />
        <FormHelperText id="outlined-helper-text" error={error.new_password}>
          {error.new_password}
        </FormHelperText>
      </FormControl>

      <InputLabel
        htmlFor="confirm_password"
        error={error.confirm_password ? true : false}
      >
        Konfirmasi Password Baru
      </InputLabel>
      <FormControl variant="outlined" size="small" margin="normal" fullWidth>
        <OutlinedInput
          name="confirm_password"
          id="confirm_password"
          color="primary"
          onChange={handleChange}
          value={form.confirm_password}
          error={error.confirm_password ? true : false}
        />
        <FormHelperText
          id="outlined-helper-text"
          error={error.confirm_password}
        >
          {error.confirm_password}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={submit}
        disabled={
          form.old_password && form.new_password && form.confirm_password
            ? false
            : true
        }
      >
        simpan
      </Button>
    </div>
  );
}

export default ChangePassword;
