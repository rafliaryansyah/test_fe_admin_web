import { useEffect, useState } from 'react';
import useStyles from './styles';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  FormControlLabel,
  InputLabel,
  FormControl,
  OutlinedInput,
  Button,
  Radio,
  RadioGroup,
  FormLabel
} from '@material-ui/core';

// pages
import ChangePassword from './ChangePassword';

// services
import { getProfile, editProfile } from 'services';

// formatter
import { dateConverterReq } from 'utils';

function Profile({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data aktif update
  const [isActiveForm, setIsActiveForm] = useState(false);

  // data dialog change password
  const [open, setOpen] = useState(false);

  // data form
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    photo: ''
  });

  // change input form
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // read data
  useEffect(() => {
    getProfile()
      .then(res => {
        setForm({
          ...form,
          name: res.data.data.name,
          dob: dateConverterReq(res.data.data.date_of_birth),
          gender: res.data.data.gender && res.data.data.gender.id.toString(),
          email: res.data.data.email,
          phone: res.data.data.phone,
          photo: res.data.data.image
        });
      })
      .catch(err => err);
  }, []);

  // edit profile user
  const update = async e => {
    e.preventDefault();

    // state
    const { name, dob, gender, email, phone, photo } = form;

    // form-data yang kosong
    const formdata = new FormData();

    // mengisi form-data menggunakan append
    formdata.append('name', name);
    formdata.append('dob', dob);
    formdata.append('gender', parseInt(gender));
    formdata.append('email', email);
    formdata.append('phone', phone);

    // cek image baru atau tetap yang lama
    if (photo.name) {
      formdata.append('photo', photo);
    }

    // services
    const result = await editProfile(formdata).catch(err => err);

    // cek sukses atau gagal update
    if (result.success) {
      enqueueSnackbar(result.data.message, {
        variant: 'success'
      });
      setIsActiveForm(false);

      // read kembali data user profile
      getProfile()
        .then(res => {
          setForm({
            ...form,
            name: res.data.data.name,
            dob: dateConverterReq(res.data.data.date_of_birth),
            gender: res.data.data.gender && res.data.data.gender.id.toString(),
            email: res.data.data.email,
            phone: res.data.data.phone,
            photo: res.data.data.image
          });
          const user = JSON.stringify({
            name: res.data.data.name,
            image: res.data.data.image,
            role: res.data.data.roles[0].name
          });
          localStorage.setItem('user', user);
        })
        .catch(err => err);
    } else {
      enqueueSnackbar(result.data.response.data.message, {
        variant: 'error'
      });
      setIsActiveForm(false);
    }
  };

  // upload image
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
        <Avatar
          alt={form.name}
          src={form.photo.name ? URL.createObjectURL(form.photo) : form.photo}
          variant="rounded"
          className={classes.avatar}
        />
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

        <InputLabel htmlFor="dob">Tanggal Lahir</InputLabel>
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
          localStorage.clear();
          history.push('/login');
        }}
      />
    </div>
  );
}

export default Profile;
