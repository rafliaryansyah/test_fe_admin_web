/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useStyles from './styles';
import propTypes from 'prop-types';

// material-ui core
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Avatar,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
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
  IoPricetagOutline
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

function Main({ history, window }) {
  const classes = useStyles();

  // open menu dan konfirmasi keluar
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // data profile admin form localstorage
  const user = JSON.parse(localStorage.getItem('user'));

  // keluar dari app
  const logout = () => {
    setOpen(false);
    localStorage.clear();
    history.push('/login');
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.wrapper}>
      <AppBar position="sticky" color="transparent">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={classes.menuButton}>
            <IoMenuOutline />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            Grocery Admin
          </Typography>

          <div className={classes.grow} />

          <IconButton onClick={() => history.push('/profile')}>
            <Avatar alt={user?.name} src={user?.image} />
          </IconButton>

          <div className={classes.teks}>
            <span className={classes.nama}>{`Halo, ${user?.name}`}</span>
            <span className={classes.akses}>
              {user?.role === 'super-admin-ecommerce' &&
                'super admin ecommerce'}
            </span>
          </div>
        </Toolbar>
      </AppBar>

      <div className={classes.navDanMain}>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen(!mobileOpen)}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}>
              <List component="nav" classes={{ padding: classes.listPadding }}>
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
                          <IoHomeOutline />
                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />
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
                          <IoPersonCircleOutline />
                        </ListItemIcon>
                        <ListItemText primary="Customers" />
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
                          <IoStorefrontOutline />
                        </ListItemIcon>
                        <ListItemText primary="Toko" />
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
                          <IoGridOutline />
                        </ListItemIcon>
                        <ListItemText primary="Category" />
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
                          <IoTicketOutline />
                        </ListItemIcon>
                        <ListItemText primary="Voucher" />
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
                          <IoListOutline />
                        </ListItemIcon>
                        <ListItemText primary="User Logs" />
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
                          <IoImagesOutline />
                        </ListItemIcon>
                        <ListItemText primary="Banner" />
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
                          history.push('/promo');
                        }}>
                        <ListItemIcon>
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Promo" />
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
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Kurir" />
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
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Izin" />
                      </ListItem>
                    );
                  }}
                />
              </List>

              <div style={{ margin: '0px 15px 15px 15px' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setOpen(true)}>
                  keluar
                </Button>
              </div>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open>
              <List component="nav" classes={{ padding: classes.listPadding }}>
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
                          <IoHomeOutline />
                        </ListItemIcon>

                        <ListItemText primary="Dashboard" />
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
                          <IoPersonCircleOutline />
                        </ListItemIcon>
                        <ListItemText primary="Customers" />
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
                          <IoStorefrontOutline />
                        </ListItemIcon>
                        <ListItemText primary="Toko" />
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
                          <IoGridOutline />
                        </ListItemIcon>
                        <ListItemText primary="Category" />
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
                          <IoTicketOutline />
                        </ListItemIcon>
                        <ListItemText primary="Voucher" />
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
                          <IoListOutline />
                        </ListItemIcon>
                        <ListItemText primary="User Logs" />
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
                          <IoImagesOutline />
                        </ListItemIcon>
                        <ListItemText primary="Banner" />
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
                          history.push('/promo');
                        }}>
                        <ListItemIcon>
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Promo" />
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
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Kurir" />
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
                          <IoPricetagOutline />
                        </ListItemIcon>
                        <ListItemText primary="Izin" />
                      </ListItem>
                    );
                  }}
                />
              </List>

              <div style={{ margin: '0px 15px 15px 15px' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => setOpen(true)}>
                  keluar
                </Button>
              </div>
            </Drawer>
          </Hidden>
        </nav>

        <div className={classes.main}>
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
              Copyright © 2020 - {new Date().getFullYear()} Grocery Web Admin
              All Right Reserved
            </span>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={open}
        close={() => setOpen(false)}
        submit={logout}
        title="Yakin keluar ?"
      />
    </div>
  );
}

Main.propTypes = {
  window: propTypes.func
};

export default Main;
