import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// validator (isEmail)
import isEmail from 'validator/lib/isEmail';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// react icons
import { IoCloseOutline, IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';

// services
import { changePasswordProfile } from 'services';

function ChangePassword({ open, close, history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data tampilkan teks password
  const [showPassword, setShowPassword] = useState(false);

  // data form
  const [form, setForm] = useState({
    email: '',
    old_password: '',
    new_password: '',
    confirm_password: ''
  });

  const [error, setError] = useState({
    email: '',
    old_password: '',
    new_password: '',
    confirm_password: ''
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

  // validasi form
  const validate = () => {
    const newError = { ...error };

    if (!form.email) {
      newError.email = 'Field masih kosong';
    } else if (!isEmail(form.email)) {
      newError.email = 'Format email salah';
    }

    if (!form.old_password) {
      newError.old_password = 'Field masih kosong';
    } else if (form.old_password.length < 6) {
      newError.old_password = 'Password minimal 6 digit';
    }

    if (!form.new_password) {
      newError.new_password = 'Field masih kosong';
    } else if (form.new_password.length < 6) {
      newError.new_password = 'Password minimal 6 digit';
    } else if (form.new_password === form.old_password) {
      newError.new_password = 'Password tidak boleh sama dengan yang lama';
    }

    if (!form.confirm_password) {
      newError.confirm_password = 'Field masih kosong';
    } else if (form.confirm_password.length < 6) {
      newError.confirm_password = 'Password minimal 6 digit';
    } else if (form.confirm_password !== form.new_password) {
      newError.confirm_password = 'Konformasi password salah';
    }

    return newError;
  };

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // services
      const result = await changePasswordProfile(form).catch(err => err);

      // cek sukses atau gagal
      if (result.success) {
        if (result.data.code === 200) {
          setForm({
            email: '',
            old_password: '',
            new_password: '',
            confirm_password: ''
          });

          // close dialog
          close();

          enqueueSnackbar('Berhasil memperbarui password', {
            variant: 'success'
          });

          // history untuk keluar dari app
          history();
        }
      } else {
        // cek validasi dari api
        if (result.data.response.data.code === 422) {
          enqueueSnackbar('Email atau Password lama anda salah', {
            variant: 'error'
          });
        }
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogActions>
        <IconButton onClick={close} color="primary">
          <IoCloseOutline />
        </IconButton>
      </DialogActions>
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Ubah Password
      </DialogTitle>
      <DialogContent>
        <div className={classes.form}>
          <InputLabel htmlFor="email" error={error.email ? true : false}>
            Email
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="email"
              id="email"
              color="primary"
              onChange={handleChange}
              value={form.email}
              error={error.email ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.email}>
              {error.email}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="old_password"
            error={error.old_password ? true : false}
            className={classes.label}>
            Password lama
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              name="old_password"
              id="old_password"
              onChange={handleChange}
              value={form.old_password}
              error={error.old_password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                    edge="end">
                    {showPassword ? (
                      <IoEyeOutline color="primary" />
                    ) : (
                      <IoEyeOffOutline color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              color="primary"
              aria-describedby="outlined-helper-text"
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.old_password ? true : false}>
              {error.old_password}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="new_password"
            error={error.new_password ? true : false}
            className={classes.label}>
            Password baru
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              name="new_password"
              id="new_password"
              onChange={handleChange}
              value={form.new_password}
              error={error.new_password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                    edge="end">
                    {showPassword ? (
                      <IoEyeOutline color="primary" />
                    ) : (
                      <IoEyeOffOutline color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              color="primary"
              aria-describedby="outlined-helper-text"
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.new_password ? true : false}>
              {error.new_password}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="confirm_password"
            error={error.confirm_password ? true : false}
            className={classes.label}>
            Konfirmasi password baru
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
              name="confirm_password"
              id="confirm_password"
              onChange={handleChange}
              value={form.confirm_password}
              error={error.confirm_password ? true : false}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={e => e.preventDefault()}
                    edge="end">
                    {showPassword ? (
                      <IoEyeOutline color="primary" />
                    ) : (
                      <IoEyeOutline color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              color="primary"
              aria-describedby="outlined-helper-text"
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.confirm_password ? true : false}>
              {error.confirm_password}
            </FormHelperText>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={submit}
            disabled={
              form.email &&
              form.old_password &&
              form.new_password &&
              form.confirm_password
                ? false
                : true
            }>
            ubah
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ChangePassword.propTypes = {
  open: propTypes.bool,
  close: propTypes.func
};

export default ChangePassword;
