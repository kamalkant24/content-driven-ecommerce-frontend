import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import {
  getAllCart,
  setCheckoutDetails,
} from "../../store/cartSlice/cartsSlice";
import { CartCard } from "../../components/CartCard";
import { useNavigate } from "react-router-dom";
import { CartCardInterface } from "../../interface";

const Cart = () => {
  const { allCarts, cartsLoading } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch<AppDispatch>();
  const [shippingChargeId, setShhippingId] = useState<number>(1);
  const [offerId, setOfferId] = useState<number>(1);

  const navigate = useNavigate();

  const fetchCarts = async () => {
    await dispatch(getAllCart());
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const totalItems = allCarts?.length || 0;
  if (allCarts) {
  }
  const totalPrice = allCarts
    ? allCarts?.reduce(
        (acc: number, item: any) =>
          acc + Number(item?.product?.discount_price) * item?.quantity,
        0
      )
    : 0;

  const shippingCharges = [
    { id: 1, label: "Standard shipping", price: 10 },
    { id: 2, label: "Fast shipping", price: 15 },
  ];

  const offers = [
    { id: 1, label: "Save 5% on your order!", discount: 5 },
    { id: 2, label: "Exclusive Deal: 10% Off!", discount: 10 },
  ];

  const doCheckout = async () => {
    const checkoutDetails = {
      noOfItems: totalItems,
      totalPrice,
      shipping: shippingCharges?.find(
        (charge) => charge?.id === shippingChargeId
      ),
      offer: offers?.find((offer) => offer?.id === offerId),
      netPrice: getNetPrice(),
    };
    const response = await dispatch(setCheckoutDetails(checkoutDetails));
    if (response.type === "set/setCheckoutDetails/fulfilled") {
      navigate("/checkout");
    }
  };

  const getShippingPrice = () => {
    const shippingPrice = shippingCharges.find(
      (charge) => charge?.id === shippingChargeId
    )?.price;
    return shippingPrice;
  };

  const getDiscountAmount = () => {
    const offerDiscount = offers.find(
      (offer) => offer?.id === offerId
    )?.discount;
    return (totalPrice * (offerDiscount || 0)) / 100;
  };

  const getPriceAfterDiscount = () => {
    return totalPrice - getDiscountAmount();
  };

  const getDiscountPercentage = () => {
    return offers.find((offer) => offer?.id === offerId)?.discount;
  };

  const getNetPrice = () => getPriceAfterDiscount() + (getShippingPrice() || 0);
  if (allCarts?.length === 0 || !allCarts) {
    return (
      <Container>
        <Typography textAlign={"center"} variant="h4">
          No Items In The Cart
        </Typography>
      </Container>
    );
  }
  if (cartsLoading === "pending")
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <CircularProgress />
      </div>
    );

  return (
    <Container maxWidth="lg" sx={{ mb: 4 }}>
      <Box className="flex justify-between flex-col md:flex-row">
        <Box
          className="w-[100%] md:w-[55%] max-w-[30rem] m-auto"
          display="flex"
          flexDirection="column"
        >
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {allCarts?.map((item: CartCardInterface, index: number) => (
            <>
              <CartCard item={item} key={index} />
            </>
          ))}
        </Box>
        <Paper
          elevation={3}
          className="w-[100%] md:w-[40%] max-w-[35rem] m-auto p-8 mt-8 md:mt-0 h-fit sticky top-[7rem]"
        >
          <Typography variant="h5" className="pb-4 text-2xl border-b">
            Order Details
          </Typography>
          <Box className="flex justify-between my-8">
            <Typography sx={{ fontWeight: "bold" }} className="uppercase">
              Items {totalItems}
            </Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Box className="my-8">
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">
                Shipping
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={shippingChargeId}
                onChange={(e: any) => setShhippingId(e.target.value)}
                label="Shipping"
              >
                {shippingCharges.map((charge) => (
                  <MenuItem
                    key={charge?.id}
                    value={charge?.id}
                  >{`${charge?.label} - $${charge?.price}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="my-8">
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">
                Offers
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={offerId}
                onChange={(e: any) => setOfferId(e.target.value)}
                label="Offers"
              >
                {offers.map((offer) => (
                  <MenuItem
                    key={offer?.id}
                    value={offer?.id}
                  >{`${offer?.label}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box className="border-t pt-6">
            <Box className="flex justify-between py-2">
              <Typography>{`Discount (${getDiscountPercentage()}%)`}</Typography>
              <Typography>-${getDiscountAmount().toFixed(2)}</Typography>
            </Box>
            <Box className="flex justify-between py-2">
              <Typography>{`Price After Discount`}</Typography>
              <Typography>${getPriceAfterDiscount().toFixed(2)}</Typography>
            </Box>
            <Box className="flex justify-between py-2">
              <Typography>Delivery Charges</Typography>
              <Typography>${getShippingPrice()}</Typography>
            </Box>
            <Box className="flex justify-between py-2  uppercase">
              <Typography sx={{ fontWeight: "bold" }}>Net Cost</Typography>
              <Typography color="secondary" sx={{ fontWeight: "bold" }}>
                ${getNetPrice().toFixed(2)}
              </Typography>
            </Box>
            <Button
              sx={{ marginTop: "1rem" }}
              variant="contained"
              onClick={doCheckout}
            >
              Checkout
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Cart;
