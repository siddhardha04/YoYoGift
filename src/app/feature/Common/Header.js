import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import GoogleLogin from "react-google-login";
import SearchBox from "../SearchBox";
import { userAuthenticationContext } from "../../shared/Contexts";
import axios from "axios";

function Header() {
  const userContext = useContext(userAuthenticationContext);

  async function responseGoogle(resp) {
    const response = await axios.get(
      "http://localhost:3001/users?email=" + resp.profileObj.email
    );

    if (response.data.length === 0) {
      userContext.setUserData({
        userName: resp.profileObj.givenName,
        userEmail: resp.profileObj.email,
        userImage: resp.profileObj.imageUrl,
        isAdmin: false
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          userEmail: resp.profileObj.email,
          userImage: resp.profileObj.imageUrl,
          isAdmin: false
        })
      );

      let user = {
        name: resp.profileObj.name,
        email: resp.profileObj.email,
        balancePoints: 0,
        isAdmin: false,
        favourites: [],
        image: resp.profileObj.imageUrl
      };
      axios.post("http://localhost:3001/users", user);
    } else {
      userContext.setUserData({
        userName: response.data[0].name,
        userEmail: response.data[0].email,
        userImage: response.data[0].image,
        isAdmin: response.data[0].isAdmin
      });

      localStorage.setItem(
        "user",
        JSON.stringify({
          userEmail: response.data[0].email,
          userImage: response.data[0].image,
          isAdmin: response.data[0].isAdmin
        })
      );
    }
  }

  function handleLogout() {
    userContext.setUserData({
      userEmail: "",
      userName: "",
      userImage: "",
      isAdmin: false
    });
    localStorage.removeItem("user");
  }

  return (
    <header>
      <div className="header-container">
        <div className="app-logo">
          <a href="/">
            <img src="../../../../assests/app-logo.jpeg" alt="app-logo"></img>
          </a>
        </div>
        <div className="app-title">
          <Typography variant="h6" noWrap>
            YOYOGift
          </Typography>
        </div>
        <span style={{ flex: "1 1 auto" }}></span>
        <SearchBox />
        {/* <div className="search-container">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <TextField
            id="searchQuery"
            placeholder="Search the Product"
            size="small"
          />
        </div> */}
        {userContext.userdata.userName === "" ? (
          <GoogleLogin
            clientId="506240403601-qeefsprsusg3ffcogsnk9m7h4o9co23u.apps.googleusercontent.com"
            render={renderProps => (
              <LoginButton onClick={renderProps.onClick} />
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <div className="user-info">
            <div className="user-image">
              <Link to={"/profile"}>
                <img alt="profile-img" src={userContext.userdata.userImage} />
              </Link>
            </div>
            <LogoutButton onClick={handleLogout} />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
