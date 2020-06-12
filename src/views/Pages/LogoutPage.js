import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import loginPageStyle from "../../assets/jss/views/loginPageStyle";

import { logoutUserService } from "../../services/user/UserService";

class LogoutPage extends React.Component {
  componentDidMount() {
    logoutUserService().then((logoutResponse) => {
      this.props.history.push(`/auth/login-page`);
    });
  }

  render() {
    return <div />;
  }
}

export default withStyles(loginPageStyle)(LogoutPage);
