import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { useEffect, useState } from "react";
import { getAllCart } from "../../store/cartSlice/cartsSlice";
import { CartCard } from "../../components/CartCard";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "../../components/CheckoutForm.tsx";
const VITE_APP_KEY = import.meta.env.VITE_APP_KEY


export const Checkout = () => {
    const { checkoutDetails, allCarts } = useSelector((state: RootState) => state.cart);
    const { userProfile } = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch();
    const fetchCarts = async () => await dispatch(getAllCart({ search: "", page: 1, limit: 5 }));
    const stripePromise = loadStripe(VITE_APP_KEY);
    const [showPaymentForm, setShowPaymentForm] = useState(false)
    useEffect(() => {
        if (!allCarts) {
            fetchCarts();
        }
    }, [])

    const getDiscountAmount = () => {
        const offerDiscount = checkoutDetails?.offer?.discount;
        return checkoutDetails?.totalPrice * (offerDiscount || 0) / 100;
    }
    if (!checkoutDetails) {
        return <Box className="flex items-center justify-center"><Typography variant="h5">No checkout details found.</Typography></Box>;
    }



    return <Container maxWidth="lg" sx={{ my: 4 }}>
        <Box className="flex flex-col md:flex-row gap-8">
            <Box className="w-full md:w-[50%] max-w-[30rem] mx-auto">
                <Typography variant="h4" gutterBottom>Checkout</Typography>

                <Paper elevation={3} className="mb-8 p-4 flex gap-4 flex-col">
                    <Typography variant="h5" className="pb-4 border-b">Delivery Address</Typography>
                    <Box className="flex justify-between gap-10">
                        <Typography>Name </Typography><Typography className="capitalize">{userProfile?.name}</Typography>
                    </Box>
                    <Box className="flex justify-between gap-10">
                        <Typography>Address </Typography><Typography className="capitalize break-all">123 Main Street, City, Country</Typography>
                    </Box>
                    <Box className="flex justify-between gap-10">
                        <Typography>Phone </Typography><Typography className="capitalize">{userProfile?.phone}</Typography>
                    </Box>
                </Paper>
                <Paper elevation={3} className="w-full p-4 h-fit">
                    <Typography variant="h5" className="pb-4 border-b">Order Summary</Typography>
                    <Box className="py-2 flex justify-between gap-10">
                        <Typography>Items ({checkoutDetails.noOfItems})</Typography>
                        <Typography>${checkoutDetails.totalPrice}</Typography>
                    </Box>
                    <Box className="py-2 flex justify-between gap-10">
                        <Typography>{checkoutDetails.offer?.label}</Typography>
                        <Typography>-${getDiscountAmount()}</Typography>
                    </Box>
                    <Box className="py-2 flex justify-between gap-10">
                        <Typography>Shipping ({checkoutDetails.shipping?.label})</Typography>
                        <Typography>${checkoutDetails.shipping?.price}</Typography>
                    </Box>
                    <Box className="py-2 flex justify-between gap-10 font-bold border-t pt-4">
                        <Typography>Total Payable</Typography>
                        <Typography sx={{ color: 'var(--secondary-color)' }}>${checkoutDetails.netPrice}</Typography>
                    </Box>
                    <Button
                        sx={{ backgroundColor: 'var(--primary-color)', marginTop: '1rem' }}
                        variant="contained"
                        onClick={() => setShowPaymentForm(true)}
                    >Proceed to Pay</Button>
                    {showPaymentForm && <Elements stripe={stripePromise}>
                        <CheckoutForm amount={checkoutDetails.netPrice} closeForm={() => setShowPaymentForm(false)} showPaymentForm={showPaymentForm}/>
                    </Elements>}
                </Paper>
            </Box>
            <Box className="w-full md:w-[50%] max-w-[30rem] mx-auto">
                <Typography variant="h5" className="pb-4">Your Items</Typography>
                {allCarts?.data?.map((item: any, index: number) => (
                    <CartCard item={item} key={index} checkoutCards={true} />
                ))}
            </Box>
        </Box>
    </Container>
}