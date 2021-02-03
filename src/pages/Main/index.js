/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';

// material-ui core
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core';

// react icons
import {
  IoMenuOutline,
  IoHomeOutline,
  IoPersonCircleOutline,
  IoStorefrontOutline,
  IoGridOutline,
  IoTicketOutline,
  IoListOutline,
  IoImagesOutline,
  IoPricetagOutline,
  IoExitOutline
} from 'react-icons/io5';

// Pages
import DashboardPage from './Dahsboard';
import Customers from './Customers';
import Toko from './Toko';
import Category from './Category';
import Voucher from './Voucher';
import UserLogs from './UserLogs';
import Banner from './Banner';
import Promo from './Promo';
import Kurir from './Kurir';
import Izin from './Izin';
import ProdukTerkait from './ProdukTerkait';
import Profile from './Profile';

// components
import { PrivateRoute, ConfirmDialog } from 'components';

function Main({ history }) {
  const classes = useStyles();

  const [drawerNav, setDrawerNav] = useState(true);
  const [open, setOpen] = useState(false);

  // data profile admin form localstorage
  const user = JSON.parse(localStorage.getItem('user'));

  // keluar dari app
  const logout = () => {
    setOpen(false);
    localStorage.clear();
    history.push('/login');
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.appBar}>
        <div className={classes.buttonDanTitle}>
          <IconButton onClick={() => setDrawerNav(!drawerNav)} color="primary">
            <IoMenuOutline />
          </IconButton>
          <label className={classes.title}>Grocery App</label>
        </div>
        <div className={classes.wrapperAvatar}>
          <IconButton
            onClick={() => history.push('/profile')}
            className={classes.avatar}>
            <Avatar alt={user?.name} src={user?.image} />
          </IconButton>
          <div className={classes.teks}>
            <span className={classes.nama}>{user?.name}</span>
            <span className={classes.akses}>
              {user?.role === 'super-admin-ecommerce' && 'super admin'}
            </span>
          </div>
        </div>
      </div>

      <div className={drawerNav ? classes.menu : classes.menuShift}>
        <div className={classes.wrapperList}>
          <List component="nav">
            <Route
              exact
              path="/"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/');
                    }}>
                    <ListItemIcon>
                      <IoHomeOutline className={match && classes.labelAktif} />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Dashboard"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/customers"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/customers');
                    }}>
                    <ListItemIcon>
                      <IoPersonCircleOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Customers"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/toko"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/toko');
                    }}>
                    <ListItemIcon>
                      <IoStorefrontOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Toko"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/category"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/category');
                    }}>
                    <ListItemIcon>
                      <IoGridOutline className={match && classes.labelAktif} />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Category"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/voucher"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/voucher');
                    }}>
                    <ListItemIcon>
                      <IoTicketOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Voucher"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/user-logs"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/user-logs');
                    }}>
                    <ListItemIcon>
                      <IoListOutline className={match && classes.labelAktif} />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="User Logs"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/banner/main"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/banner/main');
                    }}>
                    <ListItemIcon>
                      <IoImagesOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Banner"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/promo"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      setDrawerNav(false);
                      history.push('/promo');
                    }}>
                    <ListItemIcon>
                      <IoPricetagOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Promo"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/kurir"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/kurir');
                    }}>
                    <ListItemIcon>
                      <IoPricetagOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Kurir"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/izin"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      history.push('/izin');
                    }}>
                    <ListItemIcon>
                      <IoPricetagOutline
                        className={match && classes.labelAktif}
                      />
                    </ListItemIcon>
                    {drawerNav && (
                      <ListItemText
                        primary="Izin"
                        className={match && classes.labelAktif}
                      />
                    )}
                  </ListItem>
                );
              }}
            />
          </List>
        </div>

        <div style={{ padding: 15 }}>
          <List component="nav">
            <ListItem
              button
              className={classes.keluar}
              onClick={() => {
                setOpen(true);
              }}>
              {drawerNav ? 'KELUAR' : <IoExitOutline />}
            </ListItem>
          </List>
        </div>
      </div>

      <div className={drawerNav ? classes.main : classes.mainShift}>
        <Switch>
          <PrivateRoute path="/customers" component={Customers} />
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
        <div className={classes.footer}>
          <span className={classes.copyRight}>
            Copyright © 2020 - {new Date().getFullYear()} Grocery Web Admin All
            Right Reserved
          </span>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        submit={logout}
        title="Keluar">
        Apakah anda yakin ingin keluar?
      </ConfirmDialog>
    </div>
  );
}

export default Main;
