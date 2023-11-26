import React from "react";
import Navbar from "../components/Navbar";
import Button from "@material-ui/core/Button";
import { useStyles } from "../components/Styles";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { useRole } from "../context/RoleDataContext";


export default function Home() {
  const classes = useStyles();
  const navItem = [];

  const { accs, roles, setRoles } = useRole();


  const roundedButton = {
    borderRadius: "20px",
    border: "2px solid #000",
  };

  return (
    <>
      <div className={classes.pageWrap}>
        <Navbar navItems={navItem}>
          {/* <div style={{color: "#ffffff",display:"flex", width: "100%", marginTop:"-25px", justifyContent: "end"}}>
            <h2 style={{border:"1px solid white", padding: "7px 13px", borderRadius:"30px"}}>
            Role :
            {(roles.manufacturer === accs) ? " Manufacturer" : " "}
            {(roles.thirdparty === accs) ? " thirdparty" : " "}
            {(roles.deliveryhub === accs) ? " deliveryhub" : " "}
            {(roles.customer === accs) ? " customer" : " "}


            </h2>
          </div> */}
          <Grid
            container
            spacing={3}
            style={{ height: "100%", minHeight: "90vh", width: "100%" }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* <img
                alt="."
                src="/LogoLohit.jpg"
                style={{ width: "90%", height: "auto" }}
              /> */}

              <div className={classes.HomeCardWrap}>
                <h1>AutoBloc</h1>
                <br />
                <h1 className={classes.pageHeading}>Track your product authenticity easily with our SupplyChain Decentralised Application!</h1>
              </div>
            </Grid>

            <Grid
              item
              xs={12}
              sm={6}
              style={{
                minHeight: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <div className={classes.HomeCardWrap}>
                <h1 className={classes.pageHeading}>Assign Roles</h1>
                <Link
                  to="/roleAdmin"
                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={roundedButton}
                  >
                    <span className="underline-animation">Assign</span>
                  </Button>
                </Link>
                <br />

                <h1 className={classes.pageHeading}>Visit As</h1>
                <Link
                  to="/manufacturer/manufacture"
                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={roundedButton}
                  >
                    <span className="underline-animation">Manufacturer</span>
                  </Button>
                </Link>
                <Link
                  to="/ThirdParty/allProducts"
                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={roundedButton}
                  >
                    <span className="underline-animation">Dealership</span>
                  </Button>
                </Link>
                <Link
                  to="/DeliveryHub/receive"
                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={roundedButton}
                  >
                    <span className="underline-animation">Logistics Company</span>
                  </Button>
                </Link>
                <Link
                  to="/Customer/buy"
                  // style={{ textDecoration: "none", color: "#fff" }}
                >
                  <Button
                    className={classes.HomeBtn}
                    size="large"
                    variant="outlined"
                    color="primary"
                    style={roundedButton}
                  >
                    <span className="underline-animation">Customer</span>
                  </Button>
                </Link>
              </div>
            </Grid>
          </Grid>
        </Navbar>
      </div>
    </>
  );
}
