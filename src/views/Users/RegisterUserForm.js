import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/Lock";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardText from "../../components/Card/CardText";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";

// style for this view
import loginPageStyle from "../../assets/jss/views/registerPageStyle";
import validationFormsStyle from "../../assets/jss/views/validationFormsStyle";

import { insertUserService } from "../../services/user/UserService";

const styles = {
  ...loginPageStyle,
  ...validationFormsStyle,
};

class RegisterUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      fullNameState: "",
      email: "",
      emailState: "",
      password: "",
      passwordState: "",
      confirmPassword: "",
      confirmPasswordState: "",
    };
    this.isValidated = this.isValidated.bind(this);
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataUser = {
        name: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        c_password: this.state.confirmPassword,
      };
      insertUserService(dataUser)
        .then((responseRegisterUser) => {
          if (responseRegisterUser.status === 200) {
            this.setState({
              messageError: null,
              successMessage: `Registered user successfully`,
            });
            setTimeout(() => {
              this.props.history.push(`/auth/login-page`);
            }, 3000);
          } else {
            let errosString = "";
            const errors = Object.values(responseRegisterUser.response.data);
            errors.forEach((error) => {
              errosString += error;
            });
            this.setState({
              messageError: errosString,
              successMessage: null,
            });
          }
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    } else {
      console.log("invalid");
    }
  }

  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }

  // function that verifies if two strings are equal
  compare(string1, string2) {
    if (string1 === string2) {
      return true;
    }
    return false;
  }

  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.fullNameState === "success" &&
      this.state.emailState === "success" &&
      this.state.passwordState === "success" &&
      this.state.confirmPasswordState === "success"
    ) {
      return true;
    } else {
      if (this.state.fullNameState !== "success") {
        this.setState({ fullNameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
      if (this.state.passwordState !== "success") {
        this.setState({ passwordState: "error" });
      }
      if (this.state.confirmPasswordState !== "success") {
        this.setState({ confirmPasswordState: "error" });
      }
    }
    return false;
  }
  render() {
    const { classes } = this.props;

    const { messageError, successMessage } = this.state;

    const errorDiv = messageError ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={messageError} color="danger" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    const successDiv = successMessage ? (
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <SnackbarContent message={successMessage} color="success" />
        </GridItem>
      </GridContainer>
    ) : (
      ""
    );

    return (
      <div className={classes.container}>
        {errorDiv}
        {successDiv}
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="danger" text>
                <CardText color="danger">
                  <h4 className={classes.cardTitle}>Register User</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.fullNameState === "success"}
                        error={this.state.fullNameState === "error"}
                        labelText={
                          <span>
                            Full Name <small>(required)</small>
                          </span>
                        }
                        id="fullName"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => this.change(event, "fullName", "length", 5),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <Face className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.emailState === "success"}
                        error={this.state.emailState === "error"}
                        labelText={
                          <span>
                            Email <small>(required)</small>
                          </span>
                        }
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => this.change(event, "email", "email"),
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <Email className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.passwordState === "success"}
                        error={this.state.passwordState === "error"}
                        labelText={
                          <span>
                            Contraseña <small>(requerido)</small>
                          </span>
                        }
                        id="password"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: (event) => this.change(event, "password", "length", 5),
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <Lock className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.confirmPasswordState === "success"}
                        error={this.state.confirmPasswordState === "error"}
                        labelText={
                          <span>
                            Confimar Contraseña <small>(requerido)</small>
                          </span>
                        }
                        id="confirmPassword"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          onChange: (event) =>
                            this.change(event, "confirmPassword", "equalTo", "password"),
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <Lock className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="danger" onClick={this.handleSubmit.bind(this)}>
                  Save
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterUserForm);
