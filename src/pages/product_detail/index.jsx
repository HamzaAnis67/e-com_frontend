import "./Product_detail.css";
import CartContext from "../../context/cartContext";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Grid, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

const Product_detail = () => {
  const [test, setTest] = useState({});
  const [singleProduct, setSingleProduct] = useState({});
  const [productName, setProductName] = useState();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const { addToCart, removeFromCart, cartItems } = cartContext;

  //Making fetch function for fetching single product from database on local host
  const fetchSingleProduct = async () => {
    setLoading(true);
    const response = await fetch(
      `https://e-com-backend-2f27.onrender.com/products/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    setTest(data.product);
    setProductName(data.product.productName);
    setLoading(false);
  };

  // const Singlefakestore = async () => {
  // 	setLoading(true);
  // 	const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  // 	const jsonData = await response.json();
  // 	setTest(jsonData);
  // 	setLoading(false);
  // };

  const deleteSingleProduct = async () => {
    const response = await fetch(
      `https://e-com-backend-2f27.onrender.com/products/delete/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const data = await response.json();
    console.log(data);
    setMessage(data.message);
    setOpen(true);
  };
  useEffect(() => {
    fetchSingleProduct();
    // Singlefakestore();
    const isUser = localStorage.getItem("user");
    if (isUser) {
      setUser(isUser);
    }
  }, []);

  return (
    <>
      <div className="Heading">
        <h1>Product Details</h1>
      </div>
      <div className="product_container">
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
              <Grid item xs={12} md={5} lg={4}>
                <div className="detail_page">
                  <img src={test.image} alt={test.productName} />
                </div>
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <div className="product_details">
                  <h2>{"Name: " + test.productName}</h2>
                  {/* <h2>{"ID: " + test._id}</h2> */}
                  <h2>{"Price: " + test.price + " Rs"}</h2>
                  <h2>{"Description: " + test.description}</h2>
                  <div className="button_container">
                    <Button
                      variant="outlined"
                      color="error"
                      className="cart_button"
                      onClick={() => addToCart(test)}
                    >
                      Add To Cart
                    </Button>
                    <Button
                      className="RemoveFromCart_btn"
                      variant="outlined"
                      color="error"
                      disabled={!(cartItems.some(item => item.productName === test.productName))}
                      onClick={() => removeFromCart(test.productName)}
                    >
                      Remove From Cart
                    </Button>
                  </div>
                  <div className="back_button_container">
                    <Link to="/">
                      <Button variant="contained">Back To Home Page</Button>
                    </Link>
                  </div>
                </div>
              </Grid>
            </Grid>

            {user ? (
              <div className="main">
                <Snackbar
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  open={open}
                  onClose={() => setOpen(false)}
                  autoHideDuration={3000}
                  message={message}
                />
                <Grid container>
                  <Grid item xs={12}>
                    <div className="admin_actions">
                      <IconButton
                        onClick={() => navigate(`/products/edit/${id}`)}
                        className="action_button"
                      >
                        <EditIcon
                          fontSize="large"
                          className="singleproduct_icon"
                        />
                      </IconButton>
                      <IconButton 
                        onClick={() => deleteSingleProduct()}
                        className="action_button"
                      >
                        <DeleteIcon
                          fontSize="large"
                          className="singleproduct_icon"
                        />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};
export default Product_detail;
