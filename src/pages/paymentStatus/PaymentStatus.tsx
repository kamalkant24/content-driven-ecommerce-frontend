import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

export const PaymentStatus = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const isSuccess = type === "success";

  return (
    <Box className="absolute inset-0 flex justify-center items-center flex-col p-4">
      {isSuccess ? (
        <CheckCircleIcon
          sx={{ fontSize: { xs: 90, sm: 100 }, color: "green" }}
        />
      ) : (
        <ErrorIcon style={{ fontSize: 100, color: "red" }} />
      )}
      <Typography
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem" }, fontWeight: "semi-bold" }}
        mt={2}
        textAlign={"center"}
      >
        {isSuccess ? "Payment Successful!" : "Payment Failed!"}
      </Typography>
      <Typography variant="body1" mt={1} textAlign={"center"}>
        {isSuccess
          ? "Thank you for your purchase! Your order has been confirmed."
          : "Oops! Something went wrong with your payment. Please try again."}
      </Typography>
      <Stack direction="row" mt={2} spacing={2}>
        <Button variant="contained" onClick={() => navigate("/products")}>
          Go to Home
        </Button>
        {isSuccess && (
          <Button variant="outlined" onClick={() => navigate("/orders")}>
            Go to Orders
          </Button>
        )}
      </Stack>
    </Box>
  );
};
