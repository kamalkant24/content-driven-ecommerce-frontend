import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogsSlice } from "../../store/blog/blogSlice";
import { RootState } from "../../store/store";
import { BlogCard } from "../../components/BlogCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { productCategories } from "../products/productContent";
import { getVendorListSlice } from "../../store/user/userSlice";
import { Loader } from "../../components/loader/Loader";

const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  const { userProfile, vendorList } = useSelector(
    (state: RootState) => state.profile
  );

  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [vendorId, setVendorId] = useState("All");
  const [isMyBlogsChecked, setIsMyBlogsChecked] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const searchInputRef = useRef(null);
  const pageSize = 5;

  useEffect(() => {
    const filters = {
      page,
      pageSize,
      search: debouncedSearch,
      category: category === "All" ? "" : category,
      vendorId: vendorId === "All" ? "" : vendorId,
    };
    dispatch(getBlogsSlice(filters));
  }, [page, pageSize, debouncedSearch, category, vendorId]);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 1000);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [searchText]);

  //get vendor list to show in filter
  useEffect(() => {
    (async () => {
      await dispatch(getVendorListSlice());
    })();
  }, []);
  const handlePageChange = (_, value) => {
    setPage(value);
  };
  const getmyBlogs = (e) => {
    if (e.target.checked) {
      setVendorId(userProfile?._id);
      setIsMyBlogsChecked(true);
    } else {
      setVendorId("All");
      setIsMyBlogsChecked(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 300); 
  }, [debouncedSearch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Container maxWidth="md" className="mb-12">
      <Paper sx={{ padding: 3, borderRadius: 2 }} elevation={3}>
        <Box className="flex justify-between flex-wrap gap-4 items-center">
          <TextField
            label="Search Blog"
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ width: { xs: "100%", sm: "30%" } }}
            value={searchText}
            inputRef={searchInputRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: { xs: "100%", sm: "30%" } }}>
            <InputLabel id="category">Category</InputLabel>
            <Select
              labelId="category"
              // id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {productCategories?.map((product, index) => (
                <MenuItem key={index} value={product?.value}>
                  {product?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ width: { xs: "100%", sm: "30%" } }}>
            <InputLabel id="vendor">Vendor</InputLabel>
            <Select
              labelId="vendor"
              // id="demo-simple-select"
              value={vendorId}
              label="Category"
              onChange={(e) => setVendorId(e.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              {vendorList?.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {userProfile?.role === "vendor" && (
            <>
              <Button
                variant="contained"
                onClick={() => navigate("create")}
                sx={{
                  width: { xs: "100%", sm: "25%" },
                  height: "fit-content",
                  maxWidth: { xs: "none", sm: "10rem" },
                }}
              >
                Create Blog
              </Button>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="My Blogs"
                  checked={isMyBlogsChecked}
                  onChange={(e) => getmyBlogs(e)}
                />
              </FormGroup>
            </>
          )}
        </Box>
      </Paper>
      <Typography variant="h4" marginY={4}>
        Blogs
      </Typography>
      <Stack>
        {blogs?.data?.length === 0 ? (
          <Typography variant="h6">No Blogs Available</Typography>
        ) : (
          blogs?.data?.map((blog, id) => (
            <BlogCard blog={{ ...blog, category: blog?.categories }} key={id} />
          ))
        )}
      </Stack>
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Pagination
          count={Math.ceil((blogs?.total ?? 0) / pageSize || 1)}
          page={page}
          onChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default Blogs;
