import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import {
  IconButton,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

// react icons
import { IoSearchOutline, IoArrowBack } from 'react-icons/io5';

// components
import { CardProduk, Paginasi } from 'components';

// redux
import { connect } from 'react-redux';
import { setTerkait } from 'modules';

// services
import {
  getDetailCategoryProducts,
  getDetailCategoryServices,
  detailPromoProduct,
  detailPromoService
} from 'services';

// utils
import { currency } from 'utils';

function ProdukTerkait({ id, dari, dataTerkait, setDataTerkait, history }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <IconButton onClick={() => history.goBack()}>
        <IoArrowBack />
      </IconButton>
      <br />
      <br />
      <div className={classes.itemSatu}>
        <FormControl
          variant="outlined"
          size="small"
          className={classes.formControl}>
          <OutlinedInput
            name="email"
            id="email"
            color="primary"
            placeholder="Cari"
            // onChange={e =>
            //   readVoucher(e.target.value).then(res =>
            //     setDataVoucher(res.data.data)
            //   )
            // }
            endAdornment={
              <InputAdornment position="start">
                <IoSearchOutline />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className={classes.konten}>
        {dataTerkait.data?.map(data => (
          <CardProduk
            key={data.id}
            srcImage={data.images?.[0].image}
            nama={data.name}
            harga={currency(data.price)}
            type={data.images?.[0].type}
            stok={data.stock}
            status={data.status}
            toko={data.merchantInfo?.name}
            alamatToko={data.merchantInfo?.location}
          />
        ))}
      </div>

      <Paginasi
        count={dataTerkait.meta?.last_page}
        page={dataTerkait.meta?.current_page}
        onChange={(e, value) => {
          switch (dari) {
            case 'kategori-produk':
              getDetailCategoryProducts(id, value)
                .then(res => setDataTerkait(res.data))
                .catch(err => err);
              break;
            case 'kategori-service':
              getDetailCategoryServices(id, value)
                .then(res => setDataTerkait(res.data))
                .catch(err => err);
              break;
            case 'promo':
              detailPromoProduct(id, value)
                .then(res => {
                  setDataTerkait(res.data);
                })
                .catch(err => err);
              detailPromoService(id, value)
                .then(res => {
                  setDataTerkait(res.data);
                })
                .catch(err => err);
              break;
            default:
              null;
              break;
          }
        }}
      />
    </div>
  );
}

ProdukTerkait.propTypes = {
  id: propTypes.string,
  dari: propTypes.string,
  dataTerkait: propTypes.object,
  setDataTerkait: propTypes.func
};

const mapStateToProps = state => ({
  id: state.terkait.id,
  dari: state.terkait.dari,
  dataTerkait: state.terkait.terkait
});

const mapDispatchToProps = dispatch => ({
  setDataTerkait: value => dispatch(setTerkait(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProdukTerkait);
