import { Link } from "react-router-dom";
import "./Home.css";
// import Card from "react-bootstrap/Card";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Container } from "@mui/material";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const Home = () => {
  //Use state for storing and loading product from database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [fake, setFake] = useState([]);
  // console.log(fake);

  // Making fetch function for fetching product from database on local host
  const fetchproduct = async () => {
    setLoading(true);
    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/products/Allproducts",
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
    const data = await response.json();
    setProducts(data.product);
    console.log(products);
    setLoading(false);
  };

  // const fakestore = async () => {
  // 	setLoading(true);
  // 	const response = await fetch("https://fakestoreapi.com/products");
  // 	const jsonData = await response.json();
  // 	setFake(jsonData);
  // 	setLoading(false);
  // };

  useEffect(() => {
    // fakestore();
    //Calling fetch function for fetching product from database on local host
    fetchproduct();
  }, []);

  const AllMobiles = products.map((data, id) => [
    <Grid item md={3} key={id}>
      <Link
        style={{ textDecoration: "none" }}
        key={id}
        to={`/product_detail/${data._id}`}
      >
        <div className="phone">
          <Card className="card">
            <CardActionArea>
              {/* <CardMedia
                component="img"
                image={data.image}
                alt={data.productName}
                className="Homeproduct_img"
                sx={{ width: "70%", display: "block" }}
              /> */}
              <img src={data.image} alt="" className="Homeproduct_img" />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="Homeproduct_title"
                  fontSize={"20px"}
                >
                  {data.productName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {"Rs:" + data.price}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </Link>
    </Grid>,
  ]);

  return (
    <>
      <Container maxWidth="lg">
        <div className="heading_div">
          <h1>Say goodbye to the old and welcome the new!</h1>
          <h3>Shop The Lastest Gadgets Now At Affortable Prices</h3>
        </div>

        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={2} className="home_grid">
              {AllMobiles}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
};
export default Home;
