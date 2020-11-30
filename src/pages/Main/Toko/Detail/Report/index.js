import useStyles from './styles';

// material-ui core
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

function Report() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.filter}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <Select labelId="select-bulan" id="select-bulan" value="Januari">
            <MenuItem value="Januari">Januari</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className={classes.report}>
        <div className={classes.cardReport}>
          <label className={classes.date}>30 Januari 2020</label>
          <div className={classes.wrapperCardProduk}>
            <div className={classes.card}>
              <img
                src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
                alt=""
                className={classes.img}
              />
              <div className={classes.descCard}>
                <span className={classes.nama}>
                  Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
                </span>
                <span className={classes.harga}>Rp.39.000</span>
                <div className={classes.wrapperTerjual}>
                  <span className={classes.labelTerjual}>terjual: 1</span>
                  <span className={classes.total}>total: Rp.39.000</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.wrapperTotalPenjualan}>
            <label className={classes.labelTotalPenjualan}>
              total penjualan
            </label>
            <span className={classes.totalPenjualan}>Rp.39.000</span>
          </div>
        </div>
        <div className={classes.wrapperInfo}>
          <div className={classes.input}>
            <label className={classes.label}>total penjualan</label>
            <span className={classes.text}>Rp.39.000</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>potongan admin</label>
            <span className={classes.text}>5%</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>nominal potongan</label>
            <span className={classes.text}>Rp.5.000</span>
          </div>
          <div className={classes.input}>
            <label className={classes.label}>total penjualan bersih</label>
            <span className={classes.text}>Rp.34.000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
