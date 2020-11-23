import useStyles from "./styles";

// material-ui core
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

// material-ui icons
import SearchIcon from "@material-ui/icons/Search";

// components
import Paginasi from "../../../../components/Paginasi";

function ListCustomers({ history }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
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

      <div className={classes.wrapperTable}>
        <table cellSpacing="0" className={classes.table}>
          <thead>
            <tr>
              <th className={classes.th}>No</th>
              <th className={classes.th}>Foto</th>
              <th className={classes.th}>Nama</th>
              <th className={classes.th}>Email</th>
              <th className={classes.th}>Kontak</th>
              <th className={classes.th}>Bergabung Sejak</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              className={classes.tr}
              onClick={() => history.push("/customers/detail")}
            >
              <td className={classes.td}>1</td>
              <td className={classes.td}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1549913772-820279f909b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=747&q=80"
                  className={classes.avatar}
                />
              </td>
              <td className={classes.td}>Jhon Doe</td>
              <td className={classes.td}>jhondoe@gmail.com</td>
              <td className={classes.td}>081212121221</td>
              <td className={classes.td}>1 November 2020</td>
              <td className={classes.td}>Aktif</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Paginasi count={5} page={1} onClick={() => console.log("Click")} />
    </div>
  );
}

export default ListCustomers;
