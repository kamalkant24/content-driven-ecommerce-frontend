import { Container, Box, Typography, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllCart, setCheckoutDetails } from "../../store/cartSlice/cartsSlice";
import { CartCard } from "../../components/CartCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { allCarts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [shippingChargeId, setShhippingId] = useState<number>(1);
  const [offerId, setOfferId] = useState<number>(1);

  const navigate = useNavigate();

  const fetchCarts = async () => await dispatch(getAllCart({ search: "", page: 1, limit: 5 }));

  useEffect(() => {
    if (!allCarts) {
      fetchCarts();
    }
  })

  const totalItems = allCarts?.data?.length || 0;
  const totalPrice = allCarts?.data?.reduce((acc: number, item: any) => acc + Number(item.price), 0);

  const shippingCharges = [
    { id: 1, label: 'Standard shipping', price: 10 },
    { id: 2, label: 'Fast shipping', price: 15 }
  ]

  const offers = [
    { id: 1, label: 'Save 5% on your order!', discount: 5 },
    { id: 2, label: 'Exclusive Deal: 10% Off!', discount: 10 }
  ]

  const doCheckout = async () => {
    const checkoutDetails = {
      noOfItems: totalItems,
      totalPrice,
      shipping: shippingCharges?.find((charge) => charge?.id === shippingChargeId),
      offer: offers?.find(offer => offer?.id === offerId),
      netPrice: getNetPrice()
    }
    const response = await dispatch(setCheckoutDetails(checkoutDetails));
    if (response.type === 'set/setCheckoutDetails/fulfilled') {
      navigate('/checkout')
    }
  }

  const getShippingPrice = () => {
    const shippingPrice = shippingCharges.find((charge) => charge?.id === shippingChargeId)?.price;
    return shippingPrice
  }

  const getDiscountAmount = () => {
    const offerDiscount = offers.find((offer) => offer?.id === offerId)?.discount;
    return totalPrice * (offerDiscount || 0) / 100;
  }

  const getPriceAfterDiscount = () => {
    return totalPrice - getDiscountAmount();
  }

  const getDiscountPercentage = () => {
    return offers.find((offer) => offer?.id === offerId)?.discount;
  }

  const getNetPrice = () => getPriceAfterDiscount() + getShippingPrice();


  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box className="flex justify-between flex-col md:flex-row">
        <Box className='w-[100%] md:w-[55%] max-w-[30rem] m-auto' display="flex" flexDirection="column" >
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {allCarts?.data?.map((item: any, index: number) => (
            <CartCard item={item} key={index} />
          ))}
        </Box>
        <Paper elevation={3} className="w-[100%] md:w-[40%] max-w-[35rem] m-auto p-8 mt-8 md:mt-0 h-fit sticky top-[7rem]">
          <Typography variant="h5" className="pb-4 text-2xl border-b">Order Details</Typography>
          <Box className="flex justify-between my-8">
            <Typography sx={{ fontWeight: 'bold' }} className="uppercase">Items {totalItems}</Typography>
            <Typography sx={{ fontWeight: 'bold' }}>${totalPrice}</Typography>
          </Box>
          <Box className="my-8">
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">Shipping</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={shippingChargeId}
                onChange={(e: any) => setShhippingId(e.target.value)}
                label="Shipping"
              >
                {shippingCharges.map(charge => <MenuItem key={charge?.id} value={charge?.id}>{`${charge?.label} - $${charge?.price}`}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          {/* <Box className="pb-8 flex items-end gap-8 justify-between">
            <Box className="w-full">
              <Typography >Offers</Typography>
              <TextField value={inputPromo} fullWidth id="standard-basic" label="Enter Your Code [GET]" variant="standard" onChange={(e) => setInputPromo(e.target.value)} />
            </Box>
            <Button sx={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }} variant="outlined" className="h-fit" onClick={applyPromo}>Apply</Button>
          </Box> */}
          <Box className="my-8">
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">Offers</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={offerId}
                onChange={(e: any) => setOfferId(e.target.value)}
                label="Offers"
              >
                {offers.map(offer => <MenuItem key={offer?.id} value={offer?.id}>{`${offer?.label}`}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
          <Box className="border-t pt-6">
            <Box className="flex justify-between py-2">
              <Typography>{`Discount (${getDiscountPercentage()}%)`}</Typography>
              <Typography>-${getDiscountAmount()}</Typography>
            </Box>
            <Box className="flex justify-between py-2">
              <Typography>{`Price After Discount`}</Typography>
              <Typography>${getPriceAfterDiscount()}</Typography>
            </Box>
            <Box className="flex justify-between py-2">
              <Typography>Delivery Charges</Typography>
              <Typography>${getShippingPrice()}</Typography>
            </Box>
            <Box className="flex justify-between py-2  uppercase">
              <Typography sx={{ fontWeight: 'bold' }}>Net Cost</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--secondary-color)' }}>${getNetPrice()}</Typography>
            </Box>
            <Button sx={{ backgroundColor: 'var(--primary-color)', marginTop: '1rem' }} variant="contained" onClick={doCheckout}>Checkout</Button>
          </Box>
        </Paper>
      </Box>
    </Container >
  );
};

export default Cart;


