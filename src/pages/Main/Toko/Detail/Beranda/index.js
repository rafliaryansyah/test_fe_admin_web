import useStyles from "./styles";

function Beranda() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div>
        <label className={classes.label}>deskripsi toko</label>
        <p className={classes.deskripsiToko}>
          ~Halo~ Welcome to Photobook Indonesia Produk kami : Album Foto /
          Photobook, Kanvas, Poster, Tumblers, Mugs dan lainnya. Selamat belanja
        </p>
      </div>
      <div>
        <label className={classes.label}>buka sejak</label>
        <p className={classes.deskripsiToko}>1 November 2020</p>
      </div>
    </div>
  );
}

export default Beranda;
