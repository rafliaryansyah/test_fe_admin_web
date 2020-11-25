import { Route, Redirect } from 'react-router-dom';

export function PrivateRoute({ component: Component, ...rest }) {
  const user = false;
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
}
