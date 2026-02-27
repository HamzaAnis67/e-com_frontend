import "./LoginPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const LoginPage = () => {
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

    const userData = {
      userEmail,
      password,
    };

    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/users/login",
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
    if (data.message === "Login Successful") {
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
    }
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={3000}
        message={message}
      />

      <div className="login_heading">
        <h1>Admin Login</h1>
        <p>Enter your credentials to access the admin panel</p>
      </div>
      
      <div className="login_container">
        <div className="login_form">
          <div className="form_fields">
            <TextField
              fullWidth
              error
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
              fullWidth
              error
              value={password}
              onChange={handleChange}
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              type="password"
              className="text_field"
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
          </div>
          <Button onClick={handleSubmit} fullWidth variant="contained" className="submit_button">
            Login
          </Button>
        </div>
        
        <div className="login_info">
          <div className="info_card">
            <h2>Welcome Back!</h2>
            <p>Access your admin dashboard to manage products, view orders, and handle customer feedback.</p>
            <div className="feature_list">
              <div className="feature_item">
                <span className="feature_icon">📦</span>
                <span>Manage Products</span>
              </div>
              <div className="feature_item">
                <span className="feature_icon">🛒</span>
                <span>View Orders</span>
              </div>
              <div className="feature_item">
                <span className="feature_icon">💬</span>
                <span>Customer Feedback</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
