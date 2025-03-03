import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  Stack,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Container,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../../interface";
import {
  addProductSlice,
  editProductSlice,
  getProductSlice,
} from "../../store/productsSlice/userProductSlice";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { productCategories } from "../products/productContent";

export const AddProduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    title: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    images: [],
    availability: true,
    discount: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { allProducts } = useSelector((state: RootState) => state.products);
  const [productDetails, setProductDetails] = useState(null);
  const [addedImages, setAddedImages] = useState<File[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      if (!allProducts) {
        const fetchData = async () => {
          const res = await dispatch(getProductSlice(id));
          const product = res?.payload?.data;
          setProductDetails(product);
        };
        fetchData();
      } else {
        const product = allProducts.data.find(
          (product: any) => product?._id === id
        );
        setProductDetails(product);
      }
    }
  }, [id, allProducts]);

  useEffect(() => {
    if (id && productDetails) {
      const {
        title,
        description,
        price,
        quantity,
        images,
        discount,
        category,
        availability,
      } = productDetails;
      setProduct({
        title,
        description,
        price,
        quantity,
        discount,
        images,
        category,
        availability,
      });
    }
  }, [productDetails, productDetails]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    let { name, value } = e.target;
    if (name === "availability") {
      value = e.target.checked;
    }
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAddedImages([...addedImages, newFiles[0]]);
      setProduct((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newFiles],
      }));
    }
  };

  const handleImageDelete = (index: number, image) => {
    const updatedImages = product.images.filter((_, i) => i !== index);
    setProduct((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
    //deleted images of string type are images present in database that we need to delete
    if (typeof image === "string") {
      const arr = image.split("/");
      const imageFileName = arr[arr.length - 1];
      setRemovedImages([...removedImages, imageFileName]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (product.images.length === 0) {
      toast.warning("At least one image is required.");
      return;
    }
    if (id) {
      const res = await dispatch(
        editProductSlice({ ...product, _id: id, addedImages, removedImages })
      );
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/products");
      }
    } else {
      const res = await dispatch(addProductSlice(product));
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/products");
      }
    }
  };

  return (
    <Container maxWidth="md" className="mb-4">
      <Typography variant="h4" paddingY={4}>
        {id ? "Edit" : "Add"} Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Product Title"
            variant="outlined"
            fullWidth
            name="title"
            value={product.title}
            onChange={handleChange}
            required
          />

          <TextField
            label="Product Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
          >
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <TextField
              label="Quantity"
              variant="outlined"
              fullWidth
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              required
            />
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
          >
            <FormControl fullWidth sx={{ flex: 1 }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={product?.category}
                label="Category"
                onChange={handleChange}
                required
              >
                {productCategories.map(({ name }) => (
                  <MenuItem value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ flex: 1 }}
              label="Discount (%)"
              variant="outlined"
              fullWidth
              type="number"
              name="discount"
              value={product.discount}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">%</InputAdornment>
                ),
              }}
            />
          </Stack>
          <Stack spacing={1}>
            {product?.images?.length > 0 && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  Selected Images:
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      sx={{
                        position: "relative",
                        width: 100,
                        height: 100,
                        overflow: "hidden",
                        borderRadius: 1,
                      }}
                    >
                      <img
                        src={
                          typeof image === "string"
                            ? image
                            : URL.createObjectURL(image)
                        }
                        alt={`image-${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        onClick={() => handleImageDelete(index, image)}
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          color: "white",
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.7)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Stack>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            width="100%"
          >
            <Button variant="outlined" component="label" sx={{ width: "100%" }}>
              Upload Images
              <input
                type="file"
                hidden
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "100%" }}
            >
              {id ? "Edit" : "Add"} Product
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};
