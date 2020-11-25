import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // border: "1px solid",
  },

  pencarian: {
    backgroundColor: "#ffffff",
    padding: 15,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 30,
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)",
  },

  wrapperCard: {
    marginBottom: 15,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap: 30,
  },

  // wrapperTable: {
  //   height: 480,
  //   overflow: "auto",
  //   marginBottom: 30,
  //   backgroundColor: "#ffffff",
  // },

  // table: {
  //   width: "100%",
  //   backgroundColor: "#FFFFFF",
  //   padding: 0,
  //   boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)",
  // },

  // th: {
  //   border: "1px solid #C4C4C4",
  //   padding: 15,
  // },

  // tr: {
  //   cursor: "pointer",
  //   "&:hover": {
  //     backgroundColor: "#f2f2f2",
  //   },
  // },

  // td: {
  //   textAlign: "center",
  //   padding: 10,
  //   margin: "auto",
  //   color: "#424242",
  // },

  // avatar: {
  //   objectFit: "cover",
  // },
}));

export default useStyles;
