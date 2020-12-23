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
import { CardToko, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';
import { setStores } from 'modules';

// services
import { getStores } from 'services';

// utils
import { dateConverterRes } from 'utils';

const ListToko = ({ dataStores, setDataStores, history }) => {
  const classes = useStyles();

  useEffect(() => {
    getStores().then(res => {
      setDataStores(res.data.data);
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-status">Semua Status</InputLabel>
          <Select
            labelId="select-status"
            id="select-status"
            value="User"
            // onChange={handleChange}
            label="Semua Status">
            <MenuItem value="User">Aktif</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Search By Name"
            endAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className={classes.wrapperCard}>
        {dataStores &&
          dataStores.map(data => (
            <CardToko
              key={data.id}
              srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
              nama={data.name}
              status={data.status && data.status.name}
              alamat={data.address}
              bukaSejak={dateConverterRes(data.joinedAt)}
              handleDetail={() => history.push(`/toko/${data.id}`)}
            />
          ))}
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
};

ListToko.propTypes = {
  dataStores: propTypes.array,
  setDataStores: propTypes.func
};

const mapStateToProps = state => ({
  dataStores: state.stores.stores
});
const mapDispatchToProps = dispatch => ({
  setDataStores: value => dispatch(setStores(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListToko);
