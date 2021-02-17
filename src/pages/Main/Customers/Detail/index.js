import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Avatar,
  IconButton,
  Button,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormGroup,
  Switch
} from '@material-ui/core';

// react icons
import { IoArrowBack, IoCopyOutline } from 'react-icons/io5';

// components
import { CompDialog, ConfirmDialog } from 'components';

// services
import { getCustomer, updateRoleCustomer, accessAdminCustomer } from 'services';

function Detail({ history }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // useParams untuk mengambil id dari url
  const { id } = useParams();

  // data open
  const [openForm, setOpenForm] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  // data roles default switch
  const [roles, setRoles] = useState([
    { id: 1, label: 'customer', checked: true },
    { id: 2, label: 'super-admin-merchant', checked: false },
    { id: 3, label: 'admin-merchant', checked: false },
    { id: 4, label: 'contributor-merchant', checked: false },
    { id: 5, label: 'finance-merchant', checked: false }
  ]);

  // data select access
  const [pilihAkses] = useState([
    { name: 'Tidak ada', value: 'tidak ada' },
    { name: 'Admin', value: 'admin-ecommerce' },
    { name: 'Contributor', value: 'contributor-ecommerce' },
    { name: 'Finance', value: 'finance-ecommerce' }
  ]);

  // data detail customer
  const [customer, setCustomer] = useState({});

  // data roles customer
  const [rolesCustomer, setRolesCustomer] = useState([]);

  // data update access
  const [nameAccess, setNameAccess] = useState('tidak ada');

  // data event dari onChange
  const [event, setEvent] = useState();

  // auto switch data role
  const getCustomerRoles = () => {
    const newRoles = [...roles];

    rolesCustomer?.map(name => {
      if (
        name !== 'admin-ecommerce' &&
        name !== 'contributor-ecommerce' &&
        name !== 'finance-ecommerce'
      ) {
        const indexCheck = newRoles.findIndex(role => role.label === name);

        newRoles[indexCheck].checked = true;

        // set data baru untuk roles
        setRoles(newRoles);

        const selected = newRoles
          .filter(role => role.checked)
          .map(role => role.label);

        setRolesCustomer(selected);
      }
    });
  };

  // change roles
  const onRoleChange = () => {
    const newRoles = [...roles];

    const indexCheck = newRoles.findIndex(
      role => role.label === event.target.value
    );

    newRoles[indexCheck].checked = !newRoles[indexCheck].checked;

    // set data baru untuk roles
    setRoles(newRoles);
  };

  // read detail data
  useEffect(() => {
    getCustomer(id).then(res => {
      setCustomer(res.data.data);

      // push ke state roles customer
      res.data.data.roles.map(role => rolesCustomer.push(role));

      setTimeout(() => {
        getCustomerRoles();
      }, 1000);
    });
  }, []);

  // update role
  const updateRoles = async e => {
    e.preventDefault();

    // data request
    let data = [];

    // ambil label yang switch nya true
    roles.find(role => {
      role.checked === true ? data.push(role.label) : null;
    });

    // service
    await updateRoleCustomer(id, data)
      .then(() => {
        // success update role
        setOpenConfirm(false);

        enqueueSnackbar('Berhasil memperbarui roles', {
          variant: 'success'
        });
      })
      .catch(() => {
        // gagal update role
        setOpenConfirm(false);

        enqueueSnackbar('Gagal memperbarui roles', {
          variant: 'error'
        });
      });
  };

  // akses admin web app
  const aksesAdmin = async e => {
    e.preventDefault();

    let data = ['customer'];

    // cek field nama akses
    if (nameAccess !== 'tidak ada') {
      data.push(nameAccess);
    }

    // service
    const result = await accessAdminCustomer(id, data).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenForm(false);

      // read kembali data
      getCustomer(id).then(res => {
        setCustomer(res.data.data);

        // push ke state roles customer
        res.data.data.roles.map(role => rolesCustomer.push(role));

        setTimeout(() => {
          getCustomerRoles();
        }, 1000);
      });

      enqueueSnackbar('Berhasil memperbarui akses', {
        variant: 'success'
      });
    } else {
      setOpenForm(false);

      enqueueSnackbar('Gagal memperbarui akses', {
        variant: 'error'
      });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton
          onClick={() => {
            setRoles([...roles]);
            setCustomer({});
            history.goBack();
          }}>
          <IoArrowBack />
        </IconButton>
      </div>

      <div className={classes.wrapperInfo}>
        <div className={classes.itemFotoDanRoles}>
          <Avatar
            alt={customer.name}
            // src={customer.image}
            variant="rounded"
            className={classes.img}
          />
          <br />
          <FormControl component="fieldset">
            <FormLabel component="legend">Akses Role</FormLabel>
            <FormGroup>
              {roles?.map(role => (
                <FormControlLabel
                  key={role.id}
                  control={
                    <Switch
                      checked={role.checked}
                      onChange={e => {
                        if (e.target.value !== 'customer') {
                          setOpenConfirm(true);
                          setEvent(e);
                        }
                      }}
                      name={role.label}
                      value={role.label}
                    />
                  }
                  label={
                    (role.label === 'customer' && `Customer ${'(aktif)'}`) ||
                    (role.label === 'super-admin-merchant' &&
                      'Super Admin Merchant') ||
                    (role.label === 'admin-merchant' && 'Admin Merchant') ||
                    (role.label === 'contributor-merchant' &&
                      'Contributor Merchant') ||
                    (role.label === 'finance-merchant' && 'Finance Merchant')
                  }
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>

        <div className={classes.itemDataUser}>
          <div className={classes.input}>
            <label className={classes.label}>nama</label>
            <span className={classes.text}>{customer.name}</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>ID user</label>
            <span className={classes.text}>
              {customer.id}
              <IconButton
                onClick={() => {
                  navigator.clipboard.writeText(customer.id);
                  enqueueSnackbar('ID telah dicopy', { variant: 'success' });
                }}
                onMouseDown={e => e.preventDefault()}
                edge="end">
                <IoCopyOutline />
              </IconButton>
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>jenis kelamin</label>
            <span className={classes.text}>
              {customer.gender?.id === '' && ''}
              {customer.gender?.id === 1 && 'Laki-Laki'}
              {customer.gender?.id === 2 && 'Perempuan'}
            </span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>email</label>
            <span className={classes.text}>{customer.email}</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>telepon</label>
            <span className={classes.text}>{customer.phone}</span>
          </div>
          {customer.roles?.map(role =>
            role === 'admin-ecommerce' ||
            role === 'contributor-ecommerce' ||
            role === 'finance-ecommerce' ? (
              <div className={classes.input}>
                <label className={classes.label}>akses admin sebagai</label>
                <span className={classes.text}>
                  {(role === 'admin-ecommerce' && 'admin') ||
                    (role === 'contributor-ecommerce' && 'Contributor') ||
                    (role === 'finance-ecommerce' && 'Finance')}
                </span>
              </div>
            ) : null
          )}
          <div className={classes.wrapperButton}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => setOpenForm(true)}>
              akses admin web
            </Button>
          </div>
        </div>
      </div>

      <CompDialog
        open={openForm}
        close={() => {
          setNameAccess('tidak ada');
          setOpenForm(false);
        }}
        title="Akses">
        <div style={{ display: 'grid', gridGap: 15, padding: 15 }}>
          <InputLabel id="access">Pilih Akses</InputLabel>
          <FormControl variant="outlined" size="small">
            <Select
              labelId="access"
              name="access"
              id="access"
              onChange={e => setNameAccess(e.target.value)}
              value={nameAccess}>
              {pilihAkses?.map((access, index) => (
                <MenuItem key={index} value={access.value}>
                  {access.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              Pilih Tidak ada Agar secara default akan kembali menjadi Customer.
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={aksesAdmin}
            fullWidth>
            simpan
          </Button>
        </div>
      </CompDialog>

      <ConfirmDialog
        open={openConfirm}
        close={() => setOpenConfirm(false)}
        title="Konfirmasi"
        submit={e => {
          onRoleChange();
          setOpenConfirm(false);
          setTimeout(() => {
            updateRoles(e); //update roles
          }, 1000);
        }}>
        Yakin ingin mengubah ?
      </ConfirmDialog>
    </div>
  );
}

export default Detail;
