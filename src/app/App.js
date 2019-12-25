import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./feature/Common/Footer";
import Header from "./feature/Common/Header";
import Routes from "./routes/Routes";
import { userAuthenticationContext } from "./shared/Contexts";

function App() {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userImage: "",
    isAdmin: false
  });

  return (
    <Router>
      <userAuthenticationContext.Provider
        value={{
          userdata: userData,
          setUserData: setUserData
        }}
      >
        <Header />
        <Routes />
      </userAuthenticationContext.Provider>
      <Footer />
    </Router>
  );
}
export default App;
