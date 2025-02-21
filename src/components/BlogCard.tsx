import { Stack, Typography } from "@mui/material";
import { shortText } from "../utils/helpers";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Blog } from "../interface";

interface BlogCardProps {
  blog: Blog;
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const navigateTo = (route: string) => {
    navigate(route);
  };
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={4}
      className="cursor-pointer hover:bg-gray-200 py-12 border rounded-lg shadow-md p-4 mb-8"
      onClick={() => navigateTo(`${blog?.id}`)}
    >
      <img src={blog?.image} className="w-[15rem]" />
      <Stack>
        <Typography sx={{ typography: { xs: "h6", sm: "h4" } }}>
          {blog?.title}
        </Typography>
        <Typography variant="subtitle1" marginY={2}>
          {shortText(blog?.content.replace(/<[^>]+>/g, ""))}
        </Typography>
        <Typography variant="subtitle1" color="gray">
          Category: {blog?.category}
        </Typography>
      </Stack>
    </Stack>
  );
};
