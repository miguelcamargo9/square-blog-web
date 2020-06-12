import { cardTitle, roseColor } from "../template";

const homePageStyle = {
  cardTitle,
  cardTitleWhite: {
    ...cardTitle,
    color: "#FFFFFF",
    marginTop: "0",
  },
  cardCategoryWhite: {
    margin: "0",
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: ".875rem",
  },
  cardCategory: {
    color: "#999999",
    marginTop: "10px",
  },
  icon: {
    color: "#333333",
    margin: "10px auto 0",
    width: "130px",
    height: "130px",
    border: "1px solid #E5E5E5",
    borderRadius: "50%",
    lineHeight: "174px",
    "& svg": {
      width: "55px",
      height: "55px",
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      width: "55px",
      fontSize: "55px",
    },
  },
  iconRose: {
    color: roseColor,
  },
  marginTop30: {
    marginTop: "30px",
  },
  testimonialIcon: {
    marginTop: "30px",
    "& svg": {
      width: "40px",
      height: "40px",
    },
  },
  cardTestimonialDescription: {
    fontStyle: "italic",
    color: "#999999",
  },
};

export default homePageStyle;
