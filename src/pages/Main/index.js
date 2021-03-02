import { useState } from 'react';
import useStyles from './styles';
import propTypes from 'prop-types';

// jwt
import jwt from 'jsonwebtoken';

// material-ui core
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Hidden,
  Drawer
} from '@material-ui/core';

// react icons
import { IoMenuOutline } from 'react-icons/io5';

// components
import {
  AppBarProfile,
  SideBar,
  SwitchPageRoute,
  ConfirmDialog
} from 'components';

// services
import { logout } from 'services';

function Main({ history, window }) {
  const classes = useStyles();

  // open menu dan konfirmasi keluar
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = useState(false);

  // keluar dari app
  const keluar = async () => {
    // services
    const result = await logout().catch(err => err);

    if (result.success) {
      setOpen(false);
      localStorage.clear();
      history.push('/login');
    } else {
      setOpen(false);
    }
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  // decode token
  const decode = jwt.decode(JSON.parse(localStorage.getItem('token')));

  return (
    <div className={classes.wrapper}>
      <AppBar
        position="sticky"
        color="transparent"
        classes={{ root: classes.root }}>
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

          <AppBarProfile onClick={() => history.push('/profile')} />
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
                paper: classes.paper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}>
              {decode ? (
                decode.roles?.map(
                  role =>
                    (role === 'super-admin-ecommerce' && (
                      <SideBar style={classes.listRoot} />
                    )) ||
                    (role === 'admin-ecommerce' && (
                      <SideBar variant="admin" style={classes.listRoot} />
                    )) ||
                    (role === 'contributor-ecommerce' && (
                      <SideBar variant="contributor" style={classes.listRoot} />
                    )) ||
                    (role === 'finance-ecommerce' && (
                      <SideBar variant="finance" style={classes.listRoot} />
                    ))
                )
              ) : (
                <SideBar style={classes.listRoot} />
              )}

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
                paper: classes.paper
              }}
              variant="permanent"
              open>
              {decode ? (
                decode.roles?.map(
                  role =>
                    (role === 'super-admin-ecommerce' && (
                      <SideBar style={classes.listRoot} />
                    )) ||
                    (role === 'admin-ecommerce' && (
                      <SideBar variant="admin" style={classes.listRoot} />
                    )) ||
                    (role === 'contributor-ecommerce' && (
                      <SideBar variant="contributor" style={classes.listRoot} />
                    )) ||
                    (role === 'finance-ecommerce' && (
                      <SideBar variant="finance" style={classes.listRoot} />
                    ))
                )
              ) : (
                <SideBar style={classes.listRoot} />
              )}

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
          {decode ? (
            decode.roles?.map(
              role =>
                (role === 'super-admin-ecommerce' && <SwitchPageRoute />) ||
                (role === 'admin-ecommerce' && (
                  <SwitchPageRoute variant="admin" />
                )) ||
                (role === 'contributor-ecommerce' && (
                  <SwitchPageRoute variant="contributor" />
                )) ||
                (role === 'finance-ecommerce' && (
                  <SwitchPageRoute variant="finance" />
                ))
            )
          ) : (
            <SwitchPageRoute />
          )}

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
        submit={keluar}
        title="Yakin keluar ?"
      />
    </div>
  );
}

Main.propTypes = {
  window: propTypes.func
};

export default Main;
