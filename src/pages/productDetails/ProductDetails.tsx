import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import { Carousal } from "../../components/Carousal";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductSlice,
  getProductSlice,
} from "../../store/productsSlice/userProductSlice";
import { AppDispatch, RootState } from "../../store/store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { getAllCart } from "../../store/cartSlice/cartsSlice";
import { WishlistButton } from "../../components/wishlistButton/WishlistButton";
import { AddToCartButton } from "../../components/addToCartButton/AddToCartButton";

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const { allProducts, productLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const [productDetails, setProductDetails] = useState<any>(null);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getProductSlice(id));
      const product = res?.payload?.data;
      setProductDetails(product);
    };
    fetchData();
    const product = allProducts?.data?.find(
      (product: any) => product?._id === id
    );
    setProductDetails(product);
  }, [id, allProducts]);

  useEffect(() => {
    if (userProfile?.data?.role === "customer") {
      (async () => {
        await dispatch(getAllCart());
      })();
    }
  }, [productDetails, userProfile]);

  const reviews = [
    {
      user: "John Doe",
      rating: 4,
      review: "Great product! Really useful and high quality.",
    },
    {
      user: "Jane Smith",
      rating: 5,
      review: "Amazing! Exceeded my expectations.",
    },
    {
      user: "Alice Brown",
      rating: 3,
      review: "Good, but the price is a bit high for the features.",
    },
  ];

  const isDescriptionLong = (description: string) => {
    const wordCount = description.split(" ").length;
    return wordCount > 50;
  };

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const deleteProduct = async (id: string) => {
    await dispatch(deleteProductSlice(id));
    navigate("/products");
  };

  if (productLoading === "pending") {
    return (
      <div className="absolute inset-0 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  } else if (!productDetails) {
    return <div className="p-4 font-bold text-2xl">Product Not Found!</div>;
  }

  return (
    <Container maxWidth="lg" className="my-4">
      <Card className="flex flex-col items-center gap-4 relative">
        <Carousal images={productDetails?.images} />
        <CardContent className="p-2 text-left w-[95%] sm:w-[80%] flex gap-4 flex-col">
          <Box className="flex flex-col md:flex-row justify-between items-start md:flex-center">
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "text.primary",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
              }}
            >
              {productDetails?.title}
            </Typography>
            <Rating
              size="large"
              name="read-only"
              value={3.5}
              precision={0.5}
              readOnly
            />
          </Box>
          <Box component={"section"} className="flex gap-2 items-center">
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Price:
            </Typography>
            <Typography variant="h6">
              ${Number(productDetails?.discount_price).toFixed(2)}
            </Typography>
            {productDetails?.discount && (
              <>
                <Typography
                  variant="small"
                  className="line-through text-gray-500"
                >
                  ${productDetails.price}
                </Typography>
                <Typography
                  variant="small"
                  className="text-secondaryColor font-bold"
                >
                  {productDetails?.discount}% off
                </Typography>
              </>
            )}
          </Box>
          {isDescriptionLong(productDetails?.description) ? (
            <Accordion
              sx={{ boxShadow: "none", border: "none" }}
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="description-content"
                id="description-header"
                sx={{ p: 0 }}
              >
                <Box className="flex flex-col md:flex-row gap-2 w-full">
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", width: "20%", minWidth: "6rem" }}
                  >
                    Description
                  </Typography>
                  {expanded === "panel1" ? null : (
                    <Typography
                      variant="body1"
                      sx={{ width: { xs: "75%", md: "100%" }, flexShrink: 0 }}
                    >
                      {productDetails?.description.slice(0, 100)}...
                    </Typography>
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  {productDetails?.description}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <Box
              component={"section"}
              className="flex flex-col md:flex-row gap-2"
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", width: "20%", minWidth: "6rem" }}
              >
                Description
              </Typography>
              <Typography variant="body1">
                {productDetails?.description}
              </Typography>
            </Box>
          )}

          <Box
            component={"section"}
            className="flex flex-col md:flex-row gap-2"
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", width: "20%", minWidth: "6rem" }}
            >
              Stocks Left
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
              {productDetails?.quantity}
            </Typography>
          </Box>

          <Box
            component={"section"}
            className="flex gap-2 w-full flex-col md:flex-row"
          >
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "bold", width: { xs: "100%", md: "20%" } }}
            >
              Ratings and Reviews
            </Typography>
            <Box sx={{ width: "100%", maxWidth: "40rem" }}>
              {reviews.map((review, index) => (
                <Accordion key={index}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                  >
                    <Typography
                      component="span"
                      sx={{ width: { xs: "50%", sm: "66%" }, flexShrink: 0 }}
                    >
                      {review.user}
                    </Typography>
                    <Rating
                      size="small"
                      name="read-only"
                      value={review.rating}
                      readOnly
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2">{review.review}</Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Box>
        </CardContent>
        <CardActions
          className="w-full flex justify-center items gap-4 flex-wrap"
          sx={{ padding: 2 }}
        >
          {userProfile?.data?.role === "vendor" ? (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              className="w-full items-center justify-center"
            >
              <Button
                variant="contained"
                sx={{ width: { xs: "80%", sm: "40%", md: "30%", lg: "25%" } }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/edit/${productDetails?._id}`);
                }}
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                sx={{ width: { xs: "80%", sm: "40%", md: "30%", lg: "25%" } }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProduct(productDetails?._id);
                }}
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Stack>
          ) : (
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              className="w-full items-center justify-center"
            >
              <Box
                sx={{ width: { xs: "80%", sm: "40%", md: "30%", lg: "25%" } }}
              >
                <AddToCartButton
                  productId={productDetails?._id}
                  disabled={productDetails?.quantity === 0}
                />
              </Box>
              <Button
                variant="contained"
                sx={{ width: { xs: "80%", sm: "40%", md: "30%", lg: "25%" } }}
                onClick={() => console.log("Buy Now")}
                startIcon={<ShoppingBagIcon />}
              >
                Buy Now
              </Button>
            </Stack>
          )}
        </CardActions>
        {userProfile?.data?.role === "customer" && (
          <WishlistButton productId={productDetails?._id} />
        )}
      </Card>
    </Container>
  );
};
