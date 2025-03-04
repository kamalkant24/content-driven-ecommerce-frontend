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

import { getBlog, likeBlogSlice } from "../../store/blog/blogSlice";
import { AppDispatch, RootState } from "../../store/store";
import { Blog } from "../../interface";
import AddCommentDialog from "../../components/AddCommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { handlePlural } from "../../utils/helpers";

interface BlogDetailsProps {
  previewBlog?: Blog;
}

export const BlogDetails: React.FC<BlogDetailsProps> = ({ previewBlog }) => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { blog } = useSelector((state: RootState) => state?.blogs);
  const [blogData, setBlogData] = useState(null);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(getBlog(id ?? ""));
    })();
  }, []);

  //showLike
  useEffect(() => {
    const blogLikeIds = blog?.likes;
    const userId = userProfile?.data?._id;
    const isLikedByUser = blogLikeIds?.includes(userId);
    setIsLiked(() => (isLikedByUser ? true : false));
  }, [blog]);

  const handleLikeBlog = async () => {
    const res = await dispatch(likeBlogSlice({ id, doLike: !isLiked }));
    if (res?.type === "like/blog/fulfilled") {
      setIsLiked(!isLiked);
    }
  };

  useEffect(() => {
    setBlogData(() => (previewBlog ? previewBlog : blog));
  }, [blog, previewBlog]);

  return (
    <Container maxWidth="md" className="my-8">
      {blogData ? (
        <Box className="flex flex-col gap-8">
          <Stack gap={1}>
            <Typography variant="h3">{blogData?.title}</Typography>
            <Typography color="gray">{blogData?.category}</Typography>
          </Stack>
          <Box>
            <img
              className="max-h-[30rem] text-center"
              src={blogData?.image}
              alt="blog-image"
            />
          </Box>
          <Typography
            dangerouslySetInnerHTML={{ __html: blogData?.content ?? "" }}
          />
          <Stack gap={1}>
            <Typography variant="subtitle1">Tags</Typography>
            <Stack direction={"row"} gap={2}>
              {blogData?.tags.map((tag, id) => (
                <Chip key={id} label={tag} />
              ))}
            </Stack>
          </Stack>
          {!previewBlog && (
            <>
              <Stack direction={"row"} gap={4}>
                <Box
                  className="flex gap-2 justify-start items-center cursor-pointer"
                  onClick={handleLikeBlog}
                >
                  {isLiked ? (
                    <FavoriteIcon sx={{ fontSize: 30, color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 30, color: "red" }} />
                  )}
                  <Typography sx={{ fontSize: "1rem" }}>
                    {blogData?.likes.length}{" "}
                    {handlePlural("Like", blogData?.likes?.length)}
                  </Typography>
                </Box>
                <Box className="flex gap-2 justify-start items-center cursor-pointer">
                  <CommentIcon
                    sx={{ fontSize: 30, color: "var(--primary-color)" }}
                  />
                  {blogData?.comments.length}{" "}
                  {handlePlural("Comment", blogData?.comments.length)}
                </Box>
              </Stack>
              <Stack spacing={2} sx={{ mt: 3 }}>
                <Stack direction={"row"} gap={4}>
                  <Typography variant="h6">Comments</Typography>{" "}
                  <AddCommentDialog blogId={blogData?._id} />
                </Stack>
                {blogData?.comments.map(({comment, user}, idx) => (
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
                    <Avatar
                      sx={{ bgcolor: "primary.main" }}
                      src={user?.profile_img}
                    >
                      <Person2Icon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {user?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {comment}
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </>
          )}
        </Box>
      ) : (
        <Typography>No Blog Found</Typography>
      )}
    </Container>
  );
};
