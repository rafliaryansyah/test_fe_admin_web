import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

// material-ui core
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';

// material-ui icons
import SearchIcon from '@material-ui/icons/Search';

// components
import { PrivateRoute, DetailDialog } from '../../../components';

// pages
import TabProduk from './TabProduk';
import TabJasa from './TabJasa';

function Category({ location, history }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    type: '',
    name: '',
    src_img: ''
  });

  const [error, setError] = useState({
    type: '',
    name: '',
    src_img: ''
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
    if (!form.src_img) {
      newError.src_img = 'Field masih kosong';
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

  return (
    <div>
      <div className={classes.pencarian}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}>
          buat kategori
        </Button>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.menuTabToko}>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={location.pathname}
          onChange={(event, value) => history.push(value)}
          aria-label="disabled tabs example">
          <Tab label="Produk" value="/category/produk" />
          <Tab label="Jasa" value="/category/jasa" />
        </Tabs>
        <div className={classes.tabsMain}>
          <Switch>
            <PrivateRoute exact path="/category/produk" component={TabProduk} />
            <PrivateRoute path="/category/jasa" component={TabJasa} />
            <Redirect to="/category/produk" />
          </Switch>
        </div>
      </div>
      <DetailDialog
        open={open}
        close={() => setOpen(false)}
        title="Buat Kategori">
        <div className={classes.wrapper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Tipe</FormLabel>
            <RadioGroup
              row
              aria-label="pilih_tipe"
              name="pilih_tipe"
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

          {form.src_img ? (
            <img src={form.src_img} alt="" className={classes.preview} />
          ) : (
            <div>
              <input type="file" id="upload" style={{ display: 'none' }} />
              <label htmlFor="upload" className={classes.upload}>
                Upload Foto
              </label>
            </div>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            className={classes.submit}
            disabled={form.type && form.name && form.src_img ? false : true}>
            simpan
          </Button>
        </div>
      </DetailDialog>
    </div>
  );
}

Category.propTypes = {
  history: propTypes.object,
  location: propTypes.object
};

export default Category;
