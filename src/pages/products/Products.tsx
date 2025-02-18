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
import { getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { ProductCard } from "../../components/ProductCard";


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
              variant="contained" sx={{ backgroundColor: 'var(--primary-color)' }} onClick={() => navigate('/products/add')}>
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
            {allProducts?.total === 0 ? <Box height={200}><Typography variant="h5" component={'h5'}>No Products</Typography></Box> : allProducts?.data?.map((item: any | ReactElement, index: number) => (
              <ProductCard item={item} key={index} />
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
