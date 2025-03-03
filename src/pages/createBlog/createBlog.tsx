import { useState, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { BlogDetails } from "../blogDetails/BlogDetails";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { createBlogSlice } from "../../store/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import { getToast } from "../../utils/InterceptorApi";
import { productCategories } from "../products/productContent";

export const CreateBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [uploadedImageFile, setUploadedImagefile] = useState<File | null>(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState<string>("");
  const [previewBlog, setPreviewBlog] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Your Blog Content...",
      height: 400,
    }),
    []
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImagefile(file);
      setSelectedImageUrl(URL.createObjectURL(file));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!uploadedImageFile) {
      getToast("warning", "Please upload blog image.");
    } else {
      const blogData = {
        title,
        content,
        image: uploadedImageFile,
        tags,
        category,
      };
      const res = await dispatch(createBlogSlice(blogData));
      if (res?.type === "create/Blog/fulfilled") {
        navigate("/blogs");
      }
    }
  };

  const showPreview = () => {
    const blogData = {
      id: "demo",
      likes: [],
      comments: [],
      title,
      content,
      image: selectedImageUrl,
      category,
      tags,
    };
    setPreviewBlog(blogData);
  };

  if (previewBlog) {
    return (
      <Container maxWidth={"md"} className="mb-4">
        <Box sx={{ textAlign: "right" }}>
          <Button variant="outlined" onClick={() => setPreviewBlog(null)}>
            Hide Preview
          </Button>
        </Box>

        <BlogDetails previewBlog={previewBlog} />
      </Container>
    );
  }

  return (
    <Container maxWidth={"md"} className="mb-4">
      <Typography variant="h4" paddingY={3}>
        Create Blog
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            // onChange={(newContent) => {}}
          />

          <Stack spacing={2}>
            <Button
              variant="outlined"
              component="label"
              sx={{ width: "10rem" }}
            >
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {selectedImageUrl && (
              <img
                src={selectedImageUrl}
                alt="Preview"
                style={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "contain",
                  borderRadius: 8,
                }}
              />
            )}
          </Stack>
          <Stack direction={"row"} spacing={2}>
            <Stack direction="row" spacing={1} width={"50%"}>
              <TextField
                label="Add Tag"
                variant="outlined"
                fullWidth
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddTag}>
                Add
              </Button>
            </Stack>
            <FormControl sx={{ flex: 1, width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="category"
                value={category}
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {productCategories?.map((product, index) => (
                  <MenuItem key={index} value={product?.name}>
                    {product?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                color="primary"
              />
            ))}
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="outlined" onClick={showPreview}>
              Show Preview
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Create Blog
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};
