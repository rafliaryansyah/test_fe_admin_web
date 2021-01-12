import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
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
  FormHelperText,
  InputAdornment
} from '@material-ui/core';

// react icons
import {
  IoSearchOutline,
  IoPencilOutline,
  IoTrashOutline,
  IoArrowBack
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';
import { setCategoriesProduk } from 'modules';

// services
import { getCategory, updateCategory, deleteCategory } from 'services';

function TabProduk({ setDataCategoriesProduk, dataCategoriesProduk, history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // open dialog
  const [open, setOpen] = useState({
    detail: false,
    edit: false,
    hapus: false
  });

  // pagination
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  // data id
  const [id, setID] = useState('');

  // data detail
  const [detailCategory, setDetailCategory] = useState({});

  // data form kategori
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

  // change input
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

  // validasi input
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

  // read data kategori tipe 1 (produk)
  useEffect(() => {
    getCategory('1')
      .then(res => {
        setDataCategoriesProduk(res.data.data);
        setPagination({
          ...pagination,
          current_page: res.data.meta.current_page
        });
        setPagination({
          ...pagination,
          last_page: res.data.meta.last_page
        });
      })
      .catch(err => err);
  }, []);

  // update data kategori tipe 1 (produk)
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

      // cek image baru atau tetap yang lama
      if (image.name) {
        formdata.append('image', image);
      }

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
          getCategory('1')
            .then(res => {
              setDataCategoriesProduk(res.data.data);
              setPagination({
                ...pagination,
                current_page: res.data.meta.current_page
              });
              setPagination({
                ...pagination,
                last_page: res.data.meta.last_page
              });
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
    // services
    const result = await deleteCategory(id).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpen({ ...open, hapus: false });
      enqueueSnackbar(result.data.message, {
        variant: 'success'
      });

      // read kembali data kategori baru
      setTimeout(() => {
        getCategory('1')
          .then(res => {
            setDataCategoriesProduk(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
            setPagination({
              ...pagination,
              last_page: res.data.meta.last_page
            });
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
      <FormControl variant="outlined" size="small" fullWidth>
        <OutlinedInput
          color="primary"
          placeholder="Cari"
          onChange={e => {
            getCategory('1', e.target.value).then(res => {
              setDataCategoriesProduk(res.data.data);
            });
          }}
          endAdornment={
            <InputAdornment position="start">
              <IoSearchOutline />
            </InputAdornment>
          }
        />
      </FormControl>
      <div className={classes.cardGrid}>
        {dataCategoriesProduk &&
          dataCategoriesProduk.map(data => (
            <Card key={data.id}>
              <CardActionArea
                disabled={data.isDeleted}
                onClick={() => {
                  setDetailCategory(data);
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
                    setID(data.id);
                    setForm({
                      ...form,
                      type: data.type && data.type.id.toString(),
                      name: data.name,
                      image: data.image
                    });
                    setOpen({ ...open, edit: true });
                  }}>
                  <IoPencilOutline />
                </IconButton>
                <IconButton
                  size="small"
                  color="primary"
                  disabled={data.isDeleted}
                  onClick={() => {
                    setID(data.id);
                    setOpen({ ...open, hapus: true });
                  }}>
                  <IoTrashOutline />
                </IconButton>
              </CardActions>
            </Card>
          ))}
      </div>

      <Paginasi
        count={pagination.last_page}
        page={pagination.current_page}
        onChange={(e, value) => {
          getCategory('1', '', value).then(res => {
            setDataCategoriesProduk(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
          });
        }}
      />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}>
        <img src={detailCategory.image} alt="photo" className={classes.img} />
        <div className={classes.desk}>
          <span className={classes.teks}>nama kategori</span>
          <span className={classes.teks}>{detailCategory.name}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>tipe kategori</span>
          <span className={classes.teks}>
            {detailCategory.type && detailCategory.type.name}
          </span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>produk terkait</span>
          <span className={classes.teks}>
            {detailCategory.relatedProduct} |
            <span
              className={classes.cekTerkait}
              onClick={() => history.replace('/category/produk/terkait')}>
              cek
            </span>
          </span>
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
            <Avatar
              alt="photo"
              src={
                form.image.name ? URL.createObjectURL(form.image) : form.image
              }
              variant="rounded"
              className={classes.preview}
            />
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
  setDataCategoriesProduk: propTypes.func,
  dataCategoriesProduk: propTypes.array
};

const mapStateToProps = state => ({
  dataCategoriesProduk: state.category.categoriesProduk
});

const mapDispatchToProps = dispatch => ({
  setDataCategoriesProduk: value => dispatch(setCategoriesProduk(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabProduk);
