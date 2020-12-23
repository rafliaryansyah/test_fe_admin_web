import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// react redux
import { connect } from 'react-redux';
import { setLoadingApp } from 'modules';

// services
import { login } from 'services';

// notistack
import { useSnackbar } from 'notistack';

// validator
import isEmail from 'validator/lib/isEmail';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

// material-ui icons
import { Visibility, VisibilityOff } from '@material-ui/icons';

// components
import { LoadingApp } from 'components';

function Login({ requestLoadingApp, loadingApp }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);

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

    if (!form.email) {
      newError.email = 'Field masih kosong';
    } else if (!isEmail(form.email)) {
      newError.email = 'Format Email salah';
    }

    if (!form.password) {
      newError.password = 'Field masih kosong';
    } else if (form.password.length < 6) {
      newError.password = 'Password minimal 6';
    }

    return newError;
  };

  if (loadingApp) {
    return <LoadingApp />;
  }

  if (JSON.parse(localStorage.getItem('token'))) {
    const RedirectTo =
      location.state && location.state.from && location.state.from.pathname
        ? location.state.from.pathname
        : '/';

    return <Redirect to={RedirectTo} />;
  }

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      requestLoadingApp(true);
      const result = await login(form).catch(err => err);

      if (result.success) {
        requestLoadingApp(false);
        enqueueSnackbar('Selamat datang di Grocery Admin App', {
          variant: 'success'
        });
      } else {
        requestLoadingApp(false);
        if (result.data.response.data.code === 400) {
          enqueueSnackbar('Email atau Password anda salah', {
            variant: 'error'
          });
        }
      }
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={submit} className={classes.form}>
        <p className={classes.title}>grocery web admin</p>
        <InputLabel
          htmlFor="email"
          error={error.email ? true : false}
          className={classes.label}>
          Email
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            onChange={handleChange}
            value={form.email}
            error={error.email ? true : false}
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.email ? true : false}>
            {error.email}
          </FormHelperText>
        </FormControl>

        <InputLabel
          htmlFor="password"
          error={error.password ? true : false}
          className={classes.label}>
          Password
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
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
                  onMouseDown={e => e.preventDefault()}
                  edge="end">
                  {showPassword ? (
                    <Visibility color="primary" />
                  ) : (
                    <VisibilityOff color="primary" />
                  )}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            aria-describedby="outlined-helper-text"
          />
          <FormHelperText
            id="outlined-helper-text"
            error={error.password ? true : false}>
            {error.password}
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          className={classes.button}>
          login
        </Button>
      </form>
    </div>
  );
}

Login.propTypes = {
  requestLoadingApp: propTypes.func,
  loadingApp: propTypes.bool
};

const mapStateToProps = state => ({
  loadingApp: state.global.loadingApp
});

const mapDispatchToProps = dispatch => ({
  requestLoadingApp: value => dispatch(setLoadingApp(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
