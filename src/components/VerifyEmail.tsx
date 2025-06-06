import { Button, Container, Typography, CircularProgress, Box, P, Paper } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAsync } from "../store/authSlice/loginSlice";

const VerifyEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyUser = async () => {
    setLoading(true);
    setError(false);
    try {
      const response: any = await dispatch(verifyAsync(id));
      if (response?.payload?.code === 200) {
        setMessage(response.payload.message);
      } else {
        setError(true);
        setMessage("Verification failed. Please try again.");
      }
    } catch (error) {
      setError(true);
      setMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" className="mt-8 text-center">
      <Paper className="p-3" elevation={3}>
        <Typography variant="h4" gutterBottom>
          Email Verification
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : message ? (
          <>
            <Typography
              variant="h5"
              className={`capitalize ${error ? "text-red-600" : "text-green-600"}`}
              gutterBottom
            >
              {message}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                navigate("/");
              }}
              sx={{ mt: 3 }}
            >
              Back to Login Page
            </Button>
          </>
        ) : (
          <Box>
            <Typography variant="body1" gutterBottom>
              Click the button below to verify your email.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={verifyUser}
              sx={{ mt: 3 }}
            >
              Verify Email
            </Button>
          </Box>

        )}
      </Paper>
    </Container>
  );
};

export default VerifyEmail;
