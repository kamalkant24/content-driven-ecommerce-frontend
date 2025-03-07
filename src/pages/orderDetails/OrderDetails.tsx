import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { getOrderDetails } from "../../store/order/orderSlice";

export const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { order, loading, error } = useSelector(
    (state: RootState) => state.order
  );

  useEffect(() => {
    dispatch(getOrderDetails(id || ""));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error || !order) {
    return (
      <Typography variant="h5" textAlign="center" mt={4} color="error">
        Something went wrong. Please try again later.
      </Typography>
    );
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Card elevation={3} sx={{ p: 3 }} className="flex flex-col gap-8">
        <Typography variant="h4" textAlign="center">
          Order Details
        </Typography>
        <Grid container spacing={4}>
          <Grid item sm={12} className="capitalize">
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="h6">
                Order ID
              </Typography>
              <Typography variant="h6">{order._id}</Typography>
            </Box>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="body1">
                Order Status
              </Typography>
              <Typography variant="body1">{order.orderStatus}</Typography>
            </Box>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="body1">
                Payment Status
              </Typography>
              <Typography variant="body1">{order.paymentStatus}</Typography>
            </Box>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="body1">
                Payment Method
              </Typography>
              <Typography variant="body1">{order.paymentMethod}</Typography>
            </Box>
          </Grid>
          <Grid item sm={12}>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="h6">
                Total Amount
              </Typography>
              <Typography variant="h6">
                ${order.totalAmount.toFixed(2)}
              </Typography>
            </Box>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="body1">
                Shipping Address
              </Typography>
              <Typography variant="body1">{order.shippingAddress}</Typography>
            </Box>
            <Box className="flex">
              <Typography sx={{ width: "15rem" }} variant="body1">
                Ordered At
              </Typography>
              <Typography variant="body1">
                {new Date(order.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Ordered Products
          </Typography>
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.products.map((item: any) => (
                  <TableRow key={item.product._id}>
                    <TableCell>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        width="50"
                        height="50"
                        style={{ borderRadius: "5px" }}
                      />

                      <Box sx={{ marginTop: "0.5rem" }}>
                        {item.product.title}
                      </Box>
                    </TableCell>
                    <TableCell>
                      ${item.product.discount_price.toFixed(2)}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      $
                      {(item.product.discount_price * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {order?.orderStatus === "delivered" && (
          <Button variant="outlined" sx={{ marginTop: "2rem" }}>
            Add Review and Rating
          </Button>
        )}
      </Card>
    </Container>
  );
};
