import { useEffect, useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// react icons
import { IoSearchOutline } from 'react-icons/io5';

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

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: ''
  });

  useEffect(() => {
    getStores().then(res => {
      setDataStores(res.data.data);
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
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-status">Semua Status</InputLabel>
          <Select
            labelId="select-status"
            name="select-status"
            id="select-status"
            onChange={e => {
              getStores(parseInt(e.target.value)).then(res => {
                setDataStores(res.data.data);
              });
            }}
            label="Semua Status">
            <MenuItem value="">Semua Status</MenuItem>
            <MenuItem value="1">Waiting</MenuItem>
            <MenuItem value="2">Approved</MenuItem>
            <MenuItem value="3">Rejected</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small">
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            onChange={e =>
              getStores('', e.target.value).then(res => {
                setDataStores(res.data.data);
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

      <Paginasi
        count={pagination.last_page}
        page={pagination.current_page}
        onChange={(e, value) =>
          getStores('', '', value).then(res => {
            setDataStores(res.data.data);
            setPagination({
              ...pagination,
              current_page: res.data.meta.current_page
            });
          })
        }
      />
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
