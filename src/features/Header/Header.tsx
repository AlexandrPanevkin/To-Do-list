import React from "react";
import AppBar from "@mui/material/AppBar/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { Menu } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppSelector } from "app/store";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { useActions } from "common/hooks/useActions";
import { authThunks } from "features/auth/auth.reducer";

export const Header = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const { logout } = useActions(authThunks);
  const logoutHandler = () => {
    logout({});
  };
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Todos</Typography>
          {isLoggedIn && (
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
