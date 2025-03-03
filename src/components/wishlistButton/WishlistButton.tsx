import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addToWishlistSlice,
  removeFromWishlistSlice,
} from "../../store/wishlist/WishlistSlice";

interface WishlistButtonProps {
  productId: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isItemWishlisted, setIsItemWishlisted] = useState<boolean>(false);
  const { wishlist } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    const wishlistItems = wishlist?.products;
    const isPresent = wishlistItems?.find(
      (wishlistItem) => wishlistItem?.product?._id === productId
    );
    return isPresent ? setIsItemWishlisted(true) : setIsItemWishlisted(false);
  }, []);

  const manageWishlist = async (e: any) => {
    e.stopPropagation();
    if (isItemWishlisted) {
      const res = await dispatch(removeFromWishlistSlice(productId || ""));
      if (res.payload.message === "Product removed from wishlist.") {
        setIsItemWishlisted(false);
      }
    } else {
      const res = await dispatch(addToWishlistSlice(productId || ""));
      if (res.payload.message === "Product added to wishlist.") {
        setIsItemWishlisted(true);
      }
    }
  };
  return (
    <IconButton
      aria-label="add to wishlist"
      sx={{ position: "absolute", top: 0, right: 0 }}
      onClick={manageWishlist}
    >
      <FavoriteIcon sx={isItemWishlisted && { color: "#B82132" }} />
    </IconButton>
  );
};
