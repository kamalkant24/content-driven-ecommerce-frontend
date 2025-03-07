import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getOrders } from "../../store/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";

export const Orders = () => {
  const { orders, loading } = useSelector((state: RootState) => state.order);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const userId = userProfile?._id;
    if (userId) {
      dispatch(getOrders(userId));
    }
  }, [userProfile, dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No Orders Yet
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Order ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Total Amount</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Method</strong>
                </TableCell>
                <TableCell>
                  <strong>Order Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Ordered At</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow
                  key={order._id}
                  className="capitalize hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate(`/orders/${order._id}`)}
                >
                  <TableCell>{order._id}</TableCell>
                  <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};
