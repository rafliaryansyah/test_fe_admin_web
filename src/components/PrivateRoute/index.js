import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

export function PrivateRoute({ component: Component, ...rest }) {
  const user = false;
  return (
    <Route
      {...rest}
      render={props => {
        return user ? (
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
  component: propTypes,
  props: propTypes.object,
  location: propTypes.object
};
