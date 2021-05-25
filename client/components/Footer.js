import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      <h1>Meet Our Team</h1>
      <div className="developers">
        <div className="developer">
          <img src="/Inasq.JPG" />
          <p>Ina Agee</p>
          <a href="https://www.linkedin.com/in/inaagee/">
            <img className="linkedIn-logo" src="/LinkedIn.png" />
          </a>
        </div>
        <div className="developer">
          <img src="meredith.png" />
          <p>Meredith Cornelius</p>
          <a href="https://www.linkedin.com/in/meredith-cornelius/">
            <img className="linkedIn-logo" src="/LinkedIn.png" />
          </a>
        </div>
        <div className="developer">
          <img src="/Leora.jpg" />
          <p>Leora Douek</p>
          <a href="https://www.linkedin.com/in/leoradouek/">
            <img className="linkedIn-logo" src="/LinkedIn.png" />
          </a>
        </div>
        <div className="developer">
          <img src="/ZerodSarah_Brick.jpg" />
          <p>Sarah Zerod</p>
          <a href="https://www.linkedin.com/in/sarahzerod/">
            <img className="linkedIn-logo" src="/LinkedIn.png" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
