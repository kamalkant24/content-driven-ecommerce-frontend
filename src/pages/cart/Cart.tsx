import { Container, Box, Typography, Paper, Button, IconButton, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getAllCart } from "../../store/cartSlice/cartsSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { getFullProductUrl } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { allCarts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [shippingPrice, setShippingPrice] = useState<number>(10);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllCart({ search: "", page: page.toString(), limit: 5 }));
  }, [dispatch, page]);

  const totalItems = allCarts?.data?.length || 0;
  const totalPrice = allCarts?.data?.reduce((acc: number, item: any) => acc + Number(item.price), 0);
  const showProductDetails = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Box className="flex justify-between flex-col md:flex-row">
        <Box className='w-[100%] md:w-[50%]' display="flex" flexDirection="column" gap={2}>
          <Typography variant="h4" gutterBottom>
            Shopping Cart
          </Typography>
          {allCarts?.data?.map((item: any) => (
            <Paper className="p-4 flex gap-4 flex-row flex-wrap justify-between w-full" onClick={() => showProductDetails(item?._id)}>
              <Box>
                <img src={getFullProductUrl(item?.image[0])} alt={item?.title} className="w-[50px] sm:w-[100px]"  />
                <Typography className="capitalize" sx={{ fontWeight: 'bold', marginTop: {xs:0, sm:2} }} variant="subtitle1">{item?.title}</Typography>
              </Box>
              <Box onClick={(e) => e.stopPropagation()} className='flex flex-col items-center gap-4'>
                <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
                <Box>
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                  <TextField
                    size="small"
                    value={1}
                    sx={{ width: 40, mx: 1 }}
                    inputProps={{ style: { textAlign: "center" } }}
                  />
                  <IconButton>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box className="flex flex-col gap-2 md:gap-4">
                <Box className="flex gap-4 items-center flex-row">
                  <Typography sx={{ fontWeight: 'bold' }}>Price: </Typography><Typography color="primary" sx={{ fontWeight: 'bold' }}>${item?.price}</Typography>
                </Box>
                <Box className="flex gap-4 items-center flex-row">
                  <Typography sx={{ fontWeight: 'bold' }}>Total: </Typography><Typography color="primary" sx={{ fontWeight: 'bold' }}>${(item?.price * 1).toFixed(2)}</Typography>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
        <Paper elevation={3} className="w-[100%] md:w-[40%] p-8 mt-8 md:mt-0 h-fit">
          <Typography variant="h5" className="pb-4 text-2xl font-semibold border-b">Order Summary</Typography>
          <Box className="flex justify-between my-8">
            <Typography className="text-sm font-semibold uppercase">Items {totalItems}</Typography>
            <Typography className="text-sm font-semibold">${totalPrice}</Typography>
          </Box>
          <Box className="my-8">
            <FormControl variant="standard" className="w-full">
              <InputLabel id="demo-simple-select-standard-label">Shipping</InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={shippingPrice}
                onChange={(e) => setShippingPrice(e.target.value)}
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
            <Button variant="outlined" className="h-fit">Apply</Button>
          </Box>
          <Box className="border-t">
            <Box className="flex justify-between py-6 text-sm font-semibold uppercase">
              <Typography>Total cost</Typography>
              <Typography>${totalPrice + shippingPrice}</Typography>
            </Box>
            <Button variant="contained">Checkout</Button>
          </Box>
        </Paper>
      </Box>



    </Container >
  );
};

export default Cart;


