import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

export function PrivateRoute({ component: Component, ...rest }) {
  const access_token = JSON.parse(localStorage.getItem('token'));
  return (
    <Route
      {...rest}
      render={props => {
        return access_token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
        );
      }}
    />
  );
}

PrivateRoute.propTypes = {
  props: propTypes.object,
  location: propTypes.object
};
