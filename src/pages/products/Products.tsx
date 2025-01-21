import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Pagination,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import lizardimg from "../../assets/reptileimg.jpg";
import { getAllProductSlice } from "../../store/productsSlice/userProductSlice";
import { useDispatch, useSelector } from "react-redux";
import { ReactElement, Key, useEffect, useState } from "react";
import UserInput from "../../components/UserInput";
import UserButton from "../../components/UserButton";
import { addToCart, getAllCart } from "../../store/cartSlice/cartsSlice";



const Products = () => {
  
  const { allProducts, productLoading } = useSelector(
    (state: any) => state.products
  );

  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        getAllProductSlice({ page: page, pageSize: limit, search: search })
      );
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [dispatch, search, page, limit]);

  const handlePageChange = (event: any, page: number) => {
    setPage(page);
  };

  const handleCart = async (id: string) => {
    await dispatch(addToCart({ productId: id }));
    dispatch(getAllCart({ search: "", page: "1", limit: "10" }));
  };
  console.log('allProducts?.total', allProducts?.total)

  return (
    <Container className="mt-5">
      <div className="flex justify-end my-3 me-4">
        <UserInput
          placeholder="Search User"
          onChange={(e: any) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      {productLoading == "pending" ? (
        <div className="grid grid-cols-3 gap-x-1 gap-y-4">
          <Skeleton variant="rectangular" width={320} height={210} />
          <Skeleton variant="rectangular" width={320} height={210} />
          <Skeleton variant="rectangular" width={320} height={210} />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-x-1 gap-y-4">
          {allProducts?.data?.map(
            (item: any | ReactElement, index: Key | null | undefined) => {
              return (
                <Card sx={{ maxWidth: 345 }} key={index} className="mx-4">
                  <CardMedia
                    sx={{ height: 140 }}
                    image={lizardimg}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <UserButton
                      size="small"
                      name="Add To Cart"
                      variant="outlined"
                      action={() => {
                        handleCart(item._id);
                      }}
                    />
                    <UserButton
                      size="small"
                      name="Buy Now"
                      variant="contained"
                    />
                  </CardActions>
                </Card>
              );
            }
          )}
        </div>
      )}
      <div className="flex justify-end my-4">
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(allProducts?.total / 9)}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </Container>
  );
};

export default Products;
