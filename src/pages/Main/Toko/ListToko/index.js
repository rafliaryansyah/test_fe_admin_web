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

function ListToko({ history }) {
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
              <th className={classes.th}>Alamat</th>
              <th className={classes.th}>Followers</th>
              <th className={classes.th}>Buka Sejak</th>
              <th className={classes.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              onClick={() => history.push("/toko/detail")}
              className={classes.tr}
            >
              <td className={classes.td}>1</td>
              <td className={classes.td}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://ecs7-p.tokopedia.net/img/cache/215-square/shops-1/2019/3/14/5302311/5302311_37d54ee7-b6a1-467b-9ba7-b852243d0bdb.jpg"
                />
              </td>
              <td className={classes.td}>Photobook Indonesia</td>
              <td className={classes.td}>Jakarta Selatan</td>
              <td className={classes.td}>361</td>
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

export default ListToko;
