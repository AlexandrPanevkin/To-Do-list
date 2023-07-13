import React, { useEffect } from "react";
import { TodolistList } from "features/TodolistsList/TodolistList";
import "./App.css";
import AppBar from "@mui/material/AppBar/AppBar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Menu } from "@mui/icons-material";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/ErrorSnackbar";
import { Login } from "features/auth/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { selectIsInitialized, selectStatus } from "app/app.selectors";
import { selectIsLoggedIn } from "features/auth/auth.selectors";
import { authThunks } from "features/auth/auth-reducer";
import { useActions } from "common/hooks/useActions";

function App() {
  const status = useAppSelector(selectStatus);
  const isInitialized = useAppSelector(selectIsInitialized);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { initializeApp, logout } = useActions(authThunks);

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="App">
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
      {status === "loading" && <LinearProgress />}
      <Container fixed>
        <Routes>
          <Route path={"/"} element={<TodolistList />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>} />
          <Route path="*" element={<Navigate to={"/404"} />} />
        </Routes>
      </Container>
      <ErrorSnackbar />
    </div>
  );
}

export default App;
