import {
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../store/blog/blogSlice";
import { RootState } from "../../store/store";
import { BlogCard } from "../../components/BlogCard";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Blog } from "../../interface";

const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );
  const [category, setCategory] = useState("All");
  const [searchtext, setSearchText] = useState("");
  useEffect(() => {
    (async () => {
      await dispatch(getBlogs());
    })();
  }, []);

  const getFilteredBlogs = () => {
    let filteredBlogs = blogs;
    if (category !== "All") {
      filteredBlogs = filteredBlogs.filter(
        (blog: Blog) => blog.category === category
      );
    }
    if (searchtext) {
      filteredBlogs = filteredBlogs.filter((blog: Blog) =>
        blog?.title.toLowerCase().includes(searchtext.toLowerCase())
      );
    }
    return filteredBlogs;
  };

  return (
    <Container maxWidth="md" className="mb-12">
      <Paper sx={{ padding: 3, borderRadius: 2 }} elevation={3}>
        <Box className="flex justify-between flex-wrap gap-4 items-center">
          <TextField
            label="Search Blog"
            variant="outlined"
            onChange={(e) => setSearchText(e.target.value)}
            sx={{ width: { xs: "100%", sm: "35%" } }}
            value={searchtext}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ width: { xs: "100%", sm: "30%" } }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              label="Category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Electronics"}>Electronics</MenuItem>
              <MenuItem value={"Clothing & Accessories"}>
                Clothing & Accessories
              </MenuItem>
              <MenuItem value={"Home & Living"}>Home & Living</MenuItem>
              <MenuItem value={"Beauty & Health"}>Beauty & Health</MenuItem>
              <MenuItem value={"Sports & Outdoors"}>Sports & Outdoors</MenuItem>
            </Select>
          </FormControl>
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
        </Box>
      </Paper>
      <Typography variant="h4" marginY={4}>
        Blogs
      </Typography>
      <Stack>
        {getFilteredBlogs().length === 0 ? (
          <Typography variant="h6">No Blogs Available</Typography>
        ) : (
          getFilteredBlogs().map((blog, id) => (
            <BlogCard blog={blog} key={id} />
          ))
        )}
      </Stack>
    </Container>
  );
};

export default Blogs;
