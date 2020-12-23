import { useEffect } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// material-ui icons
import SearchIcon from '@material-ui/icons/Search';

// components
import { CardCustomers, Paginasi } from 'components';

// services
import { getCustomers } from 'services';

// redux
import { connect } from 'react-redux';
import { setCustomers } from 'modules';

function ListCustomers({ setDataCustomers, dataCustomers, history }) {
  const classes = useStyles();

  useEffect(() => {
    getCustomers().then(res => {
      setDataCustomers(res.data.data);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-role">Semua Role</InputLabel>
          <Select
            labelId="select-role"
            id="select-role"
            value="User"
            // onChange={handleChange}
            label="Semua Role">
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>
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

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
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
