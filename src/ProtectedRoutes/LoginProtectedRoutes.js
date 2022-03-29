import React from "react";
import { Navigate } from "react-router-dom";

function LoginProtectedRoutes({
  component: Component,
  auth,
  isLogin,
  layout: Layout,
}) {
  // console.log("login routes", isLogin, auth.state.isAuthenticated);

  if (isLogin) {
    return auth.state.isAuthenticated ? (
      <Navigate to={"/main"} />
    ) : (
      <Component />
    );
  }

  if (auth.state.isAuthenticated) {
    if (Layout) {
      return (
        <Layout>
          <Component />
        </Layout>
      );
    } else {
      return <Component />;
    }
  } else {
    return <Navigate to={"/login"} />;
  }
}

export default LoginProtectedRoutes;
