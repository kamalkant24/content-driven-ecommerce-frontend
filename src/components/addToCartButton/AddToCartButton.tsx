import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { addToCart } from "../../store/cartSlice/cartsSlice";

interface AddToCartButtonProps {
  productId: string;
  disabled: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  productId,
  disabled,
}) => {
  const navigate = useNavigate();
  const [isPresentInCart, setIsPresentInCart] = useState(false);
  const { allCarts } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (allCarts) {
      const isPresent = allCarts?.find(
        (item: any) => item?.product?._id === productId
      );
      if (isPresent) {
        setIsPresentInCart(true);
      }
    }
  }, [allCarts]);
  const handleCart = async (e, id: string) => {
    e.stopPropagation();
    if (isPresentInCart) {
      navigate("/cart");
    } else {
      const response = await dispatch(addToCart({ productId: id, count: "1" }));
      if (response?.type === "get/addCart/fulfilled") {
        setIsPresentInCart(true);
      }
    }
  };
  return (
    <Button
      variant="outlined"
      onClick={(e) => handleCart(e, productId)}
      startIcon={<ShoppingCartIcon />}
      sx={{
        width: "100%",
      }}
      disabled={disabled}
    >
      {isPresentInCart ? "Go To Cart" : "Add To Cart"}
    </Button>
  );
};
