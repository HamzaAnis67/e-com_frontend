import TextField from "@mui/material/TextField";
import "./editProduct.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const EditProduct = () => {
  const { id } = useParams();
  const navgiate = useNavigate();
  const [test, setTest] = useState({});
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    setTest(() => {
      return {
        ...test,
        [name]: value,
      };
    });
  };
  const fetchProduct = async () => {
    const response = await fetch(
      `https://e-com-backend-2f27.onrender.com/products/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setTest(data.product);
  };

  useEffect(() => {
    fetchProduct();
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navgiate("/login");
    }
  }, []);

  const handleSubmit = async () => {
    // Validate product name
    if (!test.productName || !test.productName.trim()) {
      setMessage("Product name is required");
      setOpen(true);
      return;
    }
    
    // Validate color
    if (!test.color || !test.color.trim()) {
      setMessage("Color is required");
      setOpen(true);
      return;
    }
    
    // Validate price
    if (!test.price || !test.price.toString().trim()) {
      setMessage("Price is required");
      setOpen(true);
      return;
    }
    if (isNaN(test.price) || parseFloat(test.price) <= 0) {
      setMessage("Please enter a valid price");
      setOpen(true);
      return;
    }
    
    // Validate description
    if (!test.description || !test.description.trim()) {
      setMessage("Description is required");
      setOpen(true);
      return;
    }

    const productData = { ...test };
    const response = await fetch(
      `https://e-com-backend-2f27.onrender.com/products/edit/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();
    setMessage(data.message);
    setOpen(true);
    setProductName("");
    setColor("");
    setDescription("");
    setPrice("");
    setImage("");
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
      <div className="container_form">
        <h1>Edit Product</h1>
        <TextField
          fullWidth
          error
          value={test.productName}
          onChange={handleChange}
          id="outlined-basic"
          name="productName"
          variant="outlined"
          required
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          fullWidth
          error
          value={test.color}
          onChange={handleChange}
          id="outlined-basic"
          name="color"
          variant="outlined"
          required
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          fullWidth
          error
          value={test.price}
          onChange={handleChange}
          id="outlined-basic"
          name="price"
          variant="outlined"
          required
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          fullWidth
          error
          multiline
          rows={4}
          inputProps={{ style: { color: "rgb(250, 55, 55)" } }}
          value={test.description}
          onChange={handleChange}
          name="description"
          id="outlined-basic"
          variant="outlined"
          required
        />
        <TextField
          fullWidth
          error
          onChange={handleChange}
          name="image"
          type="file"
          id="outlined-basic"
          variant="outlined"
        />
        <Button onClick={handleSubmit} fullWidth variant="contained">
          Submit
        </Button>
      </div>
    </>
  );
};

export default EditProduct;
