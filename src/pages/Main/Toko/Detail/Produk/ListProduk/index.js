import useStyles from './styles';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';

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
            srcImage=""
            nama={data.name}
            harga="Rp.20.000"
            type="produk"
            stok="50"
            status="aktif"
            toko="toko dummy"
            alamatToko="Jl. Keberkahan"
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
