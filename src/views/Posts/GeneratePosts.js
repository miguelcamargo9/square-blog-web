import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Assignment from "@material-ui/icons/Assignment";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import Button from "../../components/CustomButtons/Button";

import { generatePostService } from "../../services/posts/PostService";

import { cardTitle } from "../../assets/jss/template";

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
};

class GeneratePosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
    };
    this.onSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleSubmit = () => {
    generatePostService()
      .then((responseLoginUser) => {
        console.log(responseLoginUser);
        this.setState({ message: "Post imported." });
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
        <GridItem xs={12}>
          <Card>
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Assignment />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Click to get all the posts of https://sq1-api-test.herokuapp.com/posts
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={10} md={12}>
                  <Button
                    type="submit"
                    onClick={() => this.onHandleSubmit()}
                    color="info"
                    size="lg"
                    block
                  >
                    Send
                  </Button>
                  <GridItem xs={12} sm={10} md={12}>
                    <h4>{this.state.message}</h4>
                  </GridItem>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardBody></CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(GeneratePosts);
