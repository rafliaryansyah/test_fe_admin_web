import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    padding: "30px 0px 30px 0px",
    gridGap: 15,
  },

  subtitle: {
    textTransform: "capitalize",
    fontSize: 18,
    letterSpacing: 3,
    fontWeight: "bold",
  },

  textDisable: {
    border: "1px solid #c4c4c4",
    padding: 10,
  },

  nama: {
    textTransform: "capitalize",
    fontSize: 15,
    letterSpacing: 1,
    color: "#c4c4c4",
  },
}));

export default useStyles;
