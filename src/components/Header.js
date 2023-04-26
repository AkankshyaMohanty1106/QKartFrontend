import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";
import { useHistory, Link } from "react-router-dom";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();

  const routerToExplore = () => {
    history.push("/");
  };

  const routeToRegister = () => {
    history.push("/register");
  }

  const routeToLogin = () => {
    history.push("/login");
  };

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");
    history.push("/");

    window.location.reload();
  }
  const hasHiddenAuthButtonsTrue = () => (
    <Box className="header">
      <Box className="header-title">
        <Link to="/">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Link>
      </Box>
      {children}
      <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={routerToExplore}
        >
          Back to explore
        </Button>
    </Box>
  )

  const hasHiddenAuthButtonsFalse = () => (
    <Box className="header">
  <Box className="header-title">
    <Link to="/">
      <img src="logo_light.svg" alt="QKart-icon"></img>
    </Link>
  </Box>
  {children}
  <Stack direction="row" spacing={1} alignItems="center">
    {localStorage.getItem("username") ? (
      <>
      <Avatar src="avater.png" alt={localStorage.getItem("username") || "profile"} />
      <p className="username-text">{localStorage.getItem("username")}</p>
      <Button type="primary" onClick={logout}>
      Logout
      </Button>
      </>
    ) : (
      <>
      <Button onClick={routeToLogin}>
      Login
      </Button>
      <Button variant="contained" onClick={routeToRegister}>
      Register
      </Button>
      </>
    )}
  </Stack>
</Box>
  )
  return (
  hasHiddenAuthButtons ? hasHiddenAuthButtonsTrue() : hasHiddenAuthButtonsFalse() 
  )
};

export default Header;
