import { Container } from "@mui/material";
import "./Footer.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(isUser);
    }
  }, []);
  
  return (
    <>
      {user ? (
        <footer className="sticky_footer">
          <Container maxWidth="lg">
            <div className="footer_main">
              <div className="footer_brand">
                <h4 className="brand_text">Thank You For Visiting</h4>
              </div>
              <div className="footer_links">
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Register</h4>
                </Link>
                <Link to="/addproduct" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Add Product</h4>
                </Link>
                <Link to="/orders" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Orders</h4>
                </Link>
                <Link to="/allfeedbacks" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Feedbacks</h4>
                </Link>
              </div>
            </div>
            <div className="footer_bottom">
              <p className="copyright">&copy; 2024 E-Commerce. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      ) : (
        <footer className="sticky_footer">
          <Container maxWidth="lg">
            <div className="footer_main">
              <div className="footer_brand">
                <h4 className="brand_text">Thank You For Visiting</h4>
              </div>
              <div className="footer_links">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Login</h4>
                </Link>
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <h4 className="footer_heading">Register</h4>
                </Link>
              </div>
            </div>
            <div className="footer_bottom">
              <p className="copyright">&copy; 2024 E-Commerce. All rights reserved.</p>
            </div>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;
