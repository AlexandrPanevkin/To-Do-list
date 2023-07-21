import React, { useEffect } from "react";
import { TodolistList } from "features/todolistsList/todolist-list";
import "app/app.css";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/errorSnackbar";
import { Login } from "features/auth/login";
import { Navigate, Route, Routes } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { selectIsInitialized, selectStatus } from "app/app.selectors";
import { authThunks } from "features/auth/auth.reducer";
import { useActions } from "common/hooks/useActions";
import { Header } from "features/Header/Header";

function App() {
  const status = useAppSelector(selectStatus);
  const isInitialized = useAppSelector(selectIsInitialized);

  const { initializeApp } = useActions(authThunks);

  useEffect(() => {
    initializeApp({});
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
      <Header />
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
