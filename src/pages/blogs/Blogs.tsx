import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBlogs } from "../../store/blog/blogSlice";
import { RootState } from "../../store/store";
import { BlogCard } from "../../components/BlogCard";

const Blogs = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { blogs, loading, error } = useSelector(
    (state: RootState) => state.blogs
  );

  useEffect(() => {
    (async () => {
      await dispatch(getBlogs());
    })();
  }, []);

  return (
    <Container maxWidth="md" className="mb-12">
      <Box className="text-right">
        <Button variant="contained" onClick={() => navigate("create")}>
          Create Blog
        </Button>
      </Box>
      <Typography variant="h4" marginY={4}>
        Blogs
      </Typography>
      <Stack>
        {blogs.map((blog) => (
          <BlogCard blog={blog} />
        ))}
      </Stack>
    </Container>
  );
};

export default Blogs;
