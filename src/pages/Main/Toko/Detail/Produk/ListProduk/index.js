import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStyles from './styles';

// components
import { CardProduk, Paginasi } from 'components';

// utils
import { currency } from 'utils';

// services
import { getStore } from 'services';

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
      <div className={classes.main}>
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

export default ListProduk;
