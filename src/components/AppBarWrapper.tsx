import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../context/authContext";

export default function AppBarWrapper({
  children,
  pageName,
  buttonIcon,
  buttonPath,
}: {
  children: React.ReactNode;
  pageName: string;
  buttonPath: string;
  buttonIcon: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();
  const { signOut } = useAuthActions();

  function handleClick() {
    navigate(`/${buttonPath}`);
  }

  function handleSignOut() {
    signOut();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}>
            {buttonIcon}
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pageName}
          </Typography>
          <Button color="secondary"  variant="contained" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
}
