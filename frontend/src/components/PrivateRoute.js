import React from 'react';
import { Route, Redirect, Link } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Route
      {...rest}
      render={(props) =>
        token && user && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Link to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
