import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// jwt
import jwt from 'jsonwebtoken';

// react redux
import { connect } from 'react-redux';
import { setLoadingApp } from 'modules';

// services
import { login, logout, getProfile } from 'services';

// notistack
import { useSnackbar } from 'notistack';

// validator
import isEmail from 'validator/lib/isEmail';

// material-ui core
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText,
  InputAdornment,
  IconButton,
  Button
} from '@material-ui/core';

// react icons
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

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
    // decode token
    const decode = jwt.decode(JSON.parse(localStorage.getItem('token')));

    const RedirectTo = location?.state?.from?.pathname
      ? location.state.from.pathname
      : decode.roles?.map(role =>
          role === 'contributor-ecommerce' ? '/user' : '/'
        );

    return <Redirect to={RedirectTo[0]} />;
  }

  // submit untuk login
  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    // cek validasi
    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // loading
      requestLoadingApp(true);

      // service
      const result = await login(form).catch(err => err);

      // cek sukses atau gagal
      if (result.success) {
        // baca data user profile
        const profile = await getProfile().catch(err => err);

        if (profile.success) {
          requestLoadingApp(false);
          // simpan juga data profile ke localStorage

          const user = JSON.stringify({
            name: profile.data.data?.name,
            image: profile.data.data?.image,
            role: profile.data.data?.roles?.[0].name
          });

          localStorage.setItem('user', user);

          // decode token
          const decode = jwt.decode(JSON.parse(localStorage.getItem('token')));

          // cek role
          decode.roles?.map(
            role =>
              (role === 'super-admin-ecommerce' &&
                enqueueSnackbar('Selamat datang Super Admin.', {
                  variant: 'success'
                })) ||
              (role === 'contributor-ecommerce' &&
                enqueueSnackbar('Selamat datang Contributor Admin.', {
                  variant: 'success'
                })) ||
              (role === 'finance-ecommerce' &&
                enqueueSnackbar('Selamat datang Finance Admin.', {
                  variant: 'success'
                }))
          );
        } else {
          // cek unauthentikasi

          if (profile.data.response?.data.code === 401) {
            localStorage.removeItem('token');

            const keluar = await logout().catch(err => err);

            if (keluar.success) {
              enqueueSnackbar('Terima kasih udah masuk.', {
                variant: 'success'
              });
            } else {
              enqueueSnackbar('Terjadi kesalahan.', {
                variant: 'error'
              });
            }

            requestLoadingApp(false);
          }

          // cek user akses

          if (profile.data.response?.data.code === 403) {
            localStorage.removeItem('token');

            enqueueSnackbar('Maaf! Anda tidak memiliki akses untuk masuk.', {
              variant: 'info'
            });

            requestLoadingApp(false);
          }
        }
      } else {
        requestLoadingApp(false);

        if (result.data.response?.data.code === 400) {
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
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
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
