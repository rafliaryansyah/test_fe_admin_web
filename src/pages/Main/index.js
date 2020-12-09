import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';

// material-ui core
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// material-ui icons
import MenuIcon from '@material-ui/icons/Menu';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import StyleIcon from '@material-ui/icons/Style';

// Pages
import Dashboard from './Dahsboard';
import Customers from './Customers';
import Toko from './Toko';
import Category from './Category';
import Voucher from './Voucher';
import UserLogs from './UserLogs';
import Banner from './Banner';
import Promo from './Promo';
import Profile from './Profile';

// components
import { PrivateRoute, ConfirmDialog } from '../../components';

function Main({ history }) {
  const classes = useStyles();

  const [drawerNav, setDrawerNav] = useState(false);
  const [open, setOpen] = useState(false);

  const logout = () => {
    setOpen(false);
    localStorage.removeItem('token');
    history.push('/login');
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <IconButton
          onClick={() => setDrawerNav(!drawerNav)}
          className={classes.toggle}>
          <MenuIcon />
        </IconButton>
        <label className={classes.title}>
          <Switch>
            <Route exact path="/" children="Grocery Web Admin" />
            <Route path="/customers" children="customers" />
            <Route path="/toko" children="toko" />
            <Route path="/orders" children="orders" />
            <Route path="/category" children="category" />
            <Route path="/voucher" children="voucher" />
          </Switch>
        </label>
        <Route
          path="/profile"
          children={({ history }) => {
            return (
              <IconButton
                onClick={() => history.push('/profile')}
                className={classes.avatar}>
                <Avatar alt="Remy Sharp" src="" />
              </IconButton>
            );
          }}
        />
      </div>

      <SwipeableDrawer
        anchor="left"
        open={drawerNav}
        onClose={() => setDrawerNav(false)}
        onOpen={() => setDrawerNav(!drawerNav)}
        className={classes.menu}>
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
                      <DashboardIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Dashboard"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <GroupIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Customers"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <StoreIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Toko"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <BorderAllIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Category"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <StyleIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Voucher"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <ShoppingBasketIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="User Logs"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <ShoppingBasketIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Banner"
                      className={match ? classes.labelAktif : null}
                    />
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
                      <ShoppingBasketIcon
                        className={match ? classes.labelAktif : null}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary="Promo"
                      className={match ? classes.labelAktif : null}
                    />
                  </ListItem>
                );
              }}
            />
          </List>
        </div>

        <div className={classes.keluar}>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => {
              setDrawerNav(false);
              setOpen(true);
            }}>
            keluar
          </Button>
        </div>
      </SwipeableDrawer>

      <div className={classes.main}>
        <Switch>
          <PrivateRoute path="/customers" component={Customers} />
          <PrivateRoute path="/toko" component={Toko} />
          <PrivateRoute path="/category" component={Category} />
          <PrivateRoute path="/voucher" component={Voucher} />
          <PrivateRoute path="/user-logs" component={UserLogs} />
          <PrivateRoute path="/banner" component={Banner} />
          <PrivateRoute path="/promo" component={Promo} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute exact path="/" component={Dashboard} />
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
        submit={logout}
        title="Keluar dari Grocery">
        Apakah anda yakin ingin keluar dari Grocery?
      </ConfirmDialog>
    </div>
  );
}

export default Main;
