import { useState, useRef, useMemo } from "react";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  Chip,
  Container,
} from "@mui/material";
import JoditEditor from "jodit-react";
import { BlogDetails } from "../blogDetails/BlogDetails";

export const CreateBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [previewBlog, setPreviewBlog] = useState(null);

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
      setSelectedImage(URL.createObjectURL(file));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const blogData = {
      title,
      content,
      image: selectedImage,
      tags,
    };
    console.log("Blog Data:", blogData);
    alert("Blog submitted successfully!");
  };

  const showPreview = () => {
    const blogData = {
      id: "demo",
      likes: [],
      comments: [],
      title,
      content,
      image: selectedImage,
      tags,
    };
    setPreviewBlog(blogData);
    console.log("Blog Data:", blogData);
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
            <Button variant="outlined" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
            {selectedImage && (
              <img
                src={selectedImage}
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

          <Stack direction="row" spacing={1}>
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
