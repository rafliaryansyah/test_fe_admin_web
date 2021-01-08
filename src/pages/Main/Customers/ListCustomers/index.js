import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

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

// redux
import { connect } from 'react-redux';
import { setCustomers } from 'modules';

// services
import { getCustomers } from 'services';

function ListCustomers({ setDataCustomers, dataCustomers, history }) {
  const classes = useStyles();

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    getCustomers().then(res => {
      setDataCustomers(res.data.data);
      setPagination({
        ...pagination,
        current_page: res.data.meta.current_page
      });
      setPagination({
        ...pagination,
        last_page: res.data.meta.last_page
      });
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <Chip
          label={`Hasil Pencarian : ${count ? count : 0}`}
          variant="outlined"
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
                setDataCustomers(res.data.data);
              })
            }
            label="Semua Role">
            <MenuItem value="">Semua Role</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="super-admin-merchant">
              Super Admin Merchant
            </MenuItem>
            <MenuItem value="contributor-merchant">
              Contributor Merchant
            </MenuItem>
            <MenuItem value="super-admin-ecommerce">
              Super Admin Ecommerce
            </MenuItem>
            <MenuItem value="admin-ecommerce">Admin Ecommerce</MenuItem>
            <MenuItem value="contributor-ecommerce">
              Contributor Ecommerce
            </MenuItem>
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
                setDataCustomers(res.data.data);
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
        {dataCustomers &&
          dataCustomers.map(user => (
            <CardCustomers
              key={user.id}
              srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
              nama={user.name}
              status={user.statusUser && user.statusUser.name}
              jenisKelamin={user.gender && user.gender.name}
              email={user.email}
              noTelp={user.phone}
              roles={user.roles}
              handleDetail={() => history.push(`/customers/${user.id}`)}
            />
          ))}
      </div>

      <Paginasi
        count={pagination.last_page}
        page={pagination.current_page}
        onChange={(e, value) =>
          getCustomers('', '', value).then(res => {
            setDataCustomers(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
          })
        }
      />
    </div>
  );
}

ListCustomers.propTypes = {
  dataCustomers: propTypes.array,
  setDataCustomers: propTypes.func
};

const mapStateToProps = state => ({
  dataCustomers: state.customer.customers
});

const mapDispatchToProps = dispatch => ({
  setDataCustomers: value => dispatch(setCustomers(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListCustomers);
