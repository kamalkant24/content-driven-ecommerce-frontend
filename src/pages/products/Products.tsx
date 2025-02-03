import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, Key, useEffect, useState } from "react";
import { addToCart, getAllCart } from "../../store/cartSlice/cartsSlice";
import { useNavigate } from "react-router-dom";



const Products = () => {

  const { allProducts, productLoading } = useSelector(
    (state: any) => state.products
  );
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [search, setSearch] = useState<string>("");

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

  console.log(allProducts);
  

  const handleCart = async (id: string) => {
    await dispatch(addToCart({ productId: id }));
    dispatch(getAllCart({ search: "", page: "1", limit: "10" }));
  };

  const getFullProductUrl = (str: string) => `http://192.168.31.57:8080/image/${str}`;

  return (
    <Container maxWidth="lg">
      <div className="flex justify-between flex-wrap my-6 gap-4">
        <TextField
          label="Search Product"
          variant="outlined"
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
          sx={{
            height: '40px',
            width: { xs: '8rem', sm: 'auto' },
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
        <Button variant="contained" onClick={(e) => {
          e.preventDefault();
          navigate('/products/add')
        }}>Add Product</Button>
      </div>

      {productLoading === "pending" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(6)].map((_, index) => (
            <Skeleton variant="rectangular" width="100%" height={300} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 my-8">
          {allProducts?.data?.map((item: any | ReactElement) => (
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
            >
              <CardMedia
                component="img"
                alt="product_image"
                height="200"
                image={getFullProductUrl(item?.image[0])}
                sx={{ height: '200px' }}
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
                <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                  {item.description}
                </Typography>
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
                  sx={{
                    width: '48%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                >
                  Add To Cart
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    width: '48%',
                    '&:hover': { backgroundColor: 'primary.dark' },
                  }}
                >
                  Buy Now
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
