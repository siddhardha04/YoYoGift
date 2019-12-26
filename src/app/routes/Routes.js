import React, { Suspense, lazy } from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import LandingPage from "../feature/LandingPage";

const giftDetails = lazy(() => import("../feature/GiftDetails"));
const profile = lazy(() => import("../feature/Profile"));
const search = lazy(() => import("../feature/Search"));

function Routes() {
  return (
    <main className="layout">
      <Suspense
        fallback={
          <div
            style={{
              position: "absolute",
              left: "50%",
              right: "50%",
              fontSize: "25px"
            }}
          >
            Loading...
          </div>
        }
      >
        <Switch>
          <Route exact path="/" component={LandingPage}></Route>
          <Route exact path="/gift/details/:id" component={giftDetails}></Route>
          <Route exact path="/profile" component={profile}></Route>
          <Route exact path="/search" component={search}></Route>
        </Switch>
      </Suspense>
    </main>
  );
}

export default withRouter(Routes);
