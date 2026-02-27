import { Button, Container, Typography, Box } from "@mui/material";
import "./ThankYou_Page.css";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HomeIcon from "@mui/icons-material/Home";

const ThankYou_Page = () => {
	return (
		<>
			<Container maxWidth="md" className="thankyou_container">
				<Box className="thankyou_page">
					<CheckCircleIcon className="success_icon" />
					<Typography variant="h3" className="thankyou_title">
					Thank You For Your Order!
				</Typography>
					<Typography variant="h6" className="thankyou_message">
					Your order has been successfully placed and will be delivered to you as soon as possible.
				</Typography>
					<Typography variant="body1" className="thankyou_submessage">
					You will receive a confirmation email shortly with your order details.
				</Typography>
					<Box className="order_info">
						<Typography variant="body2" className="info_item">
							<strong>Order Status:</strong> Processing
						</Typography>
						<Typography variant="body2" className="info_item">
							<strong>Estimated Delivery:</strong> 3-5 business days
						</Typography>
						<Typography variant="body2" className="info_item">
						<strong>Customer Support:</strong> Available 24/7
						</Typography>
					</Box>
			</Box>
				
				<Box className="thankyou_button">
					<Link to="/" className="home_link">
						<Button 
							variant="contained" 
							startIcon={<HomeIcon />}
							className="home_button"
							size="large"
						>
							Go Back To Home Page
						</Button>
					</Link>
				</Box>
			</Container>
		</>
	);
};

export default ThankYou_Page;
