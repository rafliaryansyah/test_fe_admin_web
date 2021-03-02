/* eslint-disable react/no-children-prop */
import { Route } from 'react-router-dom';
import propTypes from 'prop-types';

// material-ui core
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// react icons
import {
  IoHomeOutline,
  IoPersonCircleOutline,
  IoStorefrontOutline,
  IoGridOutline,
  IoTicketOutline,
  IoListOutline,
  IoImagesOutline,
  IoPricetagOutline
} from 'react-icons/io5';

function SideBar({ variant, style }) {
  switch (variant) {
    case 'admin':
      return (
        <div className={style}>
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
            path="/user"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/user');
                  }}>
                  <ListItemIcon>
                    <IoPersonCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary="User" />
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
        </div>
      );

    case 'contributor':
      return (
        <div className={style}>
          <Route
            path="/user"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/user');
                  }}>
                  <ListItemIcon>
                    <IoPersonCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary="User" />
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
        </div>
      );

    case 'finance':
      return (
        <div className={style}>
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
            path="/user"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/user');
                  }}>
                  <ListItemIcon>
                    <IoPersonCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary="User" />
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
        </div>
      );

    default:
      return (
        <div className={style}>
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
            path="/user"
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/user');
                  }}>
                  <ListItemIcon>
                    <IoPersonCircleOutline />
                  </ListItemIcon>
                  <ListItemText primary="User" />
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
        </div>
      );
  }
}

SideBar.propTypes = {
  variant: propTypes.string,
  style: propTypes.any
};

export default SideBar;
