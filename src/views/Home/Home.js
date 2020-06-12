import React from "react";
import Datetime from "react-datetime";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

// material ui icons
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import Button from "../../components/CustomButtons/Button";

import FormatQuote from "@material-ui/icons/FormatQuote";

import homePageStyle from "../../assets/jss/views/homePageStyle";

import { viewAllPostService, viewPostByDateService } from "../../services/posts/PostService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      starDate: "",
      starDateState: "",
      finalDate: "",
      finalDateState: "",
      order: "desc",
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  componentDidMount() {
    viewAllPostService(this.state.order)
      .then((infoPosts) => {
        const dataPost = infoPosts.data;
        this.setState({ posts: dataPost });
      })
      .catch((e) => console.log(e));
  }

  handleChangeDate = (date, name) => {
    if (date._d !== undefined) {
      const selectDate = date._d.toISOString().substr(0, 10);
      this.setState({ [name]: selectDate, [name + "State"]: "success" });
    } else {
      this.setState({ [name]: null, [name + "State"]: "error" });
    }
  };

  handleSubmit() {
    if (this.isValidated()) {
      const dataFilter = {
        start_date: this.state.starDate,
        final_date: this.state.finalDate,
      };
      viewPostByDateService(dataFilter)
        .then((infoPosts) => {
          const dataPost = infoPosts.data;
          this.setState({ posts: dataPost });
        })
        .catch((e) => console.log(e));
    }
  }

  handleOrder() {
    const order = this.state.order === "desc" ? "asc" : "desc";
    viewAllPostService(order)
      .then((infoPosts) => {
        const dataPost = infoPosts.data;
        this.setState({ posts: dataPost, order: order });
      })
      .catch((e) => console.log(e));
  }

  isValidated() {
    if (this.state.starDateState === "success" && this.state.finalDateState === "success") {
      return true;
    } else {
      if (this.state.starDateState !== "success") {
        this.setState({ starDateState: "error" });
      }
      if (this.state.finalDateState !== "success") {
        this.setState({ finalDateState: "error" });
      }
    }
    return false;
  }

  buildGridData(classes) {
    if (this.state.posts.length > 0) {
      const gridData = this.state.posts.map((post, index) => {
        const postElement = (
          <GridItem xs={12} sm={12} md={4} key={index}>
            <Card testimonial>
              <CardHeader>
                <h3>{post.title}</h3>
              </CardHeader>
              <div className={classes.testimonialIcon}>
                <FormatQuote />
              </div>
              <CardBody>
                <h5 className={classes.cardTestimonialDescription}>{post.description}</h5>
              </CardBody>
              <CardFooter testimonial>
                <h4 className={classes.cardTitle}>{post.user.name}</h4>
                <h6 className={classes.cardCategory}>{post.user.email}</h6>
                <h6 className={classes.cardCategory}>{post.publication_date}</h6>
              </CardFooter>
            </Card>
          </GridItem>
        );
        return [postElement];
      });
      return gridData;
    }
  }

  render() {
    const { classes } = this.props;

    const gridData = this.buildGridData(classes);
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={2}>
            <InputLabel className={classes.label}>Start Date</InputLabel>
            <br />
            <FormControl fullWidth>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: "Star Date" }}
                onChange={(e) => {
                  this.handleChangeDate(e, "starDate");
                }}
                closeOnSelect
              />
            </FormControl>
            <br />
            <br />
            {this.state.dateState === "error" ? (
              <InputAdornment position="end" className={classes.danger}>
                Select a date
                <Close />
              </InputAdornment>
            ) : (
              ""
            )}
          </GridItem>
          <GridItem xs={12} sm={2}>
            <InputLabel className={classes.label}>Final Date</InputLabel>
            <br />
            <FormControl fullWidth>
              <Datetime
                timeFormat={false}
                inputProps={{ placeholder: "Final Date" }}
                onChange={(e) => {
                  this.handleChangeDate(e, "finalDate");
                }}
                closeOnSelect
              />
            </FormControl>
            <br />
            <br />
            {this.state.dateState === "error" ? (
              <InputAdornment position="end" className={classes.danger}>
                Select a date
                <Close />
              </InputAdornment>
            ) : (
              ""
            )}
          </GridItem>
          <GridItem xs={12} sm={2}>
            <Button color="info" onClick={this.handleSubmit.bind(this)}>
              Search
            </Button>
          </GridItem>
          <GridItem xs={12} sm={2}>
            <Button color="info" onClick={this.handleOrder.bind(this)}>
              Order
            </Button>
          </GridItem>
        </GridContainer>
        <GridContainer>{gridData}</GridContainer>
      </div>
    );
  }
}

export default withStyles(homePageStyle)(Home);
