import useStyles from './styles';

function Ulasan() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.cardUlasan}>
        <div className={classes.wrapperCardProduk}></div>
        <div className={classes.komentarPembeli}></div>
      </div>
      <div className={classes.cardUlasan}>
        <div className={classes.wrapperCardProduk}></div>
        <div className={classes.komentarPembeli}></div>
      </div>
      <div className={classes.cardUlasan}>
        <div className={classes.wrapperCardProduk}></div>
        <div className={classes.komentarPembeli}></div>
      </div>
      <div className={classes.cardUlasan}>
        <div className={classes.wrapperCardProduk}></div>
        <div className={classes.komentarPembeli}></div>
      </div>
      <div className={classes.cardUlasan}>
        <div className={classes.wrapperCardProduk}></div>
        <div className={classes.komentarPembeli}></div>
      </div>
    </div>
  );
}

export default Ulasan;
