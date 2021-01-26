import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  IconButton,
  Button,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core';

// react icons
import { IoArrowBack, IoCopyOutline } from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog } from 'components';

// react redux
import { connect } from 'react-redux';
import { setCustomer } from 'modules';

// services
import { getCustomer, accessAdminCustomer, updateRoleCustomer } from 'services';

function Detail({ setDataCustomer, dataCustomer, history }) {
  console.log('dataCustomer', dataCustomer);
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // useParams untuk mengambil id dari url
  const { id } = useParams();

  const [open, setOpen] = useState({
    form: false,
    confirm: false,
  });

  // data awal roles
  const [roles, setRoles] = useState([
    { id: 1, label: 'customer', checked: false },
    { id: 2, label: 'super-admin-merchant', checked: false },
    { id: 3, label: 'contributor-merchant', checked: false },
    { id: 4, label: 'super-admin-ecommerce', checked: false },
    { id: 5, label: 'admin-ecommerce', checked: false },
    { id: 6, label: 'contributor-ecommerce', checked: false },
  ]);

  // data form update role
  const [name, setName] = useState({
    rolesSelected: '',
    accessAdmin: '',
  });

  // data event dari onChange
  const [event, setEvent] = useState();

  // change roles
  const onRoleChange = (e) => {
    if (e.target.value !== 'customer') {
      const newRoles = [...roles];

      const indexCheck = newRoles.findIndex(
        (role) => role.label === event.target.value,
      );

      newRoles[indexCheck].checked = !newRoles[indexCheck].checked;

      setRoles(newRoles);

      // data value check roles baru
      const selected = newRoles
        .filter((role) => role.checked)
        .map((role) => role.label);

      // set data yang mau di request ke api
      setName({ ...name, rolesSelected: selected });
    }
  };

  // mengambil data customer redu(global state)
  const getCustomerRoles = () => {
    const newRoles = [...roles];
    // for(let oldRoles of dataCustomer.roles) {
    dataCustomer?.roles?.map((customerRoles) => {
      const indexCheck = newRoles.findIndex(
        (role) => role.label === customerRoles,
      );
      newRoles[indexCheck].checked = true;
      setRoles(newRoles);

      // data value check roles baru
      const selected = newRoles
        .filter((role) => role.checked)
        .map((role) => role.label);

      // set data yang mau di request ke api
      setName({ ...name, rolesSelected: selected });
    });
  };

  // read detail data
  useEffect(() => {
    getCustomer(id).then((res) => {
      setDataCustomer(res.data.data);
      getCustomerRoles();
    });
  }, []);

  // update role
  const updateRoles = async (e) => {
    e.preventDefault();
    if (e.target.value !== 'customer') {
      let data = [];
      roles.find((role) => {
        role.checked === true ? data.push(role.label) : null;
      });

      // service
      const result = await updateRoleCustomer(id, data)
        .then((res) => {
          // success update role
          setOpen({ ...open, confirm: false });
          enqueueSnackbar('Berhasil mengperbarui roles', {
            variant: 'success',
          });
          getCustomerRoles();
        })
        .catch((e) => {
          // gagal update role
          setOpen({ ...open, confirm: false });
          enqueueSnackbar('Gagal memperbarui roles', {
            variant: 'error',
          });
          getCustomerRoles();
        });
    }
  };

  // akses admin web app
  const aksesAdmin = async (e) => {
    e.preventDefault();

    // service
    const result = await accessAdminCustomer(id, name.accessAdmin).catch(
      (err) => err,
    );

    // cek sukses atau gagal
    if (result.success) {
      setOpen({ ...open, form: false });
      enqueueSnackbar('sekarang anda mempunyai akses ke web admin', {
        variant: 'success',
      });
    } else {
      setOpen({ ...open, form: false });
      enqueueSnackbar('Gagal membuat akses', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push('/customers')}>
          <IoArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfo}>
        <div className={classes.itemFotoDanRoles}>
          <Avatar
            alt={dataCustomer.name}
            // src={dataCustomer.image}
            variant="rounded"
            className={classes.img}
          />
          <div className={classes.roles}>
            <p className={classes.title}>roles :</p>
            {roles.map((role) => {
              return (
                <div key={role.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={(e) => {
                          setOpen({ ...open, confirm: true });
                          setEvent(e);
                        }}
                        name={role.label}
                        value={role.label}
                        checked={role.checked}
                      />
                    }
                    label={role.label}
                    className={classes.checkbox}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div className={classes.itemDataUser}>
          <div className={classes.input}>
            <label className={classes.label}>nama</label>
            <span className={classes.text}>{dataCustomer.name}</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>ID user</label>
            <span className={classes.text}>
              {dataCustomer.id}
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(dataCustomer.id);
                  enqueueSnackbar('ID telah dicopy', { variant: 'success' });
                }}
                onMouseDown={(e) => e.preventDefault()}
                edge="end">
                <IoCopyOutline />
              </IconButton>
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>jenis kelamin</label>
            <span className={classes.text}>
              {dataCustomer.gender && dataCustomer.gender.name}
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>email</label>
            <span className={classes.text}>{dataCustomer.email}</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>nomor telepon</label>
            <span className={classes.text}>{dataCustomer.phone}</span>
          </div>
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpen({ ...open, form: true })}>
              akses admin web app
            </Button>
          </div>
        </div>
      </div>
      <CompDialog
        open={open.form}
        close={() => setOpen({ ...open, form: false })}
        title="Akses Admin">
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pilih Role</FormLabel>
            <RadioGroup
              row
              aria-label="tambah_roles"
              name="tambah_roles"
              value={name.accessAdmin}
              onChange={(e) =>
                setName({ ...name, accessAdmin: e.target.value })
              }
              defaultValue="top">
              <FormControlLabel
                value="admin-ecommerce"
                control={<Radio color="primary" />}
                label="Admin"
              />
              <FormControlLabel
                value="finance"
                control={<Radio color="primary" />}
                label="Finance"
              />
              <FormControlLabel
                value="contributor-ecommerce"
                control={<Radio color="primary" />}
                label="Contributor"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={aksesAdmin}
            disabled={name.accessAdmin ? false : true}
            fullWidth>
            simpan
          </Button>
        </div>
      </CompDialog>
      <ConfirmDialog
        open={open.confirm}
        close={() => setOpen({ ...open, confirm: false })}
        title="Konfirmasi Role"
        submit={(e) => {
          onRoleChange(e);
          setOpen({ ...open, confirm: false });
          setTimeout(() => {
            updateRoles(e); //update roles
          }, 3000);
        }}>
        Yakin ingin mengubah ?
      </ConfirmDialog>
    </div>
  );
}

Detail.propTypes = {
  dataCustomer: propTypes.object,
  setDataCustomer: propTypes.func,
};

const mapStateToProps = (state) => ({
  dataCustomer: state.customer.customer,
});

const mapDispatchToProps = (dispatch) => ({
  setDataCustomer: (value) => dispatch(setCustomer(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
