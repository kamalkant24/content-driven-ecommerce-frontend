import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import Person2Icon from "@mui/icons-material/Person2";

import {
  deleteCommentSlice,
  getBlog,
  likeBlogSlice,
} from "../../store/blog/blogSlice";
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
  const { blog, loading } = useSelector((state: RootState) => state?.blogs);
  const [blogData, setBlogData] = useState(null);
  const { userProfile } = useSelector((state: RootState) => state.profile);
  const [isLiked, setIsLiked] = useState(false);
  const [openCommentDialogue, setOpenCommentDialogue] = React.useState(false);
  const [editCommentDetails, setEditCommentDetails] = useState(null);

  useEffect(() => {
    (async () => {
      await dispatch(getBlog(id ?? ""));
    })();
    window.scrollTo(0, 0);
  }, []);

  //showLike
  useEffect(() => {
    const blogLikeIds = blog?.likes.map((like) => like?._id);
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

  const deleteComment = async (id: string) => {
    await dispatch(
      deleteCommentSlice({ commentId: id, blogId: blogData?._id })
    );
  };

  useEffect(() => {
    setBlogData(() => (previewBlog ? previewBlog : blog));
  }, [blog, previewBlog]);

  const openAddCommentBox = () => {
    setEditCommentDetails(null);
    setOpenCommentDialogue(true);
  };

  const closeCommentDialogueBox = () => {
    setOpenCommentDialogue(false);
    setEditCommentDetails(null);
  };

  const editComment = (comment) => {
    setOpenCommentDialogue(true);
    setEditCommentDetails(comment);
  };

  if (loading) {
    return (
      <Box className="flex justify-center items-center absolute inset-0">
        <CircularProgress />
      </Box>
    );
  }

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
              <Stack sx={{ mt: 3 }}>
                <Stack direction={"row"} gap={4} className="mb-4">
                  <Typography variant="h6">Comments</Typography>
                  <Button variant="outlined" onClick={openAddCommentBox}>
                    Add a Comment
                  </Button>
                  <AddCommentDialog
                    blogId={blogData?._id}
                    editCommentDetails={editCommentDetails}
                    open={openCommentDialogue}
                    handleClose={closeCommentDialogueBox}
                  />
                </Stack>
                {blogData?.comments.map((comment, idx) => (
                  <Box
                    key={idx}
                    className="flex justify-between p-4 items-center border border-gray-300 border-collapse"
                  >
                    <Box className="flex gap-4 items-center border-collapse">
                      <Avatar
                        sx={{ bgcolor: "primary.main" }}
                        src={comment?.user?.profile_img}
                      >
                        <Person2Icon />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {comment?.user?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {comment?.comment}
                        </Typography>
                      </Box>
                    </Box>
                    {userProfile?.data?._id === comment?.user?._id && (
                      <Box>
                        <IconButton
                          aria-label="edit"
                          onClick={() => editComment(comment)}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => deleteComment(comment?._id)}
                        >
                          <DeleteIcon sx={{ color: "red" }} />
                        </IconButton>
                      </Box>
                    )}
                  </Box>
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
