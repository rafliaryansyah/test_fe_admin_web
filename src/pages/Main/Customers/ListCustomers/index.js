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
import { getCustomer } from 'services';

// redux
import { connect } from 'react-redux';
import { setCustomers } from 'modules';

function ListCustomers({ dataCustomers, history }) {
  const classes = useStyles();

  useEffect(() => {
    const resultGet = getCustomer();
    if (resultGet.success) {
      setCustomers(resultGet.data);
    }
    return resultGet;
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
        {dataCustomers.map(data => (
          <CardCustomers
            handleDetail={() => history.push('/customers/detail')}
          />
        ))}
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
}

ListCustomers.propTypes = {
  dataCustomers: propTypes.array
};

const mapStateToProps = state => ({
  dataCustomers: state.customer.customers
});

export default connect(mapStateToProps, null)(ListCustomers);
