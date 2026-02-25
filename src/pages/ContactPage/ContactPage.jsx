import "./ContactPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

const ContactPage = () => {
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerFeedback, setCustomerFeedback] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    if (name === "customerEmail") {
      setCustomerEmail(value);
    }
    if (name === "feedback") {
      setCustomerFeedback(value);
    }
  };

  const handleSubmit = async () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerEmail.trim()) {
      setMessage("Email is required");
      setOpen(true);
      return;
    }
    if (!emailRegex.test(customerEmail)) {
      setMessage("Please enter a valid email address");
      setOpen(true);
      return;
    }
    
    // Validate feedback
    if (!customerFeedback.trim()) {
      setMessage("Feedback is required");
      setOpen(true);
      return;
    }

    const CustomerData = {
      customerEmail,
      customerFeedback,
    };

    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/feedback/contact",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(CustomerData),
      }
    );
    const data = await response.json();
    setMessage(data.message);
    setOpen(true);
    setCustomerEmail("");
    setCustomerFeedback("");
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
      <div className="contact_heading">
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Send us your feedback or queries.</p>
      </div>
      <div className="contact_container">
        <div className="contact_form">
          <div className="form_fields">
            <TextField
              type="email"
              fullWidth
              value={customerEmail}
              onChange={handleChange}
              id="outlined-basic"
              name="customerEmail"
              label="Email Address"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              value={customerFeedback}
              onChange={handleChange}
              id="outlined-basic"
              name="feedback"
              label="Your Feedback/Query"
              variant="outlined"
              className="text_field"
              required
              sx={{ input: { color: "rgb(250, 55, 55)" } }}
            />
          </div>
          <Button onClick={handleSubmit} fullWidth variant="contained" className="submit_button">
            Send Message
          </Button>
        </div>
        
        <div className="contact_info">
          <div className="info_card">
            <h2>Contact Information</h2>
            <div className="info_item">
              <span className="info_label">Email:</span>
              <span className="info_value">support@ecommerce.com</span>
            </div>
            <div className="info_item">
              <span className="info_label">Phone:</span>
              <span className="info_value">+1 234 567 8900</span>
            </div>
            <div className="info_item">
              <span className="info_label">Address:</span>
              <span className="info_value">123 Commerce St, Business City, BC 12345</span>
            </div>
            <div className="info_item">
              <span className="info_label">Hours:</span>
              <span className="info_value">Mon-Fri: 9AM-6PM, Sat-Sun: 10AM-4PM</span>
            </div>
          </div>
          
          <div className="response_card">
            <h3>Response Time</h3>
            <p>We typically respond to inquiries within 24 hours during business days.</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactPage;
