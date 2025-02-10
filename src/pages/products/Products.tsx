import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
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
import { getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { discountedProductPrice, getFullProductUrl } from "../../utils/helpers";
import { RootState } from "../../store/store";
import FavoriteIcon from '@mui/icons-material/Favorite';


const Products = () => {

  const { allProducts, productLoading } = useSelector(
    (state: RootState) => state.products
  );
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  // const [limit, setLimit] = useState<number>(9);
  const [search, setSearch] = useState<string>("");
  const [sortbyPrice, setSortbyPrice] = useState<string>("");
  const [sortbyVendor, setSortbyVendor] = useState<string>("All Vendors");
  const [sortbyCategory, setSortbyCategory] = useState<string>("All Categories");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile?.role === 'user') {
        await dispatch(getAllProductSlice({ page: page, pageSize: 9, search: search }))
      }
      else {
        await dispatch(
          getAllProductSlice({ page: page, pageSize: 9, search: search }) //this api is getting products of all vendors. get current vendor products instead. BE API is not built for it.
        );
      }
    };

    fetchData();

  }, [dispatch, search, page, userProfile]);

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  const addToWishlist = (e) => {
    e.stopPropagation();
    console.log('added to wishlist');
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, mx: 'auto', maxWidth: { xs: '25rem', sm: '40rem', md: '50rem', lg: '60rem' } }}>
        <Paper sx={{ padding: 3, borderRadius: 2 }} elevation={3} >
          <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <TextField
              label="Search Product"
              variant="outlined"
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: { xs: '100%' } }}
            />
            {userProfile?.role === 'user' && <FormControl sx={{ width: '100%' }}>
              <InputLabel className="bg-white">Vendor</InputLabel>
              <Select
                value={sortbyVendor}
                onChange={(e) => setSortbyVendor(e.target.value)}
              >
                <MenuItem value="All Vendors">All Vendors</MenuItem>
                <MenuItem value="Vendor 1">Vendor 1</MenuItem>
                <MenuItem value="Vendor 2">Vendor 2</MenuItem>
              </Select>
            </FormControl>}

            <FormControl sx={{ width: '100%' }}>
              <InputLabel className="bg-white">Category</InputLabel>
              <Select
                value={sortbyCategory}
                onChange={(e) => setSortbyCategory(e.target.value)}
              >
                <MenuItem value="All Categories">All Categories</MenuItem>
                <MenuItem value="Category 1">Category 1</MenuItem>
                <MenuItem value="Category 2">Category 2</MenuItem>
              </Select>
            </FormControl>
            <FormControl component="fieldset">
              <FormLabel>Price</FormLabel>
              <RadioGroup row onChange={(e) => setSortbyPrice(e.target.value)}>
                <FormControlLabel value="Low to High" control={<Radio />} label="Low to High" />
                <FormControlLabel value="High to Low" control={<Radio />} label="High to Low" />
              </RadioGroup>
            </FormControl>
            <Box sx={{ width: '100%' }}>
              <Typography gutterBottom>Price Range</Typography>
              <Box className="flex justify-start gap-4 items-center">
                <TextField type="number" id="outlined-number" label="Min" variant="outlined" className="w-[50%]" InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }} />
                <Typography variant='small'>To</Typography>
                <TextField type="number" id="outlined-number" label="Max" variant="outlined" className="w-[50%]" InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }} />
              </Box>
            </Box>
          </Box>
        </Paper>
        {userProfile?.role === 'vendor' && (
          <Box className="flex justify-end mt-[32px]" >
            <Button
              variant="contained" onClick={() => navigate('/products/add')}>
              Add Product
            </Button>
          </Box>
        )
        }
      </Box>
      {
        productLoading === "pending" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, index) => (
              <Skeleton variant="rectangular" width="100%" height={300} key={index} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8 my-8" >
            {allProducts?.total === 0 ? <Box height={200}><Typography variant="h5" component={'h5'}>No Products</Typography></Box> : allProducts?.data?.map((item: any | ReactElement) => (
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                  cursor: 'pointer',
                  margin: { xs: 'auto', sm: 0 },
                  width: '18rem',
                  position: 'relative',
                }}
                key={item?._id}
                onClick={() => navigate(`/products/${item?._id}`)}
              >
                <CardMedia
                  component="img"
                  alt="product_image"
                  height="200"
                  image={getFullProductUrl(item?.image[0])}
                  sx={{ height: '200px', objectFit: 'contain' }}
                  className="bg-white"
                />
                <CardContent sx={{ paddingY: 2 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 600, color: 'text.primary' }}
                  >
                    {item?.title}
                  </Typography>
                  <Box className="flex justify-start items-center gap-2">
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                    >
                      ${discountedProductPrice(item.price, 10)}
                    </Typography>
                    <Typography
                      variant="small"
                      className="line-through text-gray-500"
                      sx={{ mb: 1 }}
                    >
                      ${item.price}
                    </Typography>
                    <Typography
                      variant="small"
                      className="text-green-600 font-bold"
                      sx={{ mb: 1 }}
                    >
                      10% off
                    </Typography>
                  </Box>
                  {
                    userProfile?.role === 'vendor' ? <Typography variant="body2">
                      {item.quantity} items left
                    </Typography> : (item.quantity < 20 && item.quantity > 0) && <Typography variant="body2" sx={{ color: 'red' }}>{item.quantity} {item.quantity == 1 ? 'item' : 'items'} left only. Hurry Up!</Typography>
                  }
                </CardContent>
                {(!item?.availability && item.quantity > 50) && <Typography variant="body2" className="text-red-500 bg-[#fee2e299] w-fit px-2 py-1 rounded-sm absolute top-0 left-0" >Out of Stock</Typography>}
                <IconButton  aria-label="add to shopping cart" sx={{ position: 'absolute', top: 0, right: 0 }} onClick={addToWishlist}>
                  <FavoriteIcon />
                </IconButton>
              </Card>
            ))}
          </div>
        )
      }
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
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
                fontSize: '1rem',
              },
            }}
          />
        </Stack>
      </div>
    </Container >
  );

};

export default Products;
