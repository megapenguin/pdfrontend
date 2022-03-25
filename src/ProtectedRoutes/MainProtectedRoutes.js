import React from "react";
import { Route } from "react-router-dom";

function MainProtectedRoutes({
  layout: Layout,
  component: Component,
  Auth,
  res,
  isAdmin = false,
}) {
  console.log(Auth.state.isAuthenticated, Auth.state.userData, "ralp");
  return (
    <Route
      {...res}
      // render={() => <h1>h1</h1>}
      render={
        (props) => {
          if (Auth.state.isAuthenticated) {
            if (isAdmin && Auth.state.userData.userType == 1) {
              return (
                <Layout>
                  <Component />
                </Layout>
              );
            } else if (isAdmin && Auth.state.userData.userType == 0) {
              return (
                // <Redirect
                // 	to={{
                // 		pathname: "/",
                // 		state: { from: props.location },
                // 	}}
                // />
                <Route></Route>
              );
            } else if (!isAdmin && Auth.state.userData.userType == 0) {
              return (
                <Layout>
                  <Component />
                </Layout>
              );
            } else if (!isAdmin && Auth.state.userData.userType == 1) {
              return (
                // <Redirect
                // 	to={{
                // 		pathname: "/admin/homepage",
                // 		state: { from: props.location },
                // 	}}
                // />
                <Route></Route>
              );
            }
          } else {
            return (
              // <Redirect
              // 	to={{
              // 		pathname: "/",
              // 		state: { from: props.location },
              // 	}}
              // />
              <Route></Route>
            );
          }
        }
        // Auth.state.isAuthenticated ? (
        // 	<Layout>
        // 		<Component />
        // 	</Layout>
        // ) : (
        // 	<Redirect
        // 		to={{
        // 			pathname: "/",
        // 			state: { from: props.location },
        // 		}}
        // 	/>
        //	)
      }
    />
  );
}

export default MainProtectedRoutes;
