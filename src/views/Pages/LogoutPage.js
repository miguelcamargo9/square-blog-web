import React from "react";
import { sessionService } from "redux-react-session";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import loginPageStyle from "../../assets/jss/views/loginPageStyle";

import { logoutUserService } from "../../services/user/UserService";

class LogoutPage extends React.Component {
  componentDidMount() {
    logoutUserService().then((logoutResponse) => {
      sessionService.deleteSession();
      sessionService.deleteUser();
      this.props.history.push(`/auth/login-page`);
    });
  }

  render() {
    return <div />;
  }
}

export default withStyles(loginPageStyle)(LogoutPage);
