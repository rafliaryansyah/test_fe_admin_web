import { Switch } from 'react-router-dom';

// components
import { PrivateRoute } from '../../../../../components';

// pages
import ListProduk from './ListProduk';
import Detail from './Detail';

function Produk() {
    return (
        <Switch>
            <PrivateRoute path="/toko/detail/produk/detail" component={Detail} />
            <PrivateRoute exact component={ListProduk} />
        </Switch>
    );
}

export default Produk;
