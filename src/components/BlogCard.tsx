import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { Blog } from "../interface";
import { shortText } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { deleteBlogSlice } from "../store/blog/blogSlice";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const deleteBlog = async (e) => {
    e.stopPropagation();
    await dispatch(deleteBlogSlice(blog?._id));
  };

  const editBlog = (e) => {
    e.stopPropagation();
    navigate(`edit/${blog?._id}`);
  };

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={4}
      className="cursor-pointer hover:bg-gray-200 py-12 border rounded-lg shadow-md p-4 mb-8 relative"
      onClick={() => navigate(`${blog?._id}`)}
    >
      <img src={blog?.image} className="w-[15rem]" />
      <Stack>
        <Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
          {blog?.title}
        </Typography>
        <Typography variant="subtitle1" marginY={2}>
          {shortText(blog?.content?.replace(/<[^>]+>/g, "") ?? "")}
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Category: {blog?.category}
        </Typography>
        <Typography variant="subtitle1" color="gray" className="capitalize">
          By: {blog?.vendor?.name}
        </Typography>
      </Stack>
      {userProfile?._id === blog?.vendor?._id && (
        <Box className="absolute top-2 right-2">
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={(e) => editBlog(e)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: "red" }}
            onClick={(e) => deleteBlog(e)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Stack>
  );
};
