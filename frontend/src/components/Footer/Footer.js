import React, { useState, useEffect } from "react";
const Footer = () => {
  const [show, setShow] = useState(true);

  const controlFooter = () => {
    window.scrollY > 100 ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlFooter);

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return show ? (
    <footer className="footer footer-center fixed bottom-0 p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2022 - All right reserved by vault manager</p>
      </div>
    </footer>
  ) : (
    <></>
  );
};

export default Footer;
