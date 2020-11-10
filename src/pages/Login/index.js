import { useState } from "react";
import useStyles from "./styles";

// validator
import isEmail from "validator/lib/isEmail";

// material-ui core
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

// material-ui icons
import { Visibility, VisibilityOff } from "@material-ui/icons";

function Login() {
  const classes = useStyles();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

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

    if (!form.email) {
      newError.email = "Email tidak boleh kosong";
    } else if (isEmail(form.email)) {
      newError.email = "Format Email salah";
    }

    if (!form.password) {
      newError.password = "Password tidak boleh kosong";
    } else if (form.password <= 6) {
      newError.password = "Password minimal 6";
    }

    return newError;
  };

  const submit = async (e) => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some((err) => err !== "")) {
      setError(findErrors);
    } else {
      console.log("Submit : ", form);
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={submit} className={classes.form}>
        <p className={classes.title}>ecommerce admin</p>
        <InputLabel
          htmlFor="email"
          error={error.email ? true : false}
          className={classes.label}
        >
          Email
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="email"
            id="email"
            color="secondary"
            onChange={handleChange}
            value={form.email}
            error={error.email ? true : false}
          />
          <FormHelperText id="outlined-helper-text" error={error.email}>
            {error.email}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="password"
          error={error.password ? true : false}
          className={classes.label}
        >
          Password
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            onChange={handleChange}
            value={form.password}
            error={error.password ? true : false}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showPassword ? (
                    <Visibility color="secondary" />
                  ) : (
                    <VisibilityOff color="secondary" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            color="secondary"
            aria-describedby="outlined-helper-text"
          />
          <FormHelperText id="outlined-helper-text" error={error.password}>
            {error.password}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          className={classes.button}
        >
          login
        </Button>
      </form>
    </div>
  );
}

export default Login;
