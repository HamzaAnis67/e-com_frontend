import "./Feedbacks.css";
import { useEffect, useState } from "react";
import { CircularProgress, Container, Typography, Box, Grid } from "@mui/material";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchfeedbacks = async () => {
    setLoading(true);
    const response = await fetch(
      "https://e-com-backend-2f27.onrender.com/feedback/allfeedbacks",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setFeedback(data.feedbacks);
    setLoading(false);
  };

  useEffect(() => {
    fetchfeedbacks();
  }, []);

  const allfeedback = feedback.map((data, id) => {
    return (
      <Grid item xs={12} sm={10} md={8} lg={6} key={id}>
        <div className="feedback_info">
          <div className="feedback_header">
            <Typography variant="h3" className="feedback_email">
              Customer Email
            </Typography>
            <Typography variant="body1" className="email_value">
              {data.customerEmail}
            </Typography>
          </div>
          <div className="feedback_content">
            <Typography variant="h3" className="feedback_title">
              Customer Feedback
            </Typography>
            <Typography variant="body1" className="feedback_text">
              {data.customerFeedback}
            </Typography>
          </div>
        </div>
      </Grid>
    );
  });

  return (
    <>
      <div className="feedback_heading">
        <h1>Customer Feedback</h1>
        
      </div>
      
      {loading ? (
        <Box className="loading_container">
          <CircularProgress />
        </Box>
      ) : feedback.length === 0 ? (
        <Box className="empty_state">
          <Typography variant="h6">No feedback available</Typography>
          <Typography variant="body2">
            Be the first to share your thoughts with us!
          </Typography>
        </Box>
      ) : (
        <Container maxWidth="lg" className="feedback_container">
          <Grid container spacing={3} justifyContent="center">
            {allfeedback}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default Feedback;
