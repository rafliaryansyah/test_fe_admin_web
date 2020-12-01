import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// material-ui icons
import { ArrowBack } from '@material-ui/icons';
import { useState } from 'react';

// components
import { CompDialog, ConfirmDialog } from '../../../../components';

function Detail({ history }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [confirmHapus, setConfirmHapus] = useState(false);
  const [confirmAktif, setConfirmAktif] = useState(false);

  const [form, setForm] = useState({
    role: ''
  });

  const [roles, setRoles] = useState({
    customer: true,
    sa_merchant: false
  });

  const handleChange = e => {
    setRoles({ ...roles, [e.target.name]: e.target.checked });
  };

  const submit = e => {
    e.preventDefault();
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push('/customers')}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfo}>
        <div className={classes.itemFotoDanRoles}>
          <img
            src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
            alt="foto"
            className={classes.img}
          />
          <div className={classes.roles}>
            <p className={classes.title}>roles :</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={roles.customer}
                  onChange={handleChange}
                  name="customer"
                  color="primary"
                />
              }
              label="Customer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={roles.sa_merchant}
                  onChange={handleChange}
                  name="sa_merchant"
                  color="primary"
                />
              }
              label="SA.Merchant"
            />
          </div>
        </div>

        <div className={classes.itemDataUser}>
          <div className={classes.input}>
            <label className={classes.label}>nama</label>
            <span className={classes.text}>nabila syaharani</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>tanggal lahir</label>
            <span className={classes.text}>21 februari 1995</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>jenis kelamin</label>
            <span className={classes.text}>perempuan</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>email</label>
            <span className={classes.text}>nabsyah@gmail.com</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>nomor telepon</label>
            <span className={classes.text}>+6217178909121</span>
          </div>
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpen(true)}>
              tambahkan role
            </Button>
          </div>
        </div>
      </div>
      <CompDialog open={open} close={() => setOpen(false)} title="Tambah Role">
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Role</FormLabel>
            <RadioGroup
              row
              aria-label="tambah_role"
              name="tambah_role"
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              defaultValue="top">
              <FormControlLabel
                value="admin"
                control={<Radio color="primary" />}
                label="Admin"
              />
              <FormControlLabel
                value="finance"
                control={<Radio color="primary" />}
                label="Finance"
              />
              <FormControlLabel
                value="contributor"
                control={<Radio color="primary" />}
                label="Contributor"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={submit}
            disabled={form.role ? false : true}
            fullWidth>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={confirmHapus}
        close={() => setConfirmHapus(false)}
        title="Hapus Role">
        Yakin ingin menghapus role ?
      </ConfirmDialog>
    </div>
  );
}

Detail.propTypes = {
  history: propTypes.object
};

export default Detail;
