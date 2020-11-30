import useStyles from './styles';

// material-ui core
import Button from '@material-ui/core/Button';

function Detail() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <img
        src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
        alt="produk"
        className={classes.img}
      />
      <div className={classes.itemLabel}>
        <div className={classes.input}>
          <label className={classes.label}>nama</label>
          <span className={classes.text}>
            Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
          </span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>berat</label>
          <span className={classes.text}>10 gr</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>tipe</label>
          <span className={classes.text}>produk</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>harga</label>
          <span className={classes.text}>Rp.39.000</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>status</label>
          <span className={classes.text}>aktif</span>
        </div>
        <div className={classes.input}>
          <label className={classes.label}>stock</label>
          <span className={classes.text}>15</span>
        </div>
        <Button variant="contained" color="primary" className={classes.button}>
          nonaktifkan
        </Button>
      </div>
    </div>
  );
}

export default Detail;
