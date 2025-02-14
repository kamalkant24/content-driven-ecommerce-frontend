import { useEffect, useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { createPaymentIntent } from '../store/cartSlice/cartsSlice';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const CheckoutForm = ({ amount, closeForm, showPaymentForm }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
    useEffect(() => {
        (async () => {
            const response = await dispatch(createPaymentIntent(amount));
            const data = response.payload;
            setClientSecret(data.clientSecret);
        })();
    }, []);

    const handleSubmit = async (e) => {
        setPaymentProcessing(true);
        setIsPaymentSuccess(false);
        e.preventDefault();
        if (!stripe || !elements) return;
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
            },
        });
        if (error) {
            console.log(error);
            setMessage({ text: error.message, color: 'red' });
        } else {
            setMessage(`Payment ${paymentIntent.status}`);
            setMessage({ text: `Payment ${paymentIntent.status}`, color: 'green' });
            setIsPaymentSuccess(true);
        }
        setPaymentProcessing(false)
    };

    const cardElementOptions = {
        hidePostalCode: true,
        disableLink: true,
        style: {
            base: {
                fontSize: '16px',
                color: '#32325d',
                fontFamily: '"Roboto", sans-serif',
                '::placeholder': {
                    color: '#aab7c4',
                },
                padding: '10px',
            },
            invalid: {
                color: '#fa755a',
                iconColor: '#fa755a',
            },
        },
    };

    return (
        <Dialog sx={{maxWidth:'45rem', margin:'auto'}} fullWidth open={showPaymentForm} onClose={closeForm}>
            <DialogTitle>Pay With Card</DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography>Card Number</Typography>
                    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', p: 1, bgColor: 'white' }}>
                        <CardNumberElement options={cardElementOptions} />
                    </Box>
                    <Box className="flex flex-col sm:flex-row justify-between">
                        <Box className="sm:w-[50%] flex flex-col gap-4">
                            <Typography>Expiration Date</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: { xs: '8px', sm: 0 }, borderTopLeftRadius: { sm: '8px' }, borderBottomLeftRadius: { sm: '8px' }, p: 1, bgColor: 'white' }}>
                                <CardExpiryElement options={cardElementOptions} />
                            </Box>
                        </Box>
                        <Box className="sm:w-[50%] flex flex-col gap-4 mt-4 sm:mt-0">
                            <Typography>CVC</Typography>
                            <Box sx={{ border: '1px solid #ccc', borderRadius: { xs: '8px', sm: 0 }, borderTopRightRadius: { sm: '8px' }, borderBottomRightRadius: { sm: '8px' }, p: 1, bgColor: 'white' }}>
                                <CardCvcElement options={cardElementOptions} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <DialogContentText>
                    <Typography sx={{ fontSize: '1.2rem', my: 2 }}>
                        Payable Amount: <strong>${amount}</strong>
                    </Typography>
                    <Typography color={message.color}>{message.text}</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions className={`${isPaymentSuccess ? 'w-[90%]' : 'w-[90%]'} m-auto justify-center sm:gap-4`}>
                {isPaymentSuccess ? <Button variant='contained' fullWidth onClick={() => navigate('/products')}>Go To Home</Button> : <>{!paymentProcessing && <Button fullWidth variant="outlined" disabled={!stripe} onClick={closeForm}>Cancel</Button>}
                    <Button variant="contained" fullWidth
                        onClick={handleSubmit} loading={paymentProcessing}>Pay</Button></>}
            </DialogActions>
        </Dialog>
    );
};
