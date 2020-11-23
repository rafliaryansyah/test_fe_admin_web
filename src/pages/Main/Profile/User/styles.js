import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: "15px 0px 15px 0px",
  },

  wrapperTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    padding: "0px 5px 0px 15px",
  },

  label: {
    fontSize: 18,
    textTransform: "capitalize",
    fontWeight: "bold",
    letterSpacing: 3,
  },

  wrapperInfo: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gridGap: 15,
    padding: "0px 5px 0px 15px",
  },

  wrapperImageUpload: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    padding: 15,
    borderRadius: 10,
    width: 300,
    display: "grid",
    justifyContent: "flex-start",
    gridGap: 15,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
    },
  },

  img: {
    objectFit: "cover",
    width: 300,
    height: 300,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: 10,

    [theme.breakpoints.down("sm")]: {
      width: 150,
      height: 150,
    },
  },

  upload: {
    width: "100%",
    height: 50,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gridGap: 15,
    cursor: "pointer",
    backgroundColor: "#ffffff",
    color: "#41337A",
    textTransform: "capitalize",
    fontWeight: "bold",

    [theme.breakpoints.down("sm")]: {
      width: 150,
      height: 150,
    },
  },

  wrapperInput: {
    backgroundColor: "#ffffff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
    padding: 15,
    borderRadius: 10,
  },
}));

export default useStyles;
