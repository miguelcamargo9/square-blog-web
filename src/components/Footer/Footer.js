import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

//components
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

import footerStyle from "../../assets/jss/components/footerStyle";

function Footer({ ...props }) {
  const { classes, fluid, black } = props;
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.blackColor]: black,
  });
  return (
    <footer className={classes.footer}>
      <GridContainer className={container} justify="center">
        <GridItem xs={12} sm={2}>
          Miguel Camargo
        </GridItem>
      </GridContainer>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  fluid: PropTypes.bool,
  white: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
