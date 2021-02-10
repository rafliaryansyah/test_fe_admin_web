import useStyles from './styles';
import propTypes from 'prop-types';
import { useParams } from 'react-router-dom';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';

// utils
import { currency } from 'utils';

// services
import { getStore } from 'services';
import { useEffect, useState } from 'react';

function ListProduk({ history }) {
  const classes = useStyles();

  // id toko
  const { id } = useParams();

  // data paginasi
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  // data items toko
  const [items, setItems] = useState([]);

  // read data items toko
  useEffect(() => {
    getStore(id).then(res => {
      const produks = res.data.data.merchantProductsAndService.products.data;
      const services = res.data.data.merchantProductsAndService.services.data;

      setItems(produks.concat(services));

      setLastPage(res.data.data.merchantProductsAndService.products.last_page);
      setCurrentPage(
        res.data.data.merchantProductsAndService.products.current_page
      );
    });
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.cardGrid}>
        {items?.map(item => (
          <CardProduk
            key={item.id}
            srcImage={item.images?.[0].image}
            nama={item.name}
            harga={currency(item.price)}
            type={item.images?.[0].type}
            stok={item.stock}
            status={item.status}
            handleDetail={() => {
              history.push(`/toko/${id}/produk/${item.id}`);
            }}
          />
        ))}
      </div>

      <Paginasi
        count={lastPage}
        page={currentPage}
        onChange={(e, value) => {
          getStore(id, value).then(res => {
            const produks = Object.values(
              res.data.data.merchantProductsAndService.products.data
            );
            const services = Object.values(
              res.data.data.merchantProductsAndService.services.data
            );

            setItems(produks.concat(services));

            setLastPage(
              res.data.data.merchantProductsAndService.products?.last_page
            );
            setCurrentPage(
              res.data.data.merchantProductsAndService.products?.current_page
            );
          });
        }}
      />
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
