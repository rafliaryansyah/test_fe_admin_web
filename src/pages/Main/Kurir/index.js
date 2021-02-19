import { useEffect, useRef, useState } from 'react';
import useStyles from './styles';

// resize image
import Resizer from 'react-image-file-resizer';

// image crop
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// debounce untuk fitur pencarian
import { debounce } from 'debounce';

// material-ui core
import {
  Avatar,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  IconButton
} from '@material-ui/core';

// notistack
import { useSnackbar } from 'notistack';

// icons
import {
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline
} from 'react-icons/io5';

// components
import { CardKurir, CompDialog, ConfirmDialog, Paginasi } from 'components';

// services
import { readKurir, updateKurir, deleteKurir } from 'services';

// utils
import { fileExtention, uriToFile } from 'utils';

function Kurir() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [openForm, setOpenForm] = useState(false);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  // data kurir
  const [kurirs, setKurirs] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  // data id
  const [id, setID] = useState('');

  // form data input
  const [status, setStatus] = useState(1);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const [error, setError] = useState({
    name: '',
    image: ''
  });

  // crop
  const [uri, setURI] = useState();
  const [crop, setCrop] = useState({ unit: 'px', height: 300, aspect: 1 / 1 });
  const [completeCrop, setCompleteCrop] = useState(null);
  const previewCanvasRef = useRef();
  const imageRef = useRef();

  // validation form
  const validate = () => {
    const newError = { ...error };

    if (!name) {
      newError.name = 'Field masih kosong';
    }

    if (!image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  // read data kurir
  useEffect(() => {
    readKurir().then(res => {
      setKurirs(res.data.data);
      setLastPage(res.data.meta.last_page);
      setCurrentPage(res.data.meta.current_page);
    });
  }, []);

  // update data
  const onUpdate = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // form-data
      const formdata = new FormData();

      // mengisi form-data yang kosong
      formdata.append('status', status);
      formdata.append('name', name);

      // cek image baru atau lama
      if (image.name) {
        formdata.append('image', image);
      }

      // service
      const result = await updateKurir(id, formdata).catch(err => err);

      // cek sukses atau tidak
      if (result.success) {
        setOpenForm(false);

        setStatus(1);
        setName('');
        setImage('');

        // read kembali data kurir
        readKurir().then(res => {
          setKurirs(res.data.data);
          setLastPage(res.data.meta.last_page);
          setCurrentPage(res.data.meta.current_page);
        });

        enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
      } else {
        setOpenForm(false);

        enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
      }
    }
  };

  const onDelete = async () => {
    // service
    const result = await deleteKurir(id).catch(err => err);

    // cek sukses atau tidak
    if (result.success) {
      setOpenConfirmDelete(false);

      // read kembali data kurir
      readKurir().then(res => {
        setKurirs(res.data.data);
        setLastPage(res.data.meta.last_page);
        setCurrentPage(res.data.meta.current_page);
      });

      enqueueSnackbar('Berhasil menghapus data', { variant: 'success' });
    } else {
      setOpenConfirmDelete(false);

      enqueueSnackbar('Gagal menghapus data', { variant: 'error' });
    }
  };

  // upload image
  const onSelectedImage = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file && file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file && file.type}`
      });
    } else if (file && file.size >= 2097152) {
      setError({
        ...error,
        image: 'Ukuran file terlalu besar dari 500KB'
      });
    } else {
      const reader = new FileReader();

      reader.onabort = () => {
        setError({
          ...error,
          image: 'Proses pembacaan file dibatalkan'
        });
      };

      reader.onerror = () => {
        setError({
          ...error,
          image: 'File tidak terbaca'
        });
      };

      reader.onload = async () => {
        setError({
          ...error,
          image: ''
        });

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
          setError({
            ...error,
            image: e.message
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

      setImage(base64ToFile);

      setURI();
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            color="primary"
            placeholder="Cari"
            onChange={debounce(e => {
              readKurir(e.target.value).then(res => setKurirs(res.data.data));
            }, 3000)}
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.main}>
        {kurirs?.map(kurir => (
          <CardKurir
            key={kurir.id}
            srcImage={kurir.image}
            code={kurir.code}
            nama={kurir.name}
            status={kurir.status === 'Active' ? 'aktif' : 'tidak aktif'}
            checkReceipt={kurir.checkReceipt ? 'true' : 'false'}
            checkCost={kurir.checkCost ? 'true' : 'false'}>
            <IconButton
              disabled={kurir.isDeleted}
              color="primary"
              onClick={() => {
                setID(kurir.id);
                setStatus(kurir.status === 'Active' ? 1 : 2);
                setName(kurir.name);
                setImage(kurir.image);
                setOpenForm(true);
              }}
              className={classes.action}>
              <IoPencilOutline />
            </IconButton>
            <IconButton
              disabled={kurir.isDeleted}
              color="secondary"
              onClick={() => {
                setID(kurir.id);
                setOpenConfirmDelete(true);
              }}
              className={classes.action}>
              <IoTrashOutline />
            </IconButton>
          </CardKurir>
        ))}
      </div>
      <br />

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) =>
          readKurir('', value).then(res => {
            setKurirs(res.data.data);
            setLastPage(res.data.meta.last_page);
            setCurrentPage(res.data.meta.current_page);
          })
        }
      />

      <CompDialog
        open={openForm}
        close={() => {
          setStatus(1);
          setName('');
          setImage('');
          setURI();
          setOpenForm(false);
        }}
        title="Form Edit">
        <div className={classes.form}>
          <FormControl
            variant="outlined"
            size="small"
            fullWidth
            style={{ marginBottom: 15 }}>
            <InputLabel id="status">Status</InputLabel>
            <Select
              labelId="status"
              id="status"
              name="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              label="Status">
              <MenuItem value={1}>Aktif</MenuItem>
              <MenuItem value={2}>Tidak Aktif</MenuItem>
            </Select>
          </FormControl>

          <InputLabel htmlFor="code" error={error.name ? true : false}>
            Nama
          </InputLabel>
          <FormControl
            variant="outlined"
            size="small"
            margin="normal"
            fullWidth>
            <OutlinedInput
              name="name"
              id="name"
              color="primary"
              value={name}
              onChange={e => setName(e.target.value)}
              error={error.name ? true : false}
            />
            <FormHelperText id="outlined-helper-text" error={error.name}>
              {error.name}
            </FormHelperText>
          </FormControl>

          <div className={classes.inputFile}>
            <InputLabel id="image" style={{ marginBottom: 15 }}>
              Gambar
            </InputLabel>
            {!uri && (
              <Avatar
                alt="image"
                src={image?.name ? URL.createObjectURL(image) : image}
                variant="rounded"
                className={classes.preview}
              />
            )}

            {uri && (
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

            {uri && (
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
              <label htmlFor="upload" className={classes.item}>
                pilih foto
              </label>
              {/* {isActiveForm && !uri && (
            <label
              onClick={() => {
                setURI(form.photo);
                console.log(form.photo);
              }}
              className={classes.item}>
              crop
            </label>
          )} */}
              {uri && (
                <label onClick={onClickToSetCrop} className={classes.item}>
                  set
                </label>
              )}
            </div>
          </div>
          <br />
          <FormHelperText
            id="outlined-helper-text"
            error={error.image ? true : false}>
            {error.image}
          </FormHelperText>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onUpdate}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={openConfirmDelete}
        close={() => setOpenConfirmDelete(false)}
        title="Hapus"
        submit={onDelete}>
        Apakah yakin ingin menghapus?
      </ConfirmDialog>
    </div>
  );
}

export default Kurir;
