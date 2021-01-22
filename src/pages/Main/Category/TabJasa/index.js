import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';
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
  IoTrashOutline
} from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';
import { setCategoriesJasa, setDetailCategoryServices } from 'modules';

// services
import {
  getCategory,
  getDetailCategoryServices,
  updateCategory,
  deleteCategory
} from 'services';

function TabJasa({
  setDataCategoriesJasa,
  dataCategoriesJasa,
  setDataDetailCategoryServices,
  dataDetail,
  history
}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState({
    detail: false,
    edit: false,
    hapus: false
  });

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  const [id, setID] = useState('');

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

  // read
  useEffect(() => {
    getCategory('2')
      .then(res => {
        setDataCategoriesJasa(res.data.data);
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

      // cek image baru atau tetal yang lama
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
          getCategory('2')
            .then(res => {
              setDataCategoriesJasa(res.data.data);
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
        getCategory('2')
          .then(res => {
            setDataCategoriesJasa(res.data.data);
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
            getCategory('2', e.target.value).then(res => {
              setDataCategoriesJasa(res.data.data);
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
        {dataCategoriesJasa &&
          dataCategoriesJasa.map(data => (
            <Card key={data.id}>
              <CardActionArea
                disabled={data.isDeleted}
                onClick={() => {
                  getDetailCategoryServices(data.id)
                    .then(res => setDataDetailCategoryServices(res.data))
                    .catch(err => err);
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
        onChange={(e, value) =>
          getCategory('2', '', value).then(res => {
            setDataCategoriesJasa(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
          })
        }
      />

      <CompDialog
        open={open.detail}
        close={() => setOpen({ ...open, detail: false })}>
        <img src={dataDetail.image} alt="photo" className={classes.img} />
        <div className={classes.desk}>
          <span className={classes.teks}>nama kategori</span>
          <span className={classes.teks}>{dataDetail.name}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>tipe kategori</span>
          <span className={classes.teks}>{dataDetail.type}</span>
        </div>
        <div className={classes.desk}>
          <span className={classes.teks}>produk terkait</span>
          <span className={classes.teks}>
            {dataDetail.totalRelated} |
            <span
              className={classes.cekTerkait}
              onClick={() => history.replace('/produk-terkait')}>
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

TabJasa.propTypes = {
  setDataCategoriesJasa: propTypes.func,
  dataCategoriesJasa: propTypes.array,
  setDataDetailCategoryServices: propTypes.func,
  dataDetail: propTypes.object
};

const mapStateToProps = state => ({
  dataCategoriesJasa: state.category.categoriesJasa,
  dataDetail: state.category.detailCategoryServices
});

const mapDispatchToProps = dispatch => ({
  setDataCategoriesJasa: value => dispatch(setCategoriesJasa(value)),
  setDataDetailCategoryServices: value =>
    dispatch(setDetailCategoryServices(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TabJasa);
