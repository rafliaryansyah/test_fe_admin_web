import useStyles from './styles';
import propTypes from 'prop-types';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';

function ListProduk({ dataProduks, history }) {
  const classes = useStyles();

  console.log('Produk : ', dataProduks);

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardGrid}>
        {dataProduks &&
          dataProduks.map(data => (
            <CardProduk
              key={data.id}
              srcImage={`${data.imagePath}/${data.image[0]}`}
              nama={data.name}
              handleDetail={() => history.push('/toko/:id/produk/:id')}
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
