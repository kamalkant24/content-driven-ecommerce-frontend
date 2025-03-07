import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getCheckoutDetails } from "../../store/cartSlice/cartsSlice";
import { CartCard } from "../../components/CartCard";

export const Checkout = () => {
  const { checkoutDetails } = useSelector((state: RootState) => state.cart);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      if (userProfile?._id) {
        const res = await dispatch(getCheckoutDetails(userProfile?._id));
      }
    })();
  }, [userProfile]);

  const getDiscountAmount = () => {
    const offerDiscount = checkoutDetails?.offer?.discount;
    return (checkoutDetails?.totalPrice * (offerDiscount || 0)) / 100;
  };

  const goToStripeCheckout = () => {
    window.open(checkoutDetails?.stripeSessionUrl, "_blank");
  };

  if (!checkoutDetails) {
    return (
      <Box className="flex items-center justify-center">
        <Typography variant="h5">No checkout details found.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box className="flex flex-col md:flex-row gap-8">
        <Box className="w-full md:w-[50%] max-w-[30rem] mx-auto">
          <Typography variant="h4" gutterBottom>
            Checkout
          </Typography>

          <Paper elevation={3} className="mb-8 p-4 flex gap-4 flex-col">
            <Typography variant="h5" className="pb-4 border-b">
              Delivery Address
            </Typography>
            <Box className="flex justify-between gap-10">
              <Typography>Name </Typography>
              <Typography className="capitalize">
                {userProfile?.name}
              </Typography>
            </Box>
            <Box className="flex justify-between gap-10">
              <Typography>Address </Typography>
              <Typography className="capitalize break-all">
                {userProfile?.address}
              </Typography>
            </Box>
            <Box className="flex justify-between gap-10">
              <Typography>Phone </Typography>
              <Typography className="capitalize">
                {userProfile?.phone}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} className="w-full p-4 h-fit">
            <Typography variant="h5" className="pb-4 border-b">
              Order Summary
            </Typography>
            <Box className="py-2 flex justify-between gap-10">
              <Typography>Items ({checkoutDetails.noOfItems})</Typography>
              <Typography>${checkoutDetails.totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box className="py-2 flex justify-between gap-10">
              <Typography>{checkoutDetails.offer?.label}</Typography>
              <Typography>-${getDiscountAmount().toFixed(2)}</Typography>
            </Box>
            <Box className="py-2 flex justify-between gap-10">
              <Typography>
                Shipping ({checkoutDetails.shipping?.label})
              </Typography>
              <Typography>
                ${checkoutDetails.shipping?.price.toFixed(2)}
              </Typography>
            </Box>
            <Box className="py-2 flex justify-between gap-10 font-bold border-t pt-4">
              <Typography>Total Payable</Typography>
              <Typography color="secondary">
                ${checkoutDetails.netPrice.toFixed(2)}
              </Typography>
            </Box>
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              onClick={goToStripeCheckout}
            >
              Proceed to Pay
            </Button>
          </Paper>
        </Box>
        <Box className="w-full md:w-[50%] max-w-[30rem] mx-auto">
          <Typography variant="h5" className="pb-4">
            Your Items
          </Typography>
          {checkoutDetails?.products?.map((item: any, index: number) => (
            <CartCard item={item} key={index} checkoutCards={true} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};
