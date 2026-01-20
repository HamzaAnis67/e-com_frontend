import "./Header.css";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CartContext from "../../context/cartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";

const Header = () => {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  return (
    <>
      <div className="container">
        <div>
          <h3 className="heading_main">Mobile Arena</h3>
        </div>

        <div className="Headings">
          <div className="Links Headings ">
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <h3 className=" sub_heading">Home</h3>
            </Link>
            <Link to={"/contact"} style={{ textDecoration: "none" }}>
              <h3 className=" sub_heading">Contact</h3>
            </Link>
          </div>
          <Link to={"/cart"} className="link">
            <Badge
              className="badge"
              badgeContent={String(cartItems.length)}
              color="primary"
            >
              <ShoppingCartOutlinedIcon className="carticon" />
            </Badge>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
