import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { Context } from "../state/auth";

function withAuthentication(Component) {
  function WithAuthentication(props) {
    const {
      state: { isAuth },
    } = useContext(Context);
    const {
      location: { pathname },
    } = props;

    if (isAuth && pathname === "/login") return <Redirect to="/dashboard" />;
    else if (!isAuth && pathname !== "/login") return <Redirect to="/login" />;
    else return <Component {...props} />;
  }

  return WithAuthentication;
}

export default withAuthentication;
