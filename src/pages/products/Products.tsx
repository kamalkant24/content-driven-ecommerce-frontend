import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../store/store";
import { ProductCard } from "../../components/ProductCard";
import { getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { getVendorListSlice } from "../../store/user/userSlice";
import { productCategories } from "./productContent";
import { getWishlistSlice } from "../../store/wishlist/WishlistSlice";

const Products = () => {
  const { allProducts, productLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { userProfile, vendorList } = useSelector(
    (state: RootState) => state.profile
  );
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [sortbyPrice, setSortbyPrice] = useState<string>("");
  const [sortbyVendor, setSortbyVendor] = useState<string>("all");
  const [sortbyCategory, setSortbyCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile?.isReadDocumentation) {
        if (userProfile?.role === "customer") {
          await dispatch(
            getAllProductSlice({
              vendorId: sortbyVendor === "all" ? "" : sortbyVendor,
              page: page,
              pageSize: 9,
              search: search,
              category: sortbyCategory === "all" ? "" : sortbyCategory,
              sortPrice: sortbyPrice,
              minPrice,
              maxPrice,
            })
          );
        } else {
          await dispatch(
            getAllProductSlice({
              vendorId: userProfile?._id,
              page: page,
              pageSize: 9,
              search: search,
              category: sortbyCategory === "all" ? "" : sortbyCategory,
              sortPrice: sortbyPrice,
              minPrice,
              maxPrice,
            })
          );
        }
      }
    };

    fetchData();
  }, [
    dispatch,
    search,
    page,
    userProfile,
    sortbyCategory,
    sortbyPrice,
    minPrice,
    maxPrice,
    sortbyVendor,
  ]);

  useEffect(() => {
    if (userProfile?.role === "customer") {
      (async () => {
        await dispatch(getVendorListSlice());
        await dispatch(getWishlistSlice());
      })();
    }
  }, [userProfile]);

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  return (
    <Container maxWidth="lg">
      <Box>
        <Paper sx={{ padding: 3, borderRadius: 2 }} elevation={3}>
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <TextField
              label="Search Product"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: "100%" } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {userProfile?.role === "customer" && (
              <FormControl sx={{ width: "100%" }}>
                <InputLabel className="bg-white">Vendor</InputLabel>
                <Select
                  value={sortbyVendor}
                  onChange={(e) => setSortbyVendor(e.target.value)}
                  defaultValue="all"
                >
                  <MenuItem value="all">All Vendors</MenuItem>
                  {vendorList?.map((vendor) => (
                    <MenuItem key={vendor?.id} value={vendor?.id}>
                      {vendor?.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <FormControl fullWidth>
              <InputLabel className="bg-white">Category</InputLabel>
              <Select
                value={sortbyCategory}
                onChange={(e) => setSortbyCategory(e.target.value)}
              >
                <MenuItem value={"all"}>All Categories</MenuItem>
                {productCategories?.map((product, id) => (
                  <MenuItem key={id} value={product?.value}>
                    {product?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel>Price</FormLabel>
              <RadioGroup row onChange={(e) => setSortbyPrice(e.target.value)}>
                <FormControlLabel
                  value="low-to-high"
                  control={<Radio />}
                  label="Low to High"
                />
                <FormControlLabel
                  value="high-to-low"
                  control={<Radio />}
                  label="High to Low"
                />
              </RadioGroup>
            </FormControl>
            <Box sx={{ width: "100%" }}>
              <Typography gutterBottom>Price Range</Typography>
              <Box className="flex justify-start gap-4 items-center">
                <TextField
                  type="number"
                  id="outlined-number"
                  label="Min"
                  variant="outlined"
                  className="w-[50%]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Typography variant="small">To</Typography>
                <TextField
                  type="number"
                  id="outlined-number"
                  label="Max"
                  variant="outlined"
                  className="w-[50%]"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </Paper>
        {userProfile?.role === "vendor" && (
          <Box className="flex justify-end mt-[32px]">
            <Button
              variant="contained"
              onClick={() => navigate("/products/add")}
            >
              Add Product
            </Button>
          </Box>
        )}
      </Box>
      {productLoading === "pending" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={300}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-8">
          {allProducts?.total === 0 ? (
            <Box height={200}>
              <Typography variant="h5" component={"h5"}>
                No Products
              </Typography>
            </Box>
          ) : (
            allProducts?.data?.map(
              (item: any | ReactElement, index: number) => (
                <ProductCard item={item} key={index} />
              )
            )
          )}
        </div>
      )}
      <div className="flex justify-center my-6">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(allProducts?.total / 9)}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: 600,
                fontSize: "1rem",
              },
            }}
          />
        </Stack>
      </div>
    </Container>
  );
};

export default Products;
