import { Switch } from 'react-router-dom';
import propTypes from 'prop-types';

// components
import { PrivateRoute } from 'components';

// Pages
import DashboardPage from '../../../pages/Main/Dahsboard';
import Customers from '../../../pages/Main/Customers';
import Toko from '../../../pages/Main/Toko';
import Category from '../../../pages/Main/Category';
import Voucher from '../../../pages/Main/Voucher';
import UserLogs from '../../../pages/Main/UserLogs';
import Banner from '../../../pages/Main/Banner';
import Promo from '../../../pages/Main/Promo';
import Kurir from '../../../pages/Main/Kurir';
import Izin from '../../../pages/Main/Izin';
import ProdukTerkait from '../../../pages/Main/ProdukTerkait';
import Profile from '../../../pages/Main/Profile';

function SwitchPageRoute({ variant }) {
  switch (variant) {
    case 'admin':
      return (
        <Switch>
          <PrivateRoute path="/user" component={Customers} />
          <PrivateRoute path="/toko" component={Toko} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/voucher" component={Voucher} />
          <PrivateRoute path="/user-logs" component={UserLogs} />
          <PrivateRoute path="/banner" component={Banner} />
          <PrivateRoute path="/promo" component={Promo} />
          <PrivateRoute path="/kurir" component={Kurir} />
          <PrivateRoute path="/produk-terkait" component={ProdukTerkait} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={DashboardPage} />
        </Switch>
      );

    case 'contributor':
      return (
        <Switch>
          <PrivateRoute path="/user" component={Customers} />
          <PrivateRoute path="/toko" component={Toko} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/voucher" component={Voucher} />
          <PrivateRoute path="/banner" component={Banner} />
          <PrivateRoute path="/promo" component={Promo} />
          <PrivateRoute path="/kurir" component={Kurir} />
          <PrivateRoute path="/produk-terkait" component={ProdukTerkait} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      );

    case 'finance':
      return (
        <Switch>
          <PrivateRoute path="/user" component={Customers} />
          <PrivateRoute path="/toko" component={Toko} />
          <PrivateRoute path="/promo" component={Promo} />
          <PrivateRoute path="/produk-terkait" component={ProdukTerkait} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={DashboardPage} />
        </Switch>
      );

    default:
      return (
        <Switch>
          <PrivateRoute path="/user" component={Customers} />
          <PrivateRoute path="/toko" component={Toko} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/voucher" component={Voucher} />
          <PrivateRoute path="/user-logs" component={UserLogs} />
          <PrivateRoute path="/banner" component={Banner} />
          <PrivateRoute path="/promo" component={Promo} />
          <PrivateRoute path="/kurir" component={Kurir} />
          <PrivateRoute path="/izin" component={Izin} />
          <PrivateRoute path="/produk-terkait" component={ProdukTerkait} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={DashboardPage} />
        </Switch>
      );
  }
}

SwitchPageRoute.propTypes = {
  variant: propTypes.string
};

export default SwitchPageRoute;
