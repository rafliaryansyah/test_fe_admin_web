import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';

// useTheme
import { useTheme } from '@material-ui/core/styles';

// material-ui core
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core';

// material-ui icons
import {
  Menu,
  ChevronRight,
  ChevronLeft,
  Inbox,
  Mail,
  Dashboard,
  Group,
  Store,
  BorderAll,
  Style,
  ShoppingBasket,
  ExitToApp
} from '@material-ui/icons';

// Pages
import DashboardPage from './Dahsboard';
import Customers from './Customers';
import Toko from './Toko';
import Category from './Category';
import Voucher from './Voucher';
import UserLogs from './UserLogs';
import Banner from './Banner';
import Promo from './Promo';
import Profile from './Profile';

// components
import { PrivateRoute, ConfirmDialog, NavLink } from 'components';

function Main({ history }) {
  const classes = useStyles();
  const theme = useTheme();

  const [drawerNav, setDrawerNav] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <div className={classes.appBar}>
        <div className={classes.buttonDanTitle}>
          <IconButton onClick={() => setDrawerNav(!drawerNav)} color="primary">
            <Menu />
          </IconButton>
          <label className={classes.title}>Grocery App</label>
        </div>
        <div className={classes.wrapperAvatar}>
          <IconButton
            onClick={() => history.push('/profile')}
            className={classes.avatar}>
            <Avatar alt="Remy Sharp" src="" />
          </IconButton>
          <div className={classes.teks}>
            <span className={classes.nama}>budiman</span>
            <span className={classes.akses}>admin</span>
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
                      setDrawerNav(false);
                      history.push('/');
                    }}>
                    <ListItemIcon>
                      <Dashboard
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Dashboard"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      setDrawerNav(false);
                      history.push('/customers');
                    }}>
                    <ListItemIcon>
                      <Group className={match ? classes.labelAktif : null} />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Customers"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      setDrawerNav(false);
                      history.push('/toko');
                    }}>
                    <ListItemIcon>
                      <Store className={match ? classes.labelAktif : null} />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Toko"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      setDrawerNav(false);
                      history.push('/category');
                    }}>
                    <ListItemIcon>
                      <BorderAll
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Category"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      setDrawerNav(false);
                      history.push('/voucher');
                    }}>
                    <ListItemIcon>
                      <Style className={match ? classes.labelAktif : null} />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Voucher"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      setDrawerNav(false);
                      history.push('/user-logs');
                    }}>
                    <ListItemIcon>
                      <ShoppingBasket
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="User Logs"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
                  </ListItem>
                );
              }}
            />

            <Route
              path="/banner"
              children={({ match, history }) => {
                return (
                  <ListItem
                    button
                    selected={match ? true : false}
                    onClick={() => {
                      setDrawerNav(false);
                      history.push('/banner');
                    }}>
                    <ListItemIcon>
                      <ShoppingBasket
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Banner"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
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
                      <ShoppingBasket
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    {drawerNav ? (
                      <ListItemText
                        primary="Promo"
                        className={match ? classes.labelAktif : null}
                      />
                    ) : null}
                  </ListItem>
                );
              }}
            />
          </List>
        </div>

        <div className={classes.keluar}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => {
              setDrawerNav(false);
              setOpen(true);
            }}>
            {drawerNav ? 'keluar' : <ExitToApp />}
          </Button>
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
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={DashboardPage} />
        </Switch>
        <div className={classes.footer}>
          <span className={classes.copyRight}>
            © {new Date().getFullYear()} || Kabayan Coding
          </span>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        submit={() => console.log('keluar')}
        title="Keluar dari Grocery">
        Apakah anda yakin ingin keluar dari Grocery?
      </ConfirmDialog>
    </div>
  );
}

export default Main;
