import "./Cart.css";
import CartContext from "../../context/cartContext";
import { useContext, useEffect, useState } from "react";
import { DeleteOutlined } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { Container, Grid, IconButton, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";

const Cart = () => {
	const cartContext = useContext(CartContext);
	const { cartItems, removeFromCart } = cartContext;

	return (
		<>
			<Container maxWidth="xl">
				<div className="cart_header">
					<Typography variant="h4" component="h1" className="cart_title">
						Shopping Cart
					</Typography>
				</div>

				<div className="cart_content">
					{cartItems.length ? (
						<>
							<div className="cart_items">
								{cartItems.map((item, id) => (
									<div key={id} className="cart_item">
										<div className="item_details">
											<Typography variant="h6" className="item_name">
												{item.productName}
											</Typography>
											<Typography variant="body1" className="item_price">
												Rs: {item.price}
											</Typography>
										</div>
										<IconButton
											className="delete_button"
											onClick={() => removeFromCart(item.productName)}
											aria-label="Delete item"
										>
											<DeleteOutlined className="delete_icon" />
										</IconButton>
									</div>
								))}
							</div>
							
							<div className="cart_actions">
								<Link to="/checkout" className="checkout_link">
									<Button variant="contained" className="checkout_button">
										Proceed to Checkout
									</Button>
								</Link>
								<Link to="/" className="home_link">
									<Button variant="outlined" className="home_button">
										Continue Shopping
									</Button>
								</Link>
							</div>
						</>
					) : (
						<div className="empty_cart">
							<Typography variant="h5" className="noitem_heading">
								No Items in the Cart
							</Typography>
							<Link to="/" className="home_link">
								<Button variant="contained" className="home_button">
									Start Shopping
								</Button>
							</Link>
						</div>
					)}
				</div>
			</Container>
		</>
	);
};

export default Cart;
