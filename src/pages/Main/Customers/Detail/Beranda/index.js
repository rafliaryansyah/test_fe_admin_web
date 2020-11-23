import useStyles from "./styles";

function Beranda() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <label className={classes.subtitle}>data diri</label>
      <div className={classes.textDisable}>
        <span className={classes.nama}>jhon doe</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>1 november 2020</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>pria</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>jhondoe@gmail.com</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>081212121221</span>
      </div>
      <label className={classes.subtitle}>alamat</label>
      <div className={classes.textDisable}>
        <span className={classes.nama}>
          Jl. Toraja No. 12, RT 023/RW 025, Kelurahan Jaten, Kecamatan Serengan,
          Kota Surakarta
        </span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>Surakarta</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>57157</span>
      </div>
      <div className={classes.textDisable}>
        <span className={classes.nama}>081212121221</span>
      </div>
    </div>
  );
}

export default Beranda;
