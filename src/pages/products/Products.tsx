import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deleteProductSlice, getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, Key, useEffect, useState } from "react";
import { addToCart, getAllCart } from "../../store/cartSlice/cartsSlice";
import { useNavigate } from "react-router-dom";
import { getFullProductUrl } from "../../utils/helpers";
import { RootState } from "../../store/store";



const Products = () => {

  const { allProducts, productLoading } = useSelector(
    (state: RootState) => state.products
  );
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [search, setSearch] = useState<string>("");
  const [sortbyPrice, setSortbyPrice] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        getAllProductSlice({ page: page, pageSize: limit, search: search })
      );
    };

    fetchData();

  }, [dispatch, search, page, limit]);

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  const handleCart = async (id: string) => {
    await dispatch(addToCart({ productId: id }));
    dispatch(getAllCart({ search: "", page: "1", limit: "10" }));
  };

  const deleteProduct = async (id: string) => {
    await dispatch(deleteProductSlice(id))
  }

  return (
    <Container maxWidth="lg">
      <Box className="flex justify-between sm:justify-center flex-wrap my-6 gap-4 md:gap-8">
        <TextField
          label="Search Product"
          variant="outlined"
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
          sx={{
            height: '40px',
            width: { xs: '8rem', sm: '12rem' },
            fontSize: {
              xs: '0.875rem',
              sm: '1rem',
            },
            '& .MuiInputBase-root': {
              height: '100%',
              padding: '0 10px',
            },
            '& .MuiFormLabel-root': {
              top: '-6px',
            },
          }}
        />
        <FormControl sx={{
          height: '40px',
          width: { xs: '8rem', sm: '12rem' },
          fontSize: {
            xs: '0.875rem',
            sm: '1rem',
          },
          '& .MuiInputBase-root': {
            height: '100%',
            padding: '0 10px',
          },
          '& .MuiFormLabel-root': {
            top: '-6px',
          },
        }}>
          <InputLabel id="demo-simple-select-label">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortbyPrice}
            label="Age"
            onChange={(e) => setSortbyPrice(e.target.value as string)}
          >
            <MenuItem value={'low to high'}>Low to High</MenuItem>
            <MenuItem value={'high to low'}>High to Low</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={(e) => {
          e.preventDefault();
          navigate('/products/add')
        }}>Add Product</Button>
      </Box>

      {productLoading === "pending" ? (
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
                width: '18rem'
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
                className="bg-gray-200"
              />
              <CardContent sx={{ paddingBottom: 2 }}>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  {item?.title}
                </Typography>
                {/* <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {item.description}
                </Typography> */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}
                >
                  ${item.price}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.quantity} left
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  paddingTop: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  sx={{
                    width: '48%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/products/edit/${item?._id}`)
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    width: '48%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                  color="error"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteProduct(item?._id)
                  }}                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
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
              '& .MuiPaginationItem-root': {
                fontWeight: 600,
                fontSize: '1rem',
              },
            }}
          />
        </Stack>
      </div>
    </Container>
  );

};

export default Products;
