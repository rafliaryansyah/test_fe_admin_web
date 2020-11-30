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
import { CardToko, Paginasi } from '../../../../components';

const ListToko = ({ history }) => {
  const classes = useStyles();

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
        <CardToko
          srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          nama="sanjaya"
          status="aktif"
          alamat="Surabaya"
          bukaSejak="26 November 2020"
          handleDetail={() => history.push('/toko/detail')}
        />
        <CardToko
          srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          nama="sanjaya"
          status="aktif"
          alamat="Surabaya"
          bukaSejak="26 November 2020"
          handleDetail={() => history.push('/toko/detail')}
        />
        <CardToko
          srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          nama="sanjaya"
          status="aktif"
          alamat="Surabaya"
          bukaSejak="26 November 2020"
          handleDetail={() => history.push('/toko/detail')}
        />
        <CardToko
          srcImage="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
          nama="sanjaya"
          status="aktif"
          alamat="Surabaya"
          bukaSejak="26 November 2020"
          handleDetail={() => history.push('/toko/detail')}
        />
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
};

ListToko.propTypes = {
  history: propTypes.object
};

export default ListToko;
