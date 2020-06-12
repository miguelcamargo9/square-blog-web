import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import { sessionService } from "redux-react-session";

import { createBrowserHistory } from "history";

import AuthLayout from "./layouts/Auth";
import AdminLayout from "./layouts/Admin";

import configureStore from "./store/configureStore";

import "./assets/scss/template.scss";

const hist = createBrowserHistory();
const store = configureStore();

const validateSession = () => {
  // check if your session is still valid
  return true;
};

const options = {
  refreshOnCheckAuth: true,
  redirectPath: "/auth/login-page",
  driver: "INDEXEDDB",
  validateSession,
};

sessionService
  .initSessionService(store, options)
  .then(() =>
    console.log("Redux React Session is ready and a session was refreshed from your storage")
  )
  .catch(() => console.log("Redux React Session is ready and there is no session in your storage"));

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        <Route path="/auth" component={AuthLayout} />
        <Route path="/admin" component={AdminLayout} />
        <Redirect from="/" to="/admin/home" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
