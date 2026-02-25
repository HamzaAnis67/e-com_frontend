import "./CheckOut.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CartContext from "../../context/cartContext";

const CheckOut = () => {
  const navgiate = useNavigate();
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");

  const cartContext = useContext(CartContext);
  const { cartItems } = cartContext;

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    if (name === "Email") {
      setEmail(value);
    }
    if (name === "Address") {
      setAddress(value);
    }
    if (name === "PhoneNumber") {
      setPhoneNumber(value);
    }
    if (name === "Name") {
      setName(value);
    }
  };

  const handleSubmit = async () => {
    // Validate name
    if (!name.trim()) {
      alert("Name is required");
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      alert("Email is required");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    // Validate phone
    if (!phoneNumber.trim()) {
      alert("Phone number is required");
      return;
    }
    if (isNaN(phoneNumber) || phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }
    
    // Validate address
    if (!address.trim()) {
      alert("Address is required");
      return;
    }

    const OrderData = {
      email,
      address,
      phoneNumber: +phoneNumber,
      name,
      products,
    };

    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/orders/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(OrderData),
      }
    );
    const data = await response.json();
    setEmail("");
    setAddress("");
    setPhoneNumber("");
    setName("");
    navgiate("/thankyou");
  };

  useEffect(() => {
    if (cartItems != []) {
      setProducts(cartItems);
    }
  }),
    [];

  return (
    <>
      <div className="checkout_heading">
        <h1>Checkout</h1>
      </div>
      <div className="checkout_container">
        <div className="checkout_form">
          <div className="form_fields">
            <TextField
              fullWidth
              value={name}
              onChange={handleChange}
              id="outlined-basic"
              name="Name"
              label="Full Name"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
            <TextField
              fullWidth
              value={email}
              onChange={handleChange}
              id="outlined-basic"
              name="Email"
              label="Email Address"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
            <TextField
              fullWidth
              value={phoneNumber}
              onChange={handleChange}
              id="outlined-basic"
              name="PhoneNumber"
              label="Phone Number"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              value={address}
              onChange={handleChange}
              id="outlined-basic"
              name="Address"
              label="Delivery Address"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
          </div>
          <Button onClick={handleSubmit} fullWidth variant="contained" className="submit_button">
            Place Order
          </Button>
        </div>
        
        {products.length > 0 && (
          <div className="order_summary">
            <h2>Order Summary</h2>
            <div className="summary_items">
              {products.map((item, index) => (
                <div key={index} className="summary_item">
                  <span className="item_name">{item.productName}</span>
                  <span className="item_price">Rs: {item.price}</span>
                </div>
              ))}
            </div>
            <div className="summary_total">
              <span>Total:</span>
              <span className="total_amount">
                Rs: {products.reduce((total, item) => total + parseFloat(item.price), 0)}
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckOut;
