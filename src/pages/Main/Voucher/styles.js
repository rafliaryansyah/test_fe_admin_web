import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    // border: "1px solid",
  },

  pencarian: {
    backgroundColor: "#ffffff",
    padding: 15,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gridGap: 15,
    marginBottom: 30,
    boxShadow: "0px 0px 1px rgba(0, 0, 0, 0.5)",
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

  banner: {
    width: 100,
    height: 50,
  },

  img: {
    width: "100%",
    height: 200,
    textAlign: "center",
  },

  nama: {
    fontSize: 18,
    textTransform: "capitalize",
    letterSpacing: 3,
    fontWeight: "bold",
    color: "#424242",
  },

  desk: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  teks: {
    fontSize: 13,
    textTransform: "capitalize",
    textAlign: "justify",
    color: "#c4c4c4",
  },

  garis: {
    border: "1px solid #c4c4c4",
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: 15,
    color: "#424242",
  },

  teksSyaratDanKetentuan: {
    textAlign: "justify",
    color: "#424242",
  },

  form: {
    width: 534,

    [theme.breakpoints.down("sm")]: {
      width: 300,
    },
  },

  select: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gridGap: 15,
  },
}));

export default useStyles;
