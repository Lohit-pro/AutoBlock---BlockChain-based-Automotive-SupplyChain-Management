import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  pageWrap: {
    textAlign: "center",
    color: "#1a237e",
  },
  pageHeading: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "black", //me given
  },

  pageHeading_white: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "white", //me given
  },

  TableRoot: {
    width: "100%",
    maxWidth: 1200,
    margin: "5px auto",
    border: "2px solid black",
    borderRadius: 10,
    boxShadow: "2px 2px 10px white",
  },
  TableContainer: {
    maxHeight: 600,
    borderRadius: 7,
  },
  AddressCell: {
    maxWidth: 150,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  tableCount: {
    textAlign: "center",
    margin: "10px auto",
    padding: 0,
    color: "#753a88",
  },
  TableHead: {
    backgroundColor: "black !important",
    color: "#fff !important",
  },
  TableCell: {
    color: "#1a237e !important",
  },

  FormWrap: {
    maxWidth: 900,
    margin: "30px auto",
    padding: 20,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    background: "rgba(255, 255, 255, 0.7)", // Add this gradient background
  },

  RoleForm: {
    display: "flex",
    alignItems: "center",
    margin: "20px auto",
    // border: "1px solid",
  },

  //Explorer
  Explorerroot: {
    padding: "2px 4px",
    margin: "10px",
    width: "100%",
  },
  ProductPaper: {
    padding: 10,
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
    border: "2px solid #753a88",
  },
  ExplorerdRow: {
    width: "100%",
    borderBottom: `0px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    margin: "0 auto",
    fontWeight: 600,
    color: "#753a88",
  },
  TableRoot2: {
    width: "100%",
    maxWidth: 1300,
    margin: "5px auto",
    border: "2px solid #753a88",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #9fa8da",
  },

  //Modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#fff",
    padding: 15,
    outline: "none",
    width: "min(90%, 650px)",
    height: "80%",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #753a88",
    overflow: "scroll",
  },
  Reciptpaper: {
    backgroundColor: "#fff",
    border: "0px solid #000",
    padding: 15,
    outline: "none",
    width: "min(95%, 950px)",
    height: "500px",
    border: "2px solid #1a237e",
    borderRadius: 10,
    boxShadow: "2px 2px 10px #753a88",
    overflow: "scroll",
  },
  dRow: {
    width: "100%",
    borderBottom: `1px solid #222`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: "0 auto",
  },

  dCol1: {
    width: "30%",
    textAlign: "left",
    fontWeight: 600,
    color: "#753a88",
  },
  dCol2: {
    width: "70%",
    textAlign: "left",
    fontWeight: 600,
    color: "#1a237e",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  //Home
  HomeBtn: {
    margin: 10,
  },
  HomeCardWrap: {
    maxWidth: 500,
    width: "90%",
    padding: 20,
    borderRadius: 50,
    boxShadow: "2px 2px 10px #9fa8da",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    border: "2px solid white",
    margin: "10px auto",
    // background: "linear-gradient(135deg, #f5f5f5, #e0e0e0)", // Add this gradient background
  },
});