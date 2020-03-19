import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import {
  AppBar,
  Box,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { RLogo } from "request-ui";
import ConnectButton from "./ConnectButton";
import UserInfo from "./UserInfo";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: 80,
    padding: "0 24px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 5px rgba(211, 214, 219, 0.5)",
  },
  toolbar: {
    margin: 0,
    padding: 0,
    height: "100%",
    justifyContent: "space-between",
    display: "flex",
  },
  link: {
    alignItems: "center",
    marginLeft: 40,
    textDecoration: "none",
    color: theme.palette.common.black,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "inline-flex",
    },
  },
  active: {
    borderBottom: "2px solid #00CC8E",
    marginTop: 2,
  },
  item: {
    display: "inline-flex",
    alignItems: "center",
  },
}));

export const RequestAppBar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box display="flex" alignItems="center" flex={1} height="100%">
          <Box marginRight={"20px"}>
            <NavLink to="/">
              <RLogo />
            </NavLink>
          </Box>

          <Box display="flex" alignContent="flex-start" flex={1} height="100%">
            <NavLink
              activeClassName={classes.active}
              className={classes.link}
              to="/dashboard"
            >
              <Typography variant="h4">My dashboard</Typography>
            </NavLink>
            <NavLink
              activeClassName={classes.active}
              className={classes.link}
              to="/create"
            >
              <Typography variant="h4">Create a request</Typography>
            </NavLink>
            <NavLink
              activeClassName={classes.active}
              className={classes.link}
              to="/invoice"
            >
              <Typography variant="h4">Create an invoice</Typography>
            </NavLink>
          </Box>
          <Box>
            {/* <ConnectButton /> */}
            {<UserInfo name={"juliendevoir.eth"} />}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
