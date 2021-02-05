import { useEffect, useState } from 'react';
import useStyles from './styles';

// notistack
import { useSnackbar } from 'notistack';

// material-ui core
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  InputLabel,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

// components
import { RowTable, Paginasi, CompDialog } from 'components';

// services
import { readRoles, updateRoles } from 'services';

function Izin() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  // open
  const [openCollapse1, setOpenCollapse1] = useState(false);
  const [openCollapse2, setOpenCollapse2] = useState(false);
  const [openCollapse3, setOpenCollapse3] = useState(false);
  const [openCollapse4, setOpenCollapse4] = useState(false);
  const [openCollapse5, setOpenCollapse5] = useState(false);
  const [openCollapse6, setOpenCollapse6] = useState(false);
  const [openCollapse7, setOpenCollapse7] = useState(false);
  const [openCollapse8, setOpenCollapse8] = useState(false);
  const [openCollapse9, setOpenCollapse9] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [roles, setRoles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data id
  const [id, setID] = useState('');

  // data checkbox
  const [checkboxs] = useState([
    { id: 1, label: 'tambah-item', checked: false },
    { id: 2, label: 'hapus-item', checked: false },
    { id: 3, label: 'balas-diskusi', checked: false },
    { id: 4, label: 'hapus-diskusi', checked: false },
    { id: 5, label: 'tambah-voucher', checked: false },
    { id: 6, label: 'hapus-voucher', checked: false }
  ]);

  // data form
  const [name, setName] = useState('');
  const [permissions, setPermissions] = useState([]);

  // read data role
  useEffect(() => {
    readRoles()
      .then(res => {
        setRoles(res.data.data);
        setLastPage(res.data.meta.last_page);
        setCurrentPage(res.data.meta.current_page);
      })
      .catch(err => err);
  }, []);

  // update
  const onUpdate = async e => {
    e.preventDefault();

    // service
    const result = await updateRoles(id, {
      name: name,
      permissions: permissions
    }).catch(err => err);

    // cek sukses atau gagal
    if (result.success) {
      setOpenForm(false);

      setName('');
      setPermissions([]);

      // read kembali data role
      readRoles()
        .then(res => {
          setRoles(res.data.data);
          setLastPage(res.data.meta.last_page);
          setCurrentPage(res.data.meta.current_page);
        })
        .catch(err => err);

      enqueueSnackbar('Berhasil memperbarui data', { variant: 'success' });
    } else {
      setOpenForm(false);

      setName('');
      setPermissions([]);

      enqueueSnackbar('Gagal memperbarui data', { variant: 'error' });
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.main}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Info Akses</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles?.map(role => (
                <RowTable
                  key={role.id}
                  row={role}
                  open={
                    (role.name === 'customer' && openCollapse1) ||
                    (role.name === 'super-admin-merchant' && openCollapse2) ||
                    (role.name === 'admin-merchant' && openCollapse3) ||
                    (role.name === 'contributor-merchant' && openCollapse4) ||
                    (role.name === 'finance-merchant' && openCollapse5) ||
                    (role.name === 'super-admin-ecommerce' && openCollapse6) ||
                    (role.name === 'admin-ecommerce' && openCollapse7) ||
                    (role.name === 'contributor-ecommerce' && openCollapse8) ||
                    (role.name === 'finance-ecommerce' && openCollapse9)
                  }
                  setOpen={() => {
                    (role.name === 'customer' &&
                      setOpenCollapse1(!openCollapse1)) ||
                      (role.name === 'super-admin-merchant' &&
                        setOpenCollapse2(!openCollapse2)) ||
                      (role.name === 'admin-merchant' &&
                        setOpenCollapse3(!openCollapse3)) ||
                      (role.name === 'contributor-merchant' &&
                        setOpenCollapse4(!openCollapse4)) ||
                      (role.name === 'finance-merchant' &&
                        setOpenCollapse5(!openCollapse5)) ||
                      (role.name === 'super-admin-ecommerce' &&
                        setOpenCollapse6(!openCollapse6)) ||
                      (role.name === 'admin-ecommerce' &&
                        setOpenCollapse7(!openCollapse7)) ||
                      (role.name === 'contributor-ecommerce' &&
                        setOpenCollapse8(!openCollapse8)) ||
                      (role.name === 'finance-ecommerce' &&
                        setOpenCollapse9(!openCollapse9));
                  }}
                  setOpenForm={() => {
                    setID(role.id);
                    setOpenForm(true);
                  }}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) => {
          readRoles(value)
            .then(res => {
              setRoles(res.data.data);
              setLastPage(res.data.meta.last_page);
              setCurrentPage(res.data.meta.current_page);
            })
            .catch(err => err);
        }}
      />

      <CompDialog
        open={openForm}
        close={() => {
          setName('');
          setPermissions([]);
          setOpenForm(false);
        }}
        title="Form Role">
        <div className={classes.form}>
          <InputLabel htmlFor="permissions">Pilih Akses</InputLabel>
          <div className={classes.checkboxs}>
            {checkboxs?.map(cb => (
              <FormControlLabel
                key={cb.id}
                control={
                  <Checkbox
                    onChange={e => {
                      const currentIndex = permissions.indexOf(e.target.value);
                      const newChecked = [...permissions];

                      if (currentIndex === -1) {
                        newChecked.push(e.target.value);
                      } else {
                        newChecked.splice(currentIndex, 1);
                      }

                      setPermissions(newChecked);
                      // console.log(newChecked);
                    }}
                    name={cb.label}
                    value={cb.label}
                    checked={permissions.indexOf(cb.label) !== -1}
                  />
                }
                label={
                  (cb.label === 'tambah-item' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>tambah produk/jasa</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat menambah produk/jasa
                      </span>
                    </div>
                  )) ||
                  (cb.label === 'hapus-item' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>hapus produk/jasa</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat menghapus produk/jasa
                      </span>
                    </div>
                  )) ||
                  (cb.label === 'balas-diskusi' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>balas diskusi</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat membalas diskusi
                      </span>
                    </div>
                  )) ||
                  (cb.label === 'hapus-diskusi' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>hapus diskusi</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat menghapus diskusi
                      </span>
                    </div>
                  )) ||
                  (cb.label === 'tambah-voucher' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>tambah voucher</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat membuat voucher
                      </span>
                    </div>
                  )) ||
                  (cb.label === 'hapus-voucher' && (
                    <div className={classes.desk}>
                      <span className={classes.label}>hapus voucher</span>
                      <span className={classes.ket}>
                        anggota dengan akses ini dapat menghapus voucher
                      </span>
                    </div>
                  ))
                }
              />
            ))}
          </div>

          <Button
            variant="contained"
            color="primary"
            onClick={onUpdate}
            style={{ marginTop: 15 }}>
            submit
          </Button>
        </div>
      </CompDialog>
    </div>
  );
}

export default Izin;
