import "./Register.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const Register = () => {
  const navgiate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    if (name === "userEmail") {
      setUserEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userEmail.trim()) {
      setMessage("Email is required");
      setOpen(true);
      return;
    }
    if (!emailRegex.test(userEmail)) {
      setMessage("Please enter a valid email address");
      setOpen(true);
      return;
    }
    
    // Validate password
    if (!password.trim()) {
      setMessage("Password is required");
      setOpen(true);
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setOpen(true);
      return;
    }

    const userData = {
      userEmail,
      password,
    };

    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );
    const data = await response.json();
    setMessage(data.message);
    setOpen(true);

    if (data.message === "User Registered Sucessfully") {
      navgiate("/login");
    }
  };

  useEffect(() => {
    const isUser = localStorage.getItem("user");
    if (!isUser) {
      navgiate("/login");
    }
  }, []);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        message={message}
      />
      
      <div className="register_heading">
        <h1>Create Account</h1>
        <p>Join us to start shopping for amazing products</p>
      </div>
      
      <div className="register_container">
        <div className="register_form">
          <div className="form_fields">
            <TextField
              error
              fullWidth
              value={userEmail}
              onChange={handleChange}
              id="outlined-basic"
              name="userEmail"
              label="Email Address"
              variant="outlined"
              type="email"
              className="text_field"
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
            <TextField
              error
              fullWidth
              value={password}
              onChange={handleChange}
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              className="text_field"
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
              helperText="Password must be at least 6 characters"
            />
          </div>
          <Button onClick={handleSubmit} fullWidth variant="contained" className="submit_button">
            Register
          </Button>
          
          <div className="form_footer">
            <p>Already have an account?</p>
            <Button 
              variant="text" 
              className="login_link"
              onClick={() => navgiate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
        
        <div className="register_info">
          <div className="info_card">
            <h2>Welcome!</h2>
            <p>Create your account to access exclusive features and personalized shopping experience.</p>
            <div className="feature_list">
              <div className="feature_item">
                <span className="feature_icon">🛍️</span>
                <span>Shop Premium Products</span>
              </div>
              <div className="feature_item">
                <span className="feature_icon">🚚</span>
                <span>Fast Delivery</span>
              </div>
              <div className="feature_item">
                <span className="feature_icon">💳</span>
                <span>Secure Payments</span>
              </div>
              <div className="feature_item">
                <span className="feature_icon">🎁</span>
                <span>Special Offers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
