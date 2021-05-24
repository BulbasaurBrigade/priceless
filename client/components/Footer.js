import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <h1>Meet Our Team</h1>
      <div className="developers">
        <div className="developer">
          <img src="https://robohash.org/peasant" />
          <p>Ina Agee</p>
        </div>
        <div className="developer">
          <img src="meredith.png" />
          <p>Meredith Cornelius</p>
        </div>
        <div className="developer">
          <img src="/Leora.jpg" />
          <p>Leora Douek</p>
        </div>
        <div className="developer">
          <img src="/ZerodSarah_blurred.png" />
          <p>Sarah Zerod</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
