import { useState, useRef } from "react";
import { Box, Button, Stack, TextField, Typography, Chip } from "@mui/material";
import JoditEditor from "jodit-react";

export const CreateBlog = () => {
    const editor = useRef(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    // 🔹 Jodit Editor Config
    const config = {
        placeholder: "Write your blog content here...",
        buttons:
            "bold,italic,underline,strikethrough,ul,ol,|,h1,h2,h3,paragraph,|,align,undo,redo,|,link,image,video",
        toolbarSticky: false,
        showXPathInStatusbar: false,
    };

    // 🔹 Handle Image Upload
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file)); // Preview image
        }
    };

    // 🔹 Handle Add Tag
    const handleAddTag = () => {
        if (newTag.trim() && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag(""); // Reset input
        }
    };

    // 🔹 Handle Tag Removal
    const handleRemoveTag = (tagToRemove) => {
        setTags(tags.filter((tag) => tag !== tagToRemove));
    };

    // 🔹 Handle Form Submission
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

    return (
        <Box sx={{ maxWidth: 700, margin: "auto", padding: 3 }}>
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
                        onChange={(newContent) => setContent(newContent)}
                    />

                    <Stack spacing={2}>
                        <Button variant="outlined" component="label">
                            Upload Image
                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                        </Button>
                        {selectedImage && (
                            <img src={selectedImage} alt="Preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 8 }} />
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
                        <Button variant="outlined" onClick={() => console.log("Preview:", { title, content, selectedImage, tags })}>
                            Show Preview
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Create Blog
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};
