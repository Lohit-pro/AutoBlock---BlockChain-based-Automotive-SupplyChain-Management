import React from "react";
import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import GitHubIcon from "@material-ui/icons/GitHub";
import { useRole } from "../context/RoleDataContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#ffffff00",
    color: "#fff",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft({
  pageTitle,
  navItems,
  children,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { accs, roles, setRoles } = useRole();
  const location = useLocation();

  const isHomeActive = location.pathname === "/";
  const isExplorerActive = location.pathname === "/explorer";

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{ backgroundColor: "transparent" }}
      >
        <Toolbar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </div>

          <div
            style={{
              marginTop: "auto",
              alignItems: "center",
              justifyContent: "center",
              padding: "auto",
            }}
          >
            <Typography variant="h6" noWrap>
              <img
                alt="."
                src="/logo.png"
                style={{
                  height: "45px",
                  width: "auto",
                  alignItems: "center",
                }}
              />
            </Typography>
          </div>

          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft:"12px",
              color: "#ffffff",
            }}
          >
            <Typography style={{ fontSize: "20px", fontWeight: "semi-bold" }}>
              {/* {" "} */}
              &nbsp;SupplyChain&nbsp;Dapp
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "flex-end", // Align "Account" and "Roles" to the left
              justifyContent: "end",
              color: "#ffffff",
            }}
          >
            <Typography
              style={{ fontSize: "15px", fontWeight: "lighter" }}
              variant="h6"
            >
              Account: {accs}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        // style={{border: "2px solid transparent", borderColor: "transparent"}}
      >
        <div className={classes.drawerHeader}>
          <ListItemText>
            <b>{pageTitle}</b>
          </ListItemText>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: isHomeActive ? "#ffffff" : "#ffffff61",
            }}
          >
            <ListItem
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemText>
                <span
                  style={{
                    fontSize: "35px",
                    fontWeight: "bolder",
                    textAlign: "center",
                    transition: "color 0.3s", // Add a transition for smooth color change
                  }}
                  className={"hover-link"} // Add a class for custom styling
                >
                  Home
                </span>
              </ListItemText>
            </ListItem>
          </Link>
          <Link
            to="/explorer"
            style={{
              textDecoration: "none",
              color: isExplorerActive ? "#ffffff" : "#ffffff61",
            }}
          >
            <ListItem
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "color 0.5s", // Add a transition for smooth color change
              }}
            >
              <ListItemText>
                <span
                  style={{
                    fontSize: "35px",
                    fontWeight: "bolder",
                    textAlign: "center",
                    transition: "color 0.3s", // Add a transition for smooth color change
                  }}
                  className={"hover-link"} // Add a class for custom styling
                >
                  Explorer
                </span>
              </ListItemText>
            </ListItem>
          </Link>

          <List>
            {navItems.length !== 0 ? (
              navItems.map((item) => (
                <Link
                  to={item[1]}
                  style={{
                    textDecoration: "none",
                    color:
                      location.pathname === item[1] ? "#ffffff" : "#ffffff61",
                  }}
                >
                  <ListItem
                    key={item[0]}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <ListItemText
                      primary={
                        <span
                          style={{
                            fontSize: "25px",
                            fontWeight: "bolder",
                            textAlign: "center",
                            transition: "color 0.3s", // Add a transition for smooth color change
                          }}
                          className={"hover-link"}
                        >
                          {item[0]}
                        </span>
                      }
                    />
                  </ListItem>
                </Link>
              ))
            ) : (
              <> </>
            )}
          </List>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div style={{ margin: "0 auto", maxWidth: 1300 }}>{children}</div>
      </main>
    </div>
  );
}
