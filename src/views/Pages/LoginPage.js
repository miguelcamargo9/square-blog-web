import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";

import loginPageStyle from "../../assets/jss/views/loginPageStyle";

import { loginUserService } from "../../services/user/UserService";

import logo from "../../assets/img/logo.jpg";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardAnimaton: "cardHidden",
      user: {
        email: "",
        password: "",
      },
      error: "",
    };
    this.onSubmit = this.onHandleLogin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    this.timeOutFunction = setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }
  componentWillUnmount() {
    clearTimeout(this.timeOutFunction);
    this.timeOutFunction = null;
  }

  onChange(e) {
    const { value, name } = e.target;

    const { user } = this.state;
    user[name] = value;
    this.setState({ user });
  }

  onKeyDown(event, history) {
    if (event.key === "Enter") {
      this.onHandleLogin(history);
    }
  }

  onHandleLogin = (history) => {
    const { user } = this.state;
    if (this.isValidated(user)) {
      loginUserService(user, history)
        .then((responseLoginUser) => {})
        .catch((error) => {
          console.log("ERROR", error);
        });
    } else {
      console.log("Invalid");
    }
  };

  isValidated(user) {
    if (user.email === "" || user.password === "") {
      this.setState({ error: "You must to fill the form." });
      return false;
    }
    return true;
  }

  render() {
    const {
      user: { email, password },
      error,
    } = this.state;
    const { classes } = this.props;

    const errorDiv = error ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={error} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const SubmitButton = withRouter(({ history }) => (
      <Button
        type="submit"
        onClick={() => this.onHandleLogin(history)}
        color="danger"
        simple
        size="lg"
        block
      >
        Send
      </Button>
    ));

    return (
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={6} md={4}>
            <img src={logo} alt="logo" className={classes.img} />
          </GridItem>
          <GridItem xs={12} sm={6} md={4}>
            <Card login className={classes[this.state.cardAnimaton]}>
              <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="danger">
                <h4 className={classes.cardTitle}>LOG IN</h4>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: "email",
                    value: email,
                    onKeyDown: (event) => this.onKeyDown(event, this.props.history),
                    onChange: (event) => this.onChange(event),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  onChange={this.onChange}
                  value={password}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    name: "password",
                    value: password,
                    type: "password",
                    onKeyDown: (event) => this.onKeyDown(event, this.props.history),
                    onChange: (event) => this.onChange(event),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>lock_outline</Icon>
                      </InputAdornment>
                    ),
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <SubmitButton />
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        {errorDiv}
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginPageStyle)(LoginPage);
