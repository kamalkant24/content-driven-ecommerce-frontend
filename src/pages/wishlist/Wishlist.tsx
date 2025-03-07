import { Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getWishlistSlice } from "../../store/wishlist/WishlistSlice";
import { ProductCard } from "../../components/ProductCard";
import { getAllCart } from "../../store/cartSlice/cartsSlice";

export const Wishlist: React.FC = () => {
  const { wishlist, loading, error } = useSelector(
    (state: RootState) => state.wishlist
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      await dispatch(getWishlistSlice());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(getAllCart());
    })();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      <div className="flex flex-wrap justify-center gap-8 my-8">
        {wishlist?.products?.length ? (
          wishlist?.products?.map(({ product }, index: number) => (
            <ProductCard key={index} item={product} showCartButton={true} />
          ))
        ) : (
          <Typography variant="h5">No Items in your wishlist!</Typography>
        )}
      </div>
    </Container>
  );
};
