import { useState } from 'react';
import useStyles from './styles';

// validator (isEmail)
import isEmail from 'validator/lib/isEmail';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

// pages
import ChangePassword from './ChangePassword';

function Profile() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isActiveForm, setIsActiveForm] = useState(false);
  const [open, setOpen] = useState(false);

  const [roles, setRoles] = useState({
    customer: true,
    admin: true
  });

  const [form, setForm] = useState({
    src_avatar: '',
    firts_name: '',
    last_name: '',
    date: '',
    jenis_kelamin: 'pria',
    email: '',
    telepon: ''
  });
  const [error, setError] = useState({
    src_avatar: '',
    firts_name: '',
    last_name: '',
    date: '',
    jenis_kelamin: '',
    email: '',
    telepon: ''
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

    if (!form.firts_name) {
      newError.firts_name = 'Field masih kosong';
    }

    if (!form.last_name) {
      newError.last_name = 'Field masih kosong';
    }

    if (!form.date) {
      newError.date = 'Field masih kosong';
    }

    if (!form.email) {
      newError.email = 'Field masih kosong';
    } else if (!isEmail(form.email)) {
      newError.email = 'Format email salah';
    }

    if (!form.telepon) {
      newError.telepon = 'Field masih kosong';
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
        src_avatar: '',
        firts_name: '',
        last_name: '',
        date: '',
        jenis_kelamin: '',
        email: '',
        telepon: ''
      });
      enqueueSnackbar('Berhasil memperbarui profile anda', {
        variant: 'success'
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.itemFotoDanRoles}>
        <div className={classes.wrapperImage}>
          <img
            src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
            alt="foto"
            className={classes.img}
          />
          <input type="file" id="upload" style={{ display: 'none' }} />
          {isActiveForm && (
            <label htmlFor="upload" className={classes.upload}>
              <span className={classes.textUpload}>upload</span>
            </label>
          )}
        </div>
        <div className={classes.roles}>
          <p className={classes.title}>roles :</p>
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.customer}
                onChange={e =>
                  setRoles({ ...roles, [e.target.name]: e.target.checked })
                }
                name="customer"
                color="primary"
              />
            }
            label="Customer"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={roles.admin}
                onChange={e =>
                  setRoles({ ...roles, [e.target.name]: e.target.checked })
                }
                name="admin"
                color="primary"
              />
            }
            label="Admin"
          />
        </div>
      </div>

      <div className={classes.wrapperInfo}>
        <InputLabel
          htmlFor="firts_name"
          error={error.firts_name ? true : false}>
          Firts Name
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="firts_name"
            id="firts_name"
            color="primary"
            onChange={handleChange}
            value={form.firts_name}
            error={error.firts_name ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText id="outlined-helper-text" error={error.firts_name}>
            {error.firts_name}
          </FormHelperText>
        </FormControl>

        <InputLabel htmlFor="last_name" error={error.last_name ? true : false}>
          Last Name
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="last_name"
            id="last_name"
            color="primary"
            onChange={handleChange}
            value={form.last_name}
            error={error.last_name ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText id="outlined-helper-text" error={error.last_name}>
            {error.last_name}
          </FormHelperText>
        </FormControl>

        <InputLabel htmlFor="date" error={error.date ? true : false}>
          Tangal Lahir
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            type="date"
            name="date"
            id="date"
            color="primary"
            onChange={handleChange}
            value={form.date}
            error={error.date ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText id="outlined-helper-text" error={error.date}>
            {error.date}
          </FormHelperText>
        </FormControl>

        <FormControl component="fieldset" className={classes.jenisKelamin}>
          <FormLabel
            component="legend"
            error={error.jenis_kelamin ? true : false}>
            Jenis Kelamin
          </FormLabel>
          <RadioGroup
            row
            aria-label="jenis_kelamin"
            name="jenis_kelamin"
            value={form.jenis_kelamin}
            onChange={handleChange}>
            <FormControlLabel
              value="pria"
              control={<Radio color="primary" />}
              label="Pria"
              disabled={isActiveForm ? false : true}
            />
            <FormControlLabel
              value="perempuan"
              control={<Radio color="primary" />}
              label="Perempuan"
              disabled={isActiveForm ? false : true}
            />
          </RadioGroup>
        </FormControl>

        <InputLabel htmlFor="email" error={error.email ? true : false}>
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
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText id="outlined-helper-text" error={error.email}>
            {error.email}
          </FormHelperText>
        </FormControl>

        <InputLabel htmlFor="telepon" error={error.telepon ? true : false}>
          Nomor Telepon
        </InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="telepon"
            id="telepon"
            color="primary"
            onChange={handleChange}
            value={form.telepon}
            error={error.telepon ? true : false}
            disabled={isActiveForm ? false : true}
          />
          <FormHelperText id="outlined-helper-text" error={error.telepon}>
            {error.telepon}
          </FormHelperText>
        </FormControl>

        {isActiveForm ? (
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={submit}>
              simpan
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
                setForm({
                  src_avatar: '',
                  firts_name: '',
                  last_name: '',
                  date: '',
                  jenis_kelamin: '',
                  email: '',
                  telepon: ''
                });
                setError({
                  src_avatar: '',
                  firts_name: '',
                  last_name: '',
                  date: '',
                  jenis_kelamin: '',
                  email: '',
                  telepon: ''
                });
                setIsActiveForm(false);
              }}>
              batal
            </Button>
          </div>
        ) : (
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setIsActiveForm(true)}>
              mode edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpen(true)}>
              ubah password
            </Button>
          </div>
        )}
      </div>
      <ChangePassword open={open} close={() => setOpen(false)} />
    </div>
  );
}

export default Profile;
