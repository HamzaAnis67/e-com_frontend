import { CircularProgress, Container, Typography, Box, Grid, Card, CardContent, Chip } from "@mui/material";
import "./Orders.css";
import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchorders = async () => {
    setLoading(true);
    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/orders/allorders",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setOrders(data.orders);
    setLoading(false);
  };

  useEffect(() => {
    fetchorders();
  }, []);
  const allorders = orders.map((data, id) => {
    return (
      <Grid item xs={12} sm={10} md={8} lg={6} key={id}>
        <Card className="order_card">
          <CardContent className="order_content">
            <div className="order_header">
              <Typography variant="h6" className="customer_name">
                {data.name}
              </Typography>
              <Typography variant="body2" className="order_id">
                Order #{id + 1}
              </Typography>
            </div>
            
            <div className="order_details">
              <div className="detail_item">
                <span className="detail_label">Email:</span>
                <span className="detail_value">{data.email}</span>
              </div>
              <div className="detail_item">
                <span className="detail_label">Phone:</span>
                <span className="detail_value">{data.phoneNumber}</span>
              </div>
              <div className="detail_item">
                <span className="detail_label">Address:</span>
                <span className="detail_value">{data.address}</span>
              </div>
            </div>
            
            <div className="order_products">
              <Typography variant="subtitle2" className="products_title">
                Products ({data.products.length})
              </Typography>
              <div className="products_list">
                {data.products.map((product, index) => (
                  <Chip
                    key={index}
                    label={`Product ${index + 1} , Product Id: ${product}`}
                    size="small"
                    className="product_chip"
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <>
      <div className="orders_heading">
        <Typography variant="h1">Customer Orders</Typography>
        <Typography variant="body1">
          Manage and view all customer orders
        </Typography>
      </div>
      
      {loading ? (
        <Box className="loading_container">
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Box className="empty_state">
          <Typography variant="h6">No orders available</Typography>
          <Typography variant="body2">
            Orders will appear here once customers start shopping
          </Typography>
        </Box>
      ) : (
        <Container maxWidth="lg" className="orders_container">
          <Grid container spacing={3} justifyContent="center">
            {allorders}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Orders;
