import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';

// pages
import ChangePassword from './ChangePassword';

// services
import { getProfile, editProfile } from 'services';

// formatter
import { dateConverterReq } from 'utils';

function Profile({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [isActiveForm, setIsActiveForm] = useState(false);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    photo: ''
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    getProfile()
      .then(res => {
        setForm({
          ...form,
          name: res.data.data.name,
          dob: dateConverterReq(res.data.data.date_of_birth),
          gender: res.data.data.gender && res.data.data.gender.id.toString(),
          email: res.data.data.email,
          phone: res.data.data.phone
        });
      })
      .catch(err => {
        console.log(err.data);
      });
  }, []);

  const update = async e => {
    e.preventDefault();

    const { name, dob, gender, email, phone, photo } = form;

    console.log(form);

    const result = await editProfile(
      name,
      dob,
      parseInt(gender),
      email,
      phone,
      photo
    ).catch(err => err);

    if (result.success) {
      enqueueSnackbar(result.data.message, {
        variant: 'success'
      });
    } else {
      enqueueSnackbar(result.data.response.data.message, {
        variant: 'error'
      });
    }
  };

  const handleUploadFile = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      enqueueSnackbar(`Tipe file tidak didukung: ${file && file.type}`, {
        variant: 'error'
      });
    } else if (file && file.size >= 2097152) {
      enqueueSnackbar('Ukuran file terlalu besar dari 2 MB', {
        variant: 'error'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        enqueueSnackbar('Proses pembacaan file dibatalkan', {
          variant: 'error'
        });
      };

      reader.onerror = () => {
        enqueueSnackbar('File tidak terbaca', {
          variant: 'error'
        });
      };

      reader.onload = async () => {
        try {
          setForm({
            ...form,
            photo: file
          });
        } catch (e) {
          enqueueSnackbar(e.message, {
            variant: 'error'
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.itemFotoDanRoles}>
        {form.photo ? (
          <img
            src={URL.createObjectURL(form.photo)}
            alt="photo"
            className={classes.photo}
          />
        ) : (
          <div className={classes.wrapperImage}>
            <span className={classes.avatar}>
              {form && form.name.split('')[0]}
            </span>
          </div>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg"
          onChange={handleUploadFile}
          id="upload"
          style={{ display: 'none' }}
        />
        {isActiveForm && (
          <label htmlFor="upload" className={classes.upload}>
            upload
          </label>
        )}
      </div>

      <div className={classes.wrapperInfo}>
        <InputLabel htmlFor="name">Full Name</InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="name"
            id="name"
            color="primary"
            onChange={handleChange}
            value={form.name}
            disabled={isActiveForm ? false : true}
          />
        </FormControl>

        <InputLabel htmlFor="dob">Tangal Lahir</InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            type="date"
            name="dob"
            id="dob"
            color="primary"
            onChange={handleChange}
            value={form.dob}
            disabled={isActiveForm ? false : true}
          />
        </FormControl>

        <FormControl component="fieldset" className={classes.jenisKelamin}>
          <FormLabel component="legend">Jenis Kelamin</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}>
            <FormControlLabel
              value="1"
              control={<Radio color="primary" />}
              label="Pria"
              disabled={isActiveForm ? false : true}
            />
            <FormControlLabel
              value="2"
              control={<Radio color="primary" />}
              label="Perempuan"
              disabled={isActiveForm ? false : true}
            />
          </RadioGroup>
        </FormControl>

        <InputLabel htmlFor="email">Email</InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            onChange={handleChange}
            value={form.email}
            disabled={isActiveForm ? false : true}
          />
        </FormControl>

        <InputLabel htmlFor="phone">Nomor Telepon</InputLabel>
        <FormControl variant="outlined" size="small" margin="normal" fullWidth>
          <OutlinedInput
            type="number"
            name="phone"
            id="phone"
            color="primary"
            onChange={handleChange}
            value={form.phone}
            disabled={isActiveForm ? false : true}
          />
        </FormControl>

        {isActiveForm ? (
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={update}>
              simpan
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => {
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
      <ChangePassword
        open={open}
        close={() => setOpen(false)}
        history={() => {
          localStorage.removeItem('token');
          history.push('/login');
        }}
      />
    </div>
  );
}

Profile.propTypes = {
  setDataProfile: propTypes.func,
  dataProfile: propTypes.object
};

export default Profile;
