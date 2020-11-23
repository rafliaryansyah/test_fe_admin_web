import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    padding: "30px 0px 30px 0px",
    gridGap: 15,
  },

  label: {
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      fontSize: 13,
    },
  },

  deskripsiToko: {
    fontSize: 13,
    textTransform: "capitalize",
    fontWeight: "lighter",
    textAlign: "justify",
    color: "#424242",
  },
}));

export default useStyles;
