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

import { CompDialog } from 'components';

// formatter
import { dateConverterReq, uriToFile, fileExtention } from 'utils';

function Profile({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // data aktif update
  const [isActiveForm, setIsActiveForm] = useState(false);

  // data open dialog
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);

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
  const [uri, setURI] = useState(null);
  const [crop, setCrop] = useState({ unit: 'px', width: 200, aspect: 1 / 1 });
  const [cropImage, setCropImage] = useState(null);
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
    } else {
      enqueueSnackbar(result.data.response.data.message, {
        variant: 'error'
      });
      setIsActiveForm(false);
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

                  const photoFile = uriToFile(uri);

                  setForm({
                    ...form,
                    photo: photoFile
                  });
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

    if (cropImage) {
      const canvasRef = previewCanvasRef.current;

      const fileExtension = fileExtention(cropImage);
      const imageBase64 = canvasRef.toDataURL(`image/${fileExtension}`);

      // sebelum upload ubah dari base64 ke file
      const base64ToFile = uriToFile(imageBase64);

      setForm({ ...form, photo: base64ToFile });

      setOpenCrop(false);
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
          onChange={onSelectedImage}
          id="upload"
          style={{ display: 'none' }}
        />

        {isActiveForm && (
          <label htmlFor="upload" className={classes.upload}>
            upload
          </label>
        )}

        {isActiveForm && form.photo !== null && (
          <label
            onClick={() => setForm({ ...form, photo: '' })}
            className={classes.upload}>
            hapus
          </label>
        )}

        {isActiveForm && (
          <label
            onClick={() => {
              setOpenCrop(true);
              setCropImage(form.photo.name ? uri : form.photo);
            }}
            className={classes.upload}>
            crop
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

      <CompDialog
        open={openCrop}
        close={() => {
          setOpenCrop(false);
          setCropImage();
        }}
        title="Crop Image">
        <div style={{ display: 'grid' }}>
          <div style={{ textAlign: 'center' }}>
            <ReactCrop
              src={cropImage}
              crop={crop}
              onImageLoaded={imageLoaded}
              onComplete={onCropComplete}
              onChange={onChangeCrop}
              style={{ textAlign: 'center' }}
            />
          </div>

          <br />

          <p>Preview</p>

          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                width: Math.round(completeCrop?.width ?? 0),
                height: Math.round(completeCrop?.height ?? 0)
              }}
            />
          </div>

          <br />

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gridGap: 15
            }}>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                setOpenCrop(false);
                setCropImage();
              }}>
              batal
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onClickToSetCrop}>
              set crop
            </Button>
          </div>
        </div>
      </CompDialog>

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
