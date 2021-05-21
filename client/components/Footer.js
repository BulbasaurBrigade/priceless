import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <h3>Meet Our Team</h3>
      <div className="developers">
        <div className="developer">
          <img src="https://robohash.org/peasant" />
          <p>Ina Agee</p>
        </div>
        <div className="developer">
          <img src="https://robohash.org/rapbot" />
          <p>Meredith Cornelius</p>
        </div>
        <div className="developer">
          <img src="https://robohash.org/sirbot" />
          <p>Leora Douek</p>
        </div>
        <div className="developer">
          <img src="https://robohash.org/matrix" />
          <p>Sarah Zerod</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;