import useStyles from "./styles";

function Produk() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.cardProduk}>
        <div className={classes.gambar}>
          <img
            src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
            alt="foto produk"
            className={classes.gambar}
          />
        </div>
        <div className={classes.desk}>
          <label className={classes.nama}>
            Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
          </label>
          <div className={classes.wrapperDiskonHarga}>
            <span className={classes.diskon}>84%</span>
            <span className={classes.hargaNormal}>Rp. 240.000</span>
          </div>
          <label className={classes.hargaDiskon}>Rp 39.000</label>
          <label className={classes.rating}></label>
        </div>
      </div>
      <div className={classes.cardProduk}>
        <div className={classes.gambar}>
          <img
            src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
            alt="foto produk"
            className={classes.gambar}
          />
        </div>
        <div className={classes.desk}>
          <label className={classes.nama}>
            Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
          </label>
          <div className={classes.wrapperDiskonHarga}>
            <span className={classes.diskon}>84%</span>
            <span className={classes.hargaNormal}>Rp. 240.000</span>
          </div>
          <label className={classes.hargaDiskon}>Rp 39.000</label>
          <label className={classes.rating}></label>
        </div>
      </div>
      <div className={classes.cardProduk}>
        <div className={classes.gambar}>
          <img
            src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
            alt="foto produk"
            className={classes.gambar}
          />
        </div>
        <div className={classes.desk}>
          <label className={classes.nama}>
            Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
          </label>
          <div className={classes.wrapperDiskonHarga}>
            <span className={classes.diskon}>84%</span>
            <span className={classes.hargaNormal}>Rp. 240.000</span>
          </div>
          <label className={classes.hargaDiskon}>Rp 39.000</label>
          <label className={classes.rating}></label>
        </div>
      </div>
      <div className={classes.cardProduk}>
        <div className={classes.gambar}>
          <img
            src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
            alt="foto produk"
            className={classes.gambar}
          />
        </div>
        <div className={classes.desk}>
          <label className={classes.nama}>
            Custom Kalender Meja 6 x 8 ( 15cm x 20cm )
          </label>
          <div className={classes.wrapperDiskonHarga}>
            <span className={classes.diskon}>84%</span>
            <span className={classes.hargaNormal}>Rp. 240.000</span>
          </div>
          <label className={classes.hargaDiskon}>Rp 39.000</label>
          <label className={classes.rating}></label>
        </div>
      </div>
    </div>
  );
}

export default Produk;
