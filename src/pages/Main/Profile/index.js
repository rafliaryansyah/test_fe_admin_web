import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

// react image file resizer
import Resizer from 'react-image-file-resizer';

// react image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
import { dateConverterReq, uriToFile, fileExtention } from 'utils';

function Profile({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data aktif update
  const [isActiveForm, setIsActiveForm] = useState(false);

  // data open dialog
  const [openChangePassword, setOpenChangePassword] = useState(false);

  // data form
  const [form, setForm] = useState({
    name: '',
    dob: '',
    gender: '',
    email: '',
    phone: '',
    photo: ''
  });

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: 'px', height: 300, aspect: 1 / 1 });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

  // change input form
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // read data
  useEffect(() => {
    getProfile().then(res => {
      setForm({
        ...form,
        name: res.data.data.name,
        dob: dateConverterReq(res.data.data.date_of_birth),
        gender: res.data.data.gender?.id.toString(),
        email: res.data.data.email,
        phone: res.data.data.phone,
        photo: res.data.data.image
      });
    });
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
      setIsActiveForm(false);

      // read kembali data user profile
      getProfile().then(res => {
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
      });

      enqueueSnackbar('Berhasil memperbarui profile', {
        variant: 'success'
      });
    } else {
      setIsActiveForm(false);

      enqueueSnackbar('Gagal memperbarui profile', {
        variant: 'error'
      });
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file?.type)) {
      enqueueSnackbar(`Tipe file tidak didukung: ${file?.type}`, {
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
          if (file) {
            Resizer.imageFileResizer(
              file,
              300,
              300,
              file?.type === 'image/jpeg' ? 'JPEG' : 'PNG',
              100,
              0,
              uri => {
                if (uri) {
                  setURI(uri);
                }
              },
              'base64'
            );
          }
        } catch (e) {
          enqueueSnackbar(e.message, {
            variant: 'error'
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // crop
  const imageLoaded = image => {
    imageRef.current = image;
  };

  const onChangeCrop = crop => {
    setCrop(crop);
  };

  const onCropComplete = crop => {
    setCompleteCrop(crop);

    const image = imageRef.current; // image
    const canvas = previewCanvasRef.current; // document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio; // pixel ratio

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext('2d');

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    image.crossOrigin = 'anonymus';

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  };

  // set crop
  const onClickToSetCrop = e => {
    e.preventDefault();

    if (uri) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(uri);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setForm({ ...form, photo: base64ToFile });

      setURI(null);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.itemFotoDanRoles}>
        {!uri && (
          <Avatar
            src={
              form.photo?.name ? URL.createObjectURL(form.photo) : form.photo
            }
            variant="rounded"
            className={classes.preview}
          />
        )}

        {isActiveForm && uri && (
          <div style={{ textAlign: 'center' }}>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completeCrop?.width ?? 0),
                height: Math.round(completeCrop?.height ?? 0)
              }}
            />
          </div>
        )}

        {isActiveForm && uri && (
          <div style={{ textAlign: 'center' }}>
            <ReactCrop
              src={uri}
              crop={crop}
              onImageLoaded={imageLoaded}
              onComplete={onCropComplete}
              onChange={onChangeCrop}
              keepSelection={true}
            />
          </div>
        )}

        <input
          type="file"
          id="upload"
          accept="image/jpeg,image/png"
          onChange={onSelectedImage}
          style={{ display: 'none' }}
        />

        <div className={classes.actionUploadFile}>
          {isActiveForm && (
            <label htmlFor="upload" className={classes.item}>
              pilih foto
            </label>
          )}
          {isActiveForm && uri && (
            <label onClick={onClickToSetCrop} className={classes.item}>
              set
            </label>
          )}
        </div>
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

        <FormControl component="fieldset">
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
              disabled={form.photo?.name ? false : true}
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
              onClick={() => setOpenChangePassword(true)}>
              ubah password
            </Button>
          </div>
        )}
      </div>

      <ChangePassword
        open={openChangePassword}
        close={() => setOpenChangePassword(false)}
        history={() => {
          localStorage.clear();
          history.push('/login');
        }}
      />
    </div>
  );
}

export default Profile;
