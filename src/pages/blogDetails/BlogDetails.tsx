import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Person2Icon from "@mui/icons-material/Person2";

import { getBlog } from "../../store/blog/blogSlice";
import { useAppDispatch } from "../../store/store";
import { Blog } from "../../interface";
import AddCommentDialog from "../../components/AddCommentDialog";

interface BlogDetailsProps {
  previewBlog?: Blog;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ previewBlog }) => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [blog, setBlog] = useState<null | Blog>(null);
  useEffect(() => {
    //fetching blog
    if (previewBlog) {
      setBlog(previewBlog);
    } else {
      (async () => {
        const res = await dispatch(getBlog(id ?? ""));
        console.log(res.payload);
        setBlog(res?.payload as Blog);
      })();
    }
  }, []);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Container maxWidth="md" className="my-8">
      {blog ? (
        <Box className="flex flex-col gap-8">
          <Stack gap={1}>
            <Typography variant="h3">{blog?.title}</Typography>
            <Typography color="gray">{blog?.category}</Typography>
          </Stack>
          <Box>
            <img
              className="max-h-[30rem] text-center"
              src={blog?.image}
              alt="blog-image"
            />
          </Box>
          <Typography
            dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
          />
          <Stack gap={1}>
            <Typography variant="subtitle1">Tags</Typography>
            <Stack direction={"row"} gap={2}>
              {blog?.tags.map((tag, id) => (
                <Chip key={id} label={tag} />
              ))}
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={4}>
            <Box
              className="flex gap-2 justify-start items-center cursor-pointer"
              onClick={() => setIsLiked(!isLiked)}
            >
              {isLiked ? (
                <FavoriteIcon sx={{ fontSize: 30, color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 30, color: "red" }} />
              )}
              <Typography sx={{ fontSize: "1rem" }}>
                {isLiked ? blog?.likes.length + 1 : blog?.likes.length} Likes
              </Typography>
            </Box>
            <Box className="flex gap-2 justify-start items-center cursor-pointer">
              <CommentIcon
                sx={{ fontSize: 30, color: "var(--primary-color)" }}
              />
              {blog?.comments.length} Comments
            </Box>
          </Stack>
          <Stack spacing={2} sx={{ mt: 3 }}>
            <Stack direction={"row"} gap={4}>
              <Typography variant="h6">Comments</Typography>{" "}
              <AddCommentDialog />
            </Stack>
            {blog?.comments.map((comment, idx) => (
              <Paper
                key={idx}
                elevation={3}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <Person2Icon />
                </Avatar>
                <Box>
                  <Typography variant="subtitle2" fontWeight="bold">
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {comment.text}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        </Box>
      ) : (
        <Typography>No Blog Found</Typography>
      )}
    </Container>
  );
};
