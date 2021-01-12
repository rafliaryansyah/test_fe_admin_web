import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import { IconButton } from '@material-ui/core';

// react icons
import { IoArrowBack } from 'react-icons/io5';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';

function CekProduks({ dataProduks, history }) {
  const classes = useStyles();

  // console.log('Produk : ', dataProduks);

  return (
    <div className={classes.wrapper}>
      <IconButton onClick={() => history.push('/category/produk')}>
        <IoArrowBack />
      </IconButton>
      <div className={classes.cardGrid}>
        {/* {dataProduks &&
          dataProduks.map(data => (
            <CardProduk
              key={data.id}
              srcImage="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2020/11/3/e5856c28-7cd8-4e31-ac7f-716739847083.png.webp"
              nama="Custom Kalender Meja 6 x 8 ( 15cm x 20cm )"
              diskon="84%"
              hargaNormal="Rp.240.000"
              hargaDiskon="Rp.39.000"
              rating=""
              handleDetail={() => history.push('/toko/:id/produk/:id')}
            />
          ))} */}
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
}

CekProduks.propTypes = {
  dataProduks: propTypes.array
};

const mapStateToProps = state => ({
  dataProduks: state.stores.produks
});

export default connect(mapStateToProps, null)(CekProduks);
