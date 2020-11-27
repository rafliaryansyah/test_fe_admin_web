import useStyles from './styles';
import propTypes from 'prop-types';
import { Switch, Redirect } from 'react-router-dom';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// material-ui icons
import { ArrowBack } from '@material-ui/icons';

// components
import { PrivateRoute } from '../../../../components';

// pages tab
import Beranda from './Beranda';
import Produk from './Produk';
import Report from './Report';

function Detail({ history, location }) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.push('/toko')}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={classes.menuTabToko}>
        <Tabs
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
          value={location.pathname}
          onChange={(event, value) => history.push(value)}
          aria-label="disabled tabs example">
          <Tab label="Beranda" value="/toko/detail" />
          <Tab label="Produk" value="/toko/detail/produk" />
          <Tab label="Report" value="/toko/detail/report" />
        </Tabs>
        <div className={classes.tabsMain}>
          <Switch>
            <PrivateRoute exact path="/toko/detail" component={Beranda} />
            <PrivateRoute path="/toko/detail/produk" component={Produk} />
            <PrivateRoute path="/toko/detail/report" component={Report} />
            <Redirect to="/toko/detail" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

Detail.propTypes = {
  history: propTypes.object,
  location: propTypes.object
};

export default Detail;
