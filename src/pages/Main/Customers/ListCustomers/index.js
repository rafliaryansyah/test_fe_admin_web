import { useEffect, useState } from 'react';
import useStyles from './styles';

// material-ui core
import {
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Chip
} from '@material-ui/core';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

// components
import { CardCustomers, Paginasi } from 'components';

// services
import { getCustomers } from 'services';

function ListCustomers({ history }) {
  const classes = useStyles();

  // data filter role
  const [roles] = useState([
    { name: 'Semua Role', value: '' },
    { name: 'Customer', value: 'customer' },
    { name: 'Super Admin Merchant', value: 'super-admin-merchant' },
    { name: 'Admin Merchant', value: 'admin-merchant' },
    { name: 'Contributor Merchant', value: 'contributor-merchant' },
    { name: 'Finance Merchant', value: 'finance-merchant' },
    { name: 'Admin Ecommerce', value: 'admin-ecommerce' },
    { name: 'Contributor Ecommerce', value: 'contributor-ecommerce' },
    { name: 'Finance Ecommerce', value: 'finance-ecommerce' }
  ]);

  // data paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data hasil pencarian
  const [count, setCount] = useState(0);

  // data customers
  const [customers, setCustomers] = useState([]);

  // read data customers
  useEffect(() => {
    getCustomers().then(res => {
      setCustomers(res.data.data);
      setCurrentPage(res.data.meta.current_page);
      setLastPage(res.data.meta.last_page);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <Chip
          label={`Hasil Pencarian : ${count ? count : 0}`}
          variant="default"
        />
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-role">Semua Role</InputLabel>
          <Select
            labelId="select-role"
            name="select-role"
            id="select-role"
            onChange={e =>
              getCustomers(e.target.value).then(res => {
                setCustomers(res.data.data);
              })
            }
            label="Semua Role">
            {roles?.map((role, index) => (
              <MenuItem key={index} value={role.value}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            onChange={e =>
              getCustomers('', e.target.value).then(res => {
                setCustomers(res.data.data);
                setCount(res.data.count);
              })
            }
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.wrapperCard}>
        {customers?.map(user => (
          <CardCustomers
            key={user.id}
            nama={user.name}
            status={
              user.statusUser?.name === 'Active' ? 'aktif' : 'tidak aktif'
            }
            jenisKelamin={
              user.gender?.id !== ''
                ? user.gender?.id === 1
                  ? 'Laki-Laki'
                  : 'Perempuan'
                : null
            }
            email={user.email}
            noTelp={user.phone}
            roles={user.roles}
            handleDetail={() => history.push(`/customers/${user.id}`)}
          />
        ))}
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) =>
          getCustomers('', '', value).then(res => {
            setCustomers(res.data.data);
            setCurrentPage(res.data.meta.current_page);
          })
        }
      />
    </div>
  );
}

export default ListCustomers;
