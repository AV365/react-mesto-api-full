import React from "react";
import { Route, Redirect } from "react-router-dom";
import { debug } from "prettier/doc";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
    </Route>
  );
};

export default ProtectedRoute;
