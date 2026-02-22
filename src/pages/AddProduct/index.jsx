import TextField from "@mui/material/TextField";
import "./addProduct.css";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

const AddProduct = () => {
  const navgiate = useNavigate();
  const [productName, setProductName] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const handleUpload = async (ev) => {
    const file = ev.target.files[0];
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "e_com_web");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dnqplq5hb/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const img_path = data.url;
    setImage(img_path);
    console.log(img_path);
  };

  const handleChange = (ev) => {
    const { value, name } = ev.target;
    if (name == "productName") {
      setProductName(value);
    }
    if (name == "color") {
      setColor(value);
    }
    if (name == "price") {
      setPrice(value);
    }
    if (name == "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async () => {
    // Validate product name
    if (!productName.trim()) {
      setMessage("Product name is required");
      setOpen(true);
      return;
    }
    
    // Validate color
    if (!color.trim()) {
      setMessage("Color is required");
      setOpen(true);
      return;
    }
    
    // Validate price
    if (!price.trim()) {
      setMessage("Price is required");
      setOpen(true);
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      setMessage("Please enter a valid price");
      setOpen(true);
      return;
    }
    
    // Validate description
    if (!description.trim()) {
      setMessage("Description is required");
      setOpen(true);
      return;
    }
    
    // Validate image
    if (!image) {
      setMessage("Product image is required");
      setOpen(true);
      return;
    }

    const productData = {
      productName,
      color,
      price: +price,
      description,
      image,
    };

    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/products/add",
      {
        method: "POST",
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

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navgiate("/login");
    }
  });
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
        <h1>Add product Form</h1>
        <TextField
          error
          fullWidth
          value={productName}
          onChange={handleChange}
          id="outlined-basic"
          name="productName"
          label="productName"
          variant="outlined"
          className="text_field"
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          error
          fullWidth
          value={color}
          onChange={handleChange}
          id="outlined-basic"
          name="color"
          label="Color"
          variant="outlined"
          className="text_field"
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          error
          fullWidth
          value={price}
          onChange={handleChange}
          id="outlined-basic"
          name="price"
          label="Price"
          variant="outlined"
          className="text_field"
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          error
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={handleChange}
          name="description"
          id="outlined-basic"
          label="Description"
          variant="outlined"
          className="text_field"
          sx={{ input: { color: "rgb(250, 55, 55)" } }}
        />
        <TextField
          error
          fullWidth
          onChange={handleUpload}
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

export default AddProduct;
