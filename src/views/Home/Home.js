import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";

import FormatQuote from "@material-ui/icons/FormatQuote";

import homePageStyle from "../../assets/jss/views/homePageStyle";

import { viewAllPostService } from "../../services/posts/PostService";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    viewAllPostService()
      .then((infoPosts) => {
        const dataPost = infoPosts.data;
        this.setState({ posts: dataPost });
      })
      .catch((e) => console.log(e));
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
    return <GridContainer>{gridData}</GridContainer>;
  }
}

export default withStyles(homePageStyle)(Home);
