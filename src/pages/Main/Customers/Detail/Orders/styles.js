import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "grid",
    padding: "30px 0px 30px 0px",
    gridGap: 15,
  },

  wrapperTable: {
    height: 480,
    overflow: "auto",
    marginBottom: 30,
    backgroundColor: "#ffffff",
  },

  table: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 0,
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)",
  },

  th: {
    border: "1px solid #C4C4C4",
    padding: 15,
  },

  tr: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
  },

  td: {
    textAlign: "center",
    padding: 10,
    margin: "auto",
    color: "#424242",
  },
}));

export default useStyles;
