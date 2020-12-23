import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

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

// redux
import { connect } from 'react-redux';
import { setCategories, setCategory } from 'modules';

// services
import { getCategory, updateCategory, deleteCategory } from 'services';

function TabProduk({
  setDataCategories,
  setDataCategory,
  dataCategories,
  dataCategory,
  history
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    edit: false,
    hapus: false
  });

  const [id, setID] = useState('');

  const [form, setForm] = useState({
    type: '1',
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

  // read
  useEffect(() => {
    getCategory()
      .then(res => {
        setDataCategories(res.data.data);
      })
      .catch(err => err);
  }, []);

  // update
  const onUpdate = async e => {
    e.preventDefault();

    const findErrors = validate();

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors);
    } else {
      // state
      const { type, name, image } = form;

      // menggunakan form-data yang kosong
      const formdata = new FormData();

      // mengisi form-data dengan append
      formdata.append('type', parseInt(type));
      formdata.append('name', name);
      formdata.append('image', image);

      // services
      const result = await updateCategory(id, formdata).catch(err => err);

      // cek sukses atau tidak
      if (result.success) {
        setForm({
          type: '1',
          name: '',
          image: ''
        });
        setOpen({ ...open, edit: false });
        enqueueSnackbar(result.data.message, {
          variant: 'success'
        });

        // read kembali data kategori baru
        setTimeout(() => {
          getCategory()
            .then(res => {
              setDataCategories(res.data.data);
            })
            .catch(err => err);
        }, 5000);
      } else {
        // cek unauthentikasi
        if (result.data.response.status === 401) {
          setForm({
            type: '1',
            name: '',
            image: ''
          });
          setOpen({ ...open, edit: false });
          localStorage.removeItem('token');
          history.push('/login');
          enqueueSnackbar(result.data.response.data.message, {
            variant: 'error'
          });
        }

        setForm({
          type: '1',
          name: '',
          image: ''
        });
        setOpen({ ...open, edit: false });
        enqueueSnackbar(result.data.response.data.message, {
          variant: 'error'
        });
      }
    }
  };

  // delete
  const onDelete = async () => {
    const result = await deleteCategory(id).catch(err => err);

    if (result.success) {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar(result.data.message, {
        variant: 'success'
      });

      // read kembali data kategori baru
      setTimeout(() => {
        getCategory()
          .then(res => {
            setDataCategories(res.data.data);
          })
          .catch(err => err);
      }, 5000);
    } else {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar(result.data.response.data.message, {
        variant: 'error'
      });
    }
  };

  // upload image
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

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardGrid}>
        {dataCategories &&
          dataCategories.map(data => (
            <Card key={data.id}>
              <CardActionArea
                disabled={data.isDeleted}
                onClick={() => {
                  setDataCategory(data);
                  setOpen({ ...open, detail: true });
                }}>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="150"
                  image={data.image}
                  title={data.name}
                />
                <CardContent className={classes.content}>
                  <span>{data.name}</span>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.action}>
                <IconButton
                  size="small"
                  color="primary"
                  disabled={data.isDeleted}
                  onClick={() => {
                    setOpen({ ...open, edit: true });
                    setID(data.id);
                    setForm({
                      ...form,
                      type: data.type && data.type.id.toString(),
                      name: data.name,
                      image: data.image
                    });
                  }}>
                  <Edit />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  disabled={data.isDeleted}
                  onClick={() => {
                    setOpen({ ...open, hapus: true });
                    setID(data.id);
                  }}>
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
        <img src={dataCategory.image} alt="photo" className={classes.img} />
        <div className={classes.desk}>
          <span className={classes.teks}>nama kategori</span>
          <span className={classes.teks}>{dataCategory.name}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>tipe kategori</span>
          <span className={classes.teks}>
            {dataCategory.type && dataCategory.type.name}
          </span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>produk terkait</span>
          <span className={classes.teks}>{dataCategory.relatedProduct}</span>
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
                value="1"
                control={<Radio color="primary" />}
                label="Produk"
              />
              <FormControlLabel
                value="2"
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
                  src={form.image}
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
            onClick={onUpdate}
            className={classes.submit}
            disabled={form.type && form.name && form.image ? false : true}>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={open.hapus}
        close={() => setOpen({ ...open, hapus: false })}
        submit={onDelete}
        title="Hapus Kategori">
        Yakin ingin menghapus kategori ?
      </ConfirmDialog>
    </div>
  );
}

TabProduk.propTypes = {
  setDataCategories: propTypes.func,
  setDataCategory: propTypes.func,
  dataCategories: propTypes.array,
  dataCategory: propTypes.object
};

const mapStateToProps = state => ({
  dataCategories: state.category.categories,
  dataCategory: state.category.category
});

const mapDispatchToProps = dispatch => ({
  setDataCategories: value => dispatch(setCategories(value)),
  setDataCategory: value => dispatch(setCategory(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabProduk);
