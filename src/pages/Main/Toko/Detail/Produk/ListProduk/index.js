import useStyles from './styles';
import propTypes from 'prop-types';

// components
import { CardProduk } from '../../../../../../components';

function ListProduk({ history }) {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CardProduk
        srcImage="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
        nama="Custom Kalender Meja 6 x 8 ( 15cm x 20cm )"
        diskon="84%"
        hargaNormal="Rp.240.000"
        hargaDiskon="Rp.39.000"
        rating=""
        handleDetail={() => history.push('/toko/detail/produk/detail')}
      />
      <CardProduk
        srcImage="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
        nama="Custom Kalender Meja 6 x 8 ( 15cm x 20cm )"
        diskon="84%"
        hargaNormal="Rp.240.000"
        hargaDiskon="Rp.39.000"
        rating=""
        handleDetail={() => history.push('/toko/detail/produk/detail')}
      />
      <CardProduk
        srcImage="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
        nama="Custom Kalender Meja 6 x 8 ( 15cm x 20cm )"
        diskon="84%"
        hargaNormal="Rp.240.000"
        hargaDiskon="Rp.39.000"
        rating=""
        handleDetail={() => history.push('/toko/detail/produk/detail')}
      />
      <CardProduk
        srcImage="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
        nama="Custom Kalender Meja 6 x 8 ( 15cm x 20cm )"
        diskon="84%"
        hargaNormal="Rp.240.000"
        hargaDiskon="Rp.39.000"
        rating=""
        handleDetail={() => history.push('/toko/detail/produk/detail')}
      />
    </div>
  );
}

ListProduk.propTypes = {
  history: propTypes.object
};

export default ListProduk;
