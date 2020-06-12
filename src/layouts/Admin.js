import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
import { sessionService } from "redux-react-session";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import AdminNavbar from "../components/Navbars/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

import { getAllRoutes } from "../routes.js";

import appStyle from "../assets/jss/layouts/adminStyle";

import image from "../assets/img/sidebar-1.jpg";
import logo from "../assets/img/logo.jpg";

var ps;

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      mobileOpen: false,
      miniActive: false,
      image: image,
      color: "orange",
      bgColor: "black",
      hasImage: true,
      fixedClasses: "dropdown",
      routes: [],
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    sessionService
      .loadSession()
      .then((currentSession) => {})
      .catch((err) => {
        console.log(err);
        this.props.history.push("/auth/logout-page");
      });
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", this.resizeFunction);
    this._isMounted &&
      getAllRoutes()
        .then((routes) => {
          this._isMounted && this.setState({ routes });
        })
        .catch((err) => console.log(err));
  }
  componentWillUnmount() {
    this._isMounted = false;
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  handleImageClick = (image) => {
    this.setState({ image: image });
  };
  handleColorClick = (color) => {
    this.setState({ color: color });
  };
  handleBgColorClick = (bgColor) => {
    this.setState({ bgColor: bgColor });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getActiveRoute = (routes) => {
    let activeRoute = "Default Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = this.getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        const path = routes[i].path.split("/", 3);
        if (window.location.href.includes(`${routes[i].layout}/${path[1]}`) !== false) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return this.getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return <Route path={prop.layout + prop.path} component={prop.component} key={key} />;
      } else {
        return null;
      }
    });
  };
  sidebarMinimize() {
    this.setState({ miniActive: !this.state.miniActive });
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  render() {
    const { classes, ...rest } = this.props;
    const mainPanel =
      classes.mainPanel +
      " " +
      cx({
        [classes.mainPanelSidebarMini]: this.state.miniActive,
        [classes.mainPanelWithPerfectScrollbar]: navigator.platform.indexOf("Win") > -1,
      });
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={this.state.routes}
          logoText={"Square 1 Blog"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          bgColor={this.state.bgColor}
          miniActive={this.state.miniActive}
          {...rest}
        />
        <div className={mainPanel} ref="mainPanel">
          <AdminNavbar
            sidebarMinimize={this.sidebarMinimize.bind(this)}
            miniActive={this.state.miniActive}
            brandText={this.getActiveRoute(this.state.routes)}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>{this.getRoutes(this.state.routes)}</Switch>
            </div>
          </div>
          <Footer fluid />
        </div>
      </div>
    );
  }
}

AdminLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(appStyle)(AdminLayout);
