import { useState, useRef, useMemo, useEffect } from "react";
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
import {
  createBlogSlice,
  editBlogSlice,
  getBlog,
} from "../../store/blog/blogSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getToast } from "../../utils/InterceptorApi";
import { productCategories } from "../products/productContent";
import { getFileNameFromUrl } from "../../utils/helpers";

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
  const [isPreview, setIsPreview] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const [imagesToDelete, setImageToDelete] = useState<string>("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: id ? "" : "Your Blog Content...",
      height: 400,
    }),
    []
  );

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (id) {
      setImageToDelete(getFileNameFromUrl(selectedImageUrl));
    }
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
    if (!content) {
      getToast("warning", "Please write some blog content.");
      return;
    }
    if (!selectedImageUrl) {
      getToast("warning", "Please upload blog image.");
      return;
    }

    const blogData = {
      id: isPreview ? "demo" : id,
      title,
      content,
      image: isPreview ? selectedImageUrl : uploadedImageFile,
      tags,
      category,
      imagesToDelete,
    };
    if (isPreview) {
      setPreviewBlog(blogData);
    } else {
      if (id) {
        const res = await dispatch(editBlogSlice(blogData));
        if (res?.type === "edit/Blog/fulfilled") {
          navigate("/blogs");
        }
      } else {
        const res = await dispatch(createBlogSlice(blogData));
        if (res?.type === "create/Blog/fulfilled") {
          navigate("/blogs");
        }
      }
    }
  };

  const getBlogAndSetData = async () => {
    const res = await dispatch(getBlog(id ?? ""));
    const blog = res?.payload?.data;
    const { title, content, image, categories, tags } = blog;
    setTitle(title);
    setSelectedImageUrl(image[0]);
    setContent(content);
    setTags(tags);
    setCategory(categories);
  };

  useEffect(() => {
    if (id) getBlogAndSetData();
  }, []);

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
        {id ? "Edit" : "Create"} Blog
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
            <Button
              type="submit"
              variant="outlined"
              onClick={() => setIsPreview(true)}
            >
              Show Preview
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => setIsPreview(false)}
            >
              {id ? "Edit" : "Create"} Blog
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
};
