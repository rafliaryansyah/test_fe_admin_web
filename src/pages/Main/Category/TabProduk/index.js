import { useState } from 'react';
import useStyles from './styles';

// material-ui core
import {
  Button,
  IconButton,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@material-ui/core';

// material-ui icons
import { Delete, Edit } from '@material-ui/icons';

// components
import { CompDialog, ConfirmDialog, Paginasi } from 'components';

function TabProduk() {
  const classes = useStyles();

  const [open, setOpen] = useState({
    detail: false,
    edit: false,
    hapus: false
  });

  const [form, setForm] = useState({
    type: 1,
    name: '',
    image: ''
  });

  const [error, setError] = useState({
    type: '',
    name: '',
    image: ''
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

    if (!form.type) {
      newError.type = 'Field masih kosong';
    }

    if (!form.name) {
      newError.name = 'Field masih kosong';
    }

    if (!form.image) {
      newError.image = 'Field masih kosong';
    }

    return newError;
  };

  const submit = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      console.log('Submit : ', form);
    }
  };

  const handleUploadFile = async e => {
    const file = e.target.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      setError({
        ...error,
        image: `Tipe file tidak didukung: ${file.type}`
      });
    } else if (file.size >= 512000) {
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
          setForm({
            ...form,
            image: file
          });
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

  const handleDelete = () => {
    console.log('click');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardGrid}>
        {Array.from(new Array(5)).map((_, i) => (
          <Card key={i}>
            <CardActionArea onClick={() => setOpen({ ...open, detail: true })}>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="150"
                image="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                title="Contemplative Reptile"
              />
              <CardContent className={classes.content}>
                <span>akhirtahun</span>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.action}>
              <IconButton
                size="small"
                color="primary"
                onClick={() => setOpen({ ...open, edit: true })}>
                <Edit />
              </IconButton>
              <IconButton
                size="small"
                color="primary"
                onClick={() => setOpen({ ...open, hapus: true })}>
                <Delete />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}>
        <img
          src="https://images.unsplash.com/photo-1483721310020-03333e577078?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
          alt="avatar"
          className={classes.img}
        />
        <div className={classes.desk}>
          <span className={classes.teks}>nama kategori</span>
          <span className={classes.teks}>olahraga</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>tipe kategori</span>
          <span className={classes.teks}>produk</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>status</span>
          <span className={classes.teks}>aktif</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>produk terkait</span>
          <span className={classes.teks}>124</span>
        </div>
      </CompDialog>

      <CompDialog
        open={open.edit}
        close={() => setOpen({ ...open, edit: false })}
        title="Edit Kategori">
        <div style={{ display: 'grid', padding: 15 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Tipe</FormLabel>
            <RadioGroup
              row
              aria-label="type"
              name="type"
              value={form.type}
              onChange={handleChange}>
              <FormControlLabel
                value="produk"
                control={<Radio color="primary" />}
                label="Produk"
              />
              <FormControlLabel
                value="jasa"
                control={<Radio color="primary" />}
                label="Jasa"
              />
            </RadioGroup>
          </FormControl>

          <InputLabel
            htmlFor="name"
            error={error.name ? true : false}
            className={classes.label}>
            Nama
          </InputLabel>
          <FormControl variant="outlined" size="small" margin="normal">
            <OutlinedInput
              name="name"
              id="name"
              color="primary"
              onChange={handleChange}
              value={form.name}
              error={error.name ? true : false}
            />
            <FormHelperText
              id="outlined-helper-text"
              error={error.name ? true : false}>
              {error.name}
            </FormHelperText>
          </FormControl>

          <div className={classes.inputFile}>
            <div className={classes.itemPreview}>
              {form.image ? (
                <img
                  src={URL.createObjectURL(form.image)}
                  alt="Foto Banner"
                  className={classes.preview}
                />
              ) : (
                'Image Preview'
              )}
            </div>
            <input
              type="file"
              id="upload"
              accept="image/jpeg,image/png"
              onChange={handleUploadFile}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload" className={classes.itemUpload}>
              Upload Foto
            </label>
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
            onClick={submit}
            className={classes.submit}
            disabled={form.type && form.name && form.src_img ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={open.hapus}
        close={() => setOpen({ ...open, hapus: false })}
        submit={handleDelete}
        title="Hapus Kategori">
        Yakin ingin menghapus kategori ?
      </ConfirmDialog>
    </div>
  );
}

export default TabProduk;
