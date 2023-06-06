import React from "react";
import "./footer.css";

function Footer() {
  return (
    <div class="stickyfooter">
      <footer>
        <div id='f'>
          ABOUT HELP PRESS API JOBS PRIVACY TERMS LOCATIONS TOP ACCOUNTS
          HASHTAGS LANGUAGE
        </div>
        &copy; {new Date().getFullYear()} INSTAGRAM FOR BRUINS
      </footer>
    </div>
  );
}

export default Footer;
