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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

// material-ui icons
import CloseIcon from '@material-ui/icons/Close';

function ChangePassword({ open, close }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

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
      setForm({
        email: '',
        old_password: '',
        new_password: '',
        confirm_password: ''
      });
      enqueueSnackbar('Berhasil memperbarui password anda', {
        variant: 'success'
      });
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
          <CloseIcon />
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
            error={error.old_password ? true : false}>
            Password Lama
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="old_password"
              id="old_password"
              color="primary"
              onChange={handleChange}
              value={form.old_password}
              error={error.old_password ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.old_password}>
              {error.old_password}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="new_password"
            error={error.new_password ? true : false}>
            Password Baru
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="new_password"
              id="new_password"
              color="primary"
              onChange={handleChange}
              value={form.new_password}
              error={error.new_password ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.new_password}>
              {error.new_password}
            </FormHelperText>
          </FormControl>

          <InputLabel
            htmlFor="confirm_password"
            error={error.confirm_password ? true : false}>
            Konfirmasi Password Baru
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
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
              error={error.confirm_password}>
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
