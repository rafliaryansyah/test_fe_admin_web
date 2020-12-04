import useStyles from './styles';

// material-ui core
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardActionArea,
  CardContent
} from '@material-ui/core';

// material-ui icons
import { Money } from '@material-ui/icons';

function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.pencarian}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <InputLabel id="select-role">bulan</InputLabel>
          <Select
            labelId="select-role"
            id="select-role"
            value="Januari"
            // onChange={handleChange}
            label="Semua Role">
            <MenuItem value="Januari">Januari</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.main}>
        <div className={classes.itemCart}>cart</div>
        <div className={classes.itemCard}>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total pendapatan</p>
                  <p className={classes.nilai}>Rp.64.100.000</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total order</p>
                  <p className={classes.nilai}>2575</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
          <Card className={classes.card}>
            <CardActionArea>
              <CardContent className={classes.content}>
                <div>
                  <p className={classes.totalPendapatan}>total pengguna</p>
                  <p className={classes.nilai}>3743</p>
                </div>
                <Money />
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
