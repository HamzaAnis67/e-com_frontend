// import "./Header.css";
// import Badge from "@mui/material/Badge";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// import CartContext from "../../context/cartContext";
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import Container from "@mui/material/Container";

// const Header = () => {
//   const cartContext = useContext(CartContext);
//   const { cartItems } = cartContext;

//   return (
//     <>
//       <div className="container">
//         <div>
//           <h3 className="heading_main">Mobile Arena</h3>
//         </div>

//         <div className="Headings">
//           <div className="Links Headings ">
//             <Link to={"/"} style={{ textDecoration: "none" }}>
//               <h3 className=" sub_heading">Home</h3>
//             </Link>
//             <Link to={"/contact"} style={{ textDecoration: "none" }}>
//               <h3 className=" sub_heading">Contact</h3>
//             </Link>
//           </div>
//           <Link to={"/cart"} className="link">
//             <Badge
//               className="badge"
//               badgeContent={String(cartItems.length)}
//               color="primary"
//             >
//               <ShoppingCartOutlinedIcon className="carticon" />
//             </Badge>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;

//check this code
import "./Header.css";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import CartContext from "../../context/cartContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
    <div className="container">
      <h3 className="heading_main">Mobile Arena</h3>

      {/* Desktop Links */}
      <div className="Headings desktop_menu">
        <div className="Links">
          <Link to={"/"} className="link">
            <h3 className="sub_heading">Home</h3>
          </Link>
          <Link to={"/contact"} className="link">
            <h3 className="sub_heading">Contact</h3>
          </Link>
        </div>

        <Link to={"/cart"} className="link">
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCartOutlinedIcon className="carticon" />
          </Badge>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="mobile_menu_icon">
        <Link to={"/cart"} className="link">
          <Badge badgeContent={cartItems.length} color="primary">
            <ShoppingCartOutlinedIcon className="carticon" />
          </Badge>
        </Link>
        <IconButton onClick={() => setMenuOpen(!menuOpen)}>
          <MenuIcon style={{ color: "white" }} />
        </IconButton>
      </div>
      {/* Mobile Dropdown */}
      </div>
      {menuOpen && (
        <div className="mobile_dropdown show">
          <Link to={"/"} className="link" onClick={() => setMenuOpen(false)}>
            <p className="sub_heading">Home</p>
          </Link>
          <Link to={"/contact"} className="link" onClick={() => setMenuOpen(false)}>
            <p className="sub_heading">Contact</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
