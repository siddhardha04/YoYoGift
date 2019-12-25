import React, { memo } from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="flex-2 copyright">
          <p>&copy;Zambian Private Ltd.</p>
        </div>
        <div className="social-share flex-2">
          <a
            href="https://www.facebook.com"
            title="Facebook"
            className="social-share-link"
          >
            <FacebookIcon className="social-icon-size" />
          </a>
          <a
            href="https://www.instagram.com"
            title="Instagram"
            className="social-share-link"
          >
            <InstagramIcon className="social-icon-size" />
          </a>
          <a
            href="https://www.twitter.com"
            title="Twitter"
            className="social-share-link"
          >
            <TwitterIcon className="social-icon-size" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
