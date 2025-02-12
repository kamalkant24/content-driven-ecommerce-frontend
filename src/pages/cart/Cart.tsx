import { Container, Box, Typography, Paper, Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllCart } from "../../store/cartSlice/cartsSlice";
import { CartCard } from "../../components/CartCard";

const Cart = () => {
  const { allCarts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [shippingPrice, setShippingPrice] = useState<number>(10);

  useEffect(() => {
    dispatch(getAllCart({ search: "", page: page.toString(), limit: 5 }));
  }, [dispatch, page]);

  const totalItems = allCarts?.data?.length || 0;
  const totalPrice = allCarts?.data?.reduce((acc: number, item: any) => acc + Number(item.price), 0);


  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box className="flex justify-between flex-col md:flex-row">
        <Box className='w-[100%] md:w-[55%] max-w-[35rem] m-auto' display="flex" flexDirection="column" gap={4}>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {allCarts?.data?.map((item: any, index: number) => (
            <CartCard item={item} key={index} />
          ))}
        </Box>
        <Paper elevation={3} className="w-[100%] md:w-[40%] max-w-[35rem] m-auto p-8 mt-8 md:mt-0 h-fit sticky top-[7rem]">
          <Typography variant="h5" className="pb-4 text-2xl border-b">Order Summary</Typography>
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
                value={shippingPrice}
                onChange={(e:any) => setShippingPrice(e.target.value)}
                label="Shipping"
              >
                <MenuItem value={10}>Standard shipping - $10.00</MenuItem>
                <MenuItem value={15}>Fast shipping - $15.00</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="pb-8 flex items-end gap-8 justify-between">
            <Box className="w-full">
              <Typography >Promo Code</Typography>
              <TextField fullWidth id="standard-basic" label="Enter Your Code" variant="standard" />
            </Box>
            <Button sx={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }} variant="outlined" className="h-fit">Apply</Button>
          </Box>
          <Box className="border-t">
            <Box className="flex justify-between py-6  uppercase">
              <Typography sx={{ fontWeight: 'bold' }}>Total cost</Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'var(--secondary-color)' }}>${totalPrice + shippingPrice}</Typography>
            </Box>
            <Button sx={{ backgroundColor: 'var(--primary-color)' }} variant="contained">Checkout</Button>
          </Box>
        </Paper>
      </Box>



    </Container >
  );
};

export default Cart;


