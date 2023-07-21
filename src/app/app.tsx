import React, { useEffect } from "react";
import "app/app.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useAppSelector } from "./store";
import { ErrorSnackbar } from "common/components/ErrorSnackbar/errorSnackbar";
import { CircularProgress } from "@mui/material";
import { selectIsInitialized, selectStatus } from "app/app.selectors";
import { authThunks } from "features/auth/auth.reducer";
import { useActions } from "common/hooks/useActions";
import { Header } from "features/Header/Header";
import { Routing } from "features/Routing/Routing";

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
      <Routing />
      <ErrorSnackbar />
    </div>
  );
}

export default App;
