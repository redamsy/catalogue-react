import React,{ lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoutes from "./routes/ProtectedRoutes"; //Authenticated routes
import CircularProgressPage from "./components/CircularProgressPage";
import { useAuthState } from "./context/authContext";
import { AppActionsProvider } from "./providers/actionsProvider";

const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const NotFoundComponent = lazy(() => import("./components/NotFoundComponent"));

const App = (): JSX.Element => {
  const { isAuthenticated } = useAuthState();

  useEffect(() => {
    console.log("App.tsx: isAuthenticated", isAuthenticated)
  }, [isAuthenticated])
  return (
    <Router>
      <Suspense fallback={<CircularProgressPage />}>
        <Routes>
          <Route
            path="/signin"
            element={
              !isAuthenticated ? (
                <SignInPage />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/signup"
            element={
              !isAuthenticated ? (
                <SignUp />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          {/* You'll only need the trailing * when there is another <Routes> */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <AppActionsProvider>
                  <ProtectedRoutes />
                </AppActionsProvider>
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
          <Route path="*" element={<NotFoundComponent />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
