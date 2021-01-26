import useStyles from './styles';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';

// utils
import { currency } from 'utils';

function ListProduk({ dataProduks, history }) {
  const classes = useStyles();

  // id toko
  const { id } = useParams();

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardGrid}>
        {dataProduks?.map(data => (
          <CardProduk
            key={data.id}
            srcImage={data.images?.[0].image}
            nama={data.name}
            harga={currency(data.price)}
            type={data.images[0].type}
            stok={data.stock}
            status={data.status}
            handleDetail={() => {
              history.push(`/toko/${id}/produk/${data.id}`);
            }}
          />
        ))}
      </div>

      <Paginasi count={5} page={1} onClick={(e, value) => value} />
    </div>
  );
}

ListProduk.propTypes = {
  dataProduks: propTypes.array
};

const mapStateToProps = state => ({
  dataProduks: state.stores.produks
});

export default connect(mapStateToProps, null)(ListProduk);
