import useStyles from './styles';
import { Switch, Redirect, useParams } from 'react-router-dom';

// material-ui core
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// react icons
import { IoArrowBackOutline } from 'react-icons/io5';

// components
import { PrivateRoute } from '../../../../components';

// pages tab
import Beranda from './Beranda';
import Produk from './Produk';
import Report from './Report';

function Detail({ history, location }) {
  const classes = useStyles();

  const { id } = useParams();

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapperTitlePage}>
        <IconButton onClick={() => history.goBack()}>
          <IoArrowBackOutline />
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
          <Tab label="Beranda" value={`/toko/${id}`} />
          <Tab label="Produk / Jasa" value={`/toko/${id}/produk`} />
          <Tab label="Report" value={`/toko/${id}/report`} />
        </Tabs>
        <div className={classes.tabsMain}>
          <Switch>
            <PrivateRoute exact path="/toko/:id" component={Beranda} />
            <PrivateRoute path="/toko/:id/produk" component={Produk} />
            <PrivateRoute path="/toko/:id/report" component={Report} />
            <Redirect to="/toko/:id" />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Detail;
