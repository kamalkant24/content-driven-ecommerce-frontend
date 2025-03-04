import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

import { RootState } from "../store/store";
import { Product } from "../interface";
import { WishlistButton } from "./wishlistButton/WishlistButton";
import { AddToCartButton } from "./addToCartButton/AddToCartButton";

interface ProductCardProps {
  item: Product;
  showCartButton?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  showCartButton,
}) => {
  const navigate = useNavigate();
  const { userProfile } = useSelector((state: RootState) => state.profile);
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        overflow: "hidden",
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
        cursor: "pointer",
        margin: { xs: "auto", sm: 0 },
        width: "18rem",
        position: "relative",
      }}
      key={item?._id}
      onClick={() => navigate(`/products/${item?._id}`)}
    >
      <CardMedia
        component="img"
        alt="product_image"
        height="200"
        image={item?.images[0]}
        sx={{ height: "200px", objectFit: "contain" }}
        className="bg-white"
      />
      <CardContent sx={{ paddingY: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600, color: "text.primary" }}
        >
          {item?.title}
        </Typography>
        <Box className="flex justify-start items-center gap-2 mb-[1rem]">
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
            ${Number(item?.discount_price).toFixed(2)}
          </Typography>
          {item?.discount  && (
            <>
              <Typography
                variant="small"
                className="line-through text-gray-500"
              >
                ${item.price}
              </Typography>
              <Typography
                variant="small"
                className="text-secondaryColor font-bold"
              >
                ${item?.discount}% off
              </Typography>
            </>
          )}
        </Box>
        {showCartButton && (
          <AddToCartButton
            productId={item?._id}
            disabled={item?.quantity === 0}
          />
        )}

        {userProfile?.data?.role === "vendor" && item?.quantity !== 0 ? (
          <Typography variant="body2">{item.quantity} items left</Typography>
        ) : (
          !showCartButton &&
          Number(item.quantity) < 20 &&
          Number(item.quantity) > 0 && (
            <Typography variant="body2" sx={{ color: "red" }}>
              {item.quantity} {item.quantity == 1 ? "item" : "items"} left only.
              Hurry Up!
            </Typography>
          )
        )}
      </CardContent>
      {!item?.availability && item.quantity == 0 && (
        <Typography
          variant="body2"
          className="text-red-500 bg-[#fee2e299] w-fit px-2 py-1 rounded-sm absolute top-0 left-0"
        >
          Out of Stock
        </Typography>
      )}
      {userProfile?.data?.role === "customer" && (
        <WishlistButton productId={item?._id} />
      )}
    </Card>
  );
};
