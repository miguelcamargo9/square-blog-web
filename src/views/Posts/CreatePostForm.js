import React from "react";

import { sessionService } from "redux-react-session";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// material ui icons
import FilterList from "@material-ui/icons/FilterList";
import Description from "@material-ui/icons/Description";

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

import { insertPostService } from "../../services/posts/PostService";

const styles = {
  ...loginPageStyle,
  ...validationFormsStyle,
};

class CreatePostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      titleState: "",
      descr: "",
      descrState: "",
    };
    this.isValidated = this.isValidated.bind(this);
  }

  componentDidMount() {
    sessionService
      .loadSession()
      .then((currentSession) => {})
      .catch((err) => {
        console.log(err);
        this.props.history.push("/auth/logout-page");
      });
  }

  handleSubmit() {
    if (this.isValidated()) {
      const dataPost = {
        title: this.state.title,
        description: this.state.descr,
      };
      insertPostService(dataPost)
        .then((responseCretaePost) => {
          if (responseCretaePost.status === 201) {
            this.setState({
              messageError: null,
              successMessage: `Registered post successfully`,
            });
            setTimeout(() => {
              this.props.history.push(`/admin/home`);
            }, 3000);
          } else {
            let errosString = "";
            const errors = Object.values(responseCretaePost.response.data);
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

  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
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
      default:
        break;
    }

    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (this.state.titleState === "success" && this.state.descrState === "success") {
      return true;
    } else {
      if (this.state.titleState !== "success") {
        this.setState({ titleState: "error" });
      }
      if (this.state.descrState !== "success") {
        this.setState({ descrState: "error" });
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
                  <h4 className={classes.cardTitle}>Register Post</h4>
                </CardText>
              </CardHeader>
              <CardBody>
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.titleState === "success"}
                        error={this.state.titleState === "error"}
                        labelText={
                          <span>
                            Title <small>(required)</small>
                          </span>
                        }
                        id="title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => this.change(event, "title", "length", 5),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <FilterList className={classes.inputAdornmentIcon} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={6}>
                      <CustomInput
                        success={this.state.descrState === "success"}
                        error={this.state.descrState === "error"}
                        labelText={
                          <span>
                            Content <small>(required)</small>
                          </span>
                        }
                        id="descr"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          onChange: (event) => this.change(event, "descr", "length", 10),
                          type: "text",
                          endAdornment: (
                            <InputAdornment position="end" className={classes.inputAdornment}>
                              <Description className={classes.inputAdornmentIcon} />
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

export default withStyles(styles)(CreatePostForm);
