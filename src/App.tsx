import React,{ lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import CircularProgressPage from "./components/CircularProgressPage";
import { useAuthState } from "./context/authContext";
import { ProductProvider } from "./providers/productProvider";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import routes from "./routes/authenticatedRoutes";
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
          {/* You'll only need the trailing * (path='/*) when there is another <Routes> */}
          {/* if we don't want to include path : "/" then use <Outlet/>, see : https://reactrouter.com/en/main/components/outlet */}
          <Route
            element={isAuthenticated ? (
                <ProductProvider><Outlet /></ProductProvider>
              ) : (
                <Navigate to="/signin" />
            )}
          >
              <>
                  {/* we can't make this as a component since any direct child of <Route> should be exactly <Route> or <Routes>   */}
                  {routes.map(({ component: Component, path }) => (
                    <Route path={`/${path}`} key={path} element={<Component />} />
                  ))}
                  {/* <Outlet/> */}
              </>
          </Route>
          <Route path="/*" element={<NotFoundComponent />}/>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
