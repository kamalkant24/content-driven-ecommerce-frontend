import { Box, IconButton, Paper, TextField, Typography } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  getAllCart,
  removeItemFromCartSlice,
} from "../store/cartSlice/cartsSlice";

export const CartCard = ({ item, checkoutCards }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const showProductDetails = (id: string) => {
    if (!checkoutCards) navigate(`/products/${id}`);
  };

  const removeFromCart = async (e) => {
    e.stopPropagation();
    const res = await dispatch(removeItemFromCartSlice(item?.product?._id));
    if ((res.type = "get/removecart/fulfilled")) {
      await dispatch(getAllCart());
    }
  };

  const setItemCount = async(count) => {
    console.log({count});
    
    const res = await dispatch(setItemCountSlice(item?.product?._id, count));

  }
  return (
    <Paper
      square
      elevation={0}
      sx={{ boxShadow: { xs: 0, sm: 3 } }}
      className="sm:px-12 sm:py-8 flex gap-2 flex-row justify-between w-full relative border-b sm:border-none border-primaryColor pb-4 pt-10 cursor-pointer"
      onClick={() => showProductDetails(item?.product?._id)}
    >
      <Box>
        <img
          src={item?.product?.images[0]}
          alt={item?.product?.title}
          className={`w-[50px] ${!checkoutCards && "sm:w-[100px]"} `}
        />
        <Typography
          className="capitalize"
          sx={{
            textAlign: "center",
            marginTop: 2,
            fontSize: { xs: "0.8rem", sm: "1rem" },
          }}
          variant="subtitle1"
        >
          {item?.product?.title}
        </Typography>
      </Box>
      <Box
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-4"
      >
        <Typography>Quantity</Typography>
        <Box className="flex items-center">
          {checkoutCards ? (
            <Typography>1</Typography>
          ) : (
            <>
              <IconButton onClick={() => setItemCount(item?.quantity + 1)}>
                <RemoveIcon sx={{ width: { xs: "15px", sm: "auto" } }} />
              </IconButton>
              <TextField
                size="small"
                value={item?.quantity}
                sx={{
                  width: { xs: 30, sm: 40 },
                  mx: { xs: 0.5, sm: 1 },
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "12px", sm: "16px" },
                    textAlign: "center",
                    padding: { xs: "4px", sm: "8px" },
                  },
                }}
                inputProps={{ style: { textAlign: "center" } }}
              />
              <IconButton>
                <AddIcon sx={{ width: { xs: "15px", sm: "auto" } }} />
              </IconButton>
            </>
          )}
        </Box>
      </Box>
      <Box className="flex flex-col sm:justify-start w-fit gap-2 md:gap-4">
        <Box className="flex gap-4 items-center flex-row">
          <Typography>Price: </Typography>
          <Typography>${item?.product?.discount_price.toFixed(2)}</Typography>
        </Box>
        <Box className="flex gap-4 items-center flex-row">
          <Typography>Total: </Typography>
          <Typography>
            ${(item?.product?.discount_price * item?.quantity).toFixed(2)}
          </Typography>
        </Box>
      </Box>
      {!checkoutCards && (
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: { xs: 0, sm: 8 },
            color: "red",
            padding: 0,
          }}
          aria-label="Remove for Cart"
          onClick={(e) => removeFromCart(e)}
        >
          <CloseIcon />
        </IconButton>
      )}
    </Paper>
  );
};