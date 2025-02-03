import React, { useState } from 'react';
import { TextField, Button, Typography, Box, InputAdornment, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Product } from '../../interface';
import { addProduct } from '../../store/productsSlice/userProductSlice';
import { useNavigate } from 'react-router-dom';

export const AddProduct: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        title: 'Test Title',
        description: 'Test Description',
        price: '150',
        quantity: '15',
        images: [],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            setProduct((prevState) => ({
                ...prevState,
                images: [...prevState.images, ...newFiles],
            }));
        }
    };

    const handleImageDelete = (index: number) => {
        const updatedImages = product.images.filter((_, i) => i !== index);
        setProduct((prevState) => ({
            ...prevState,
            images: updatedImages,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (product.images.length === 0) {
            toast.warning('At least one image is required.');
            return;
        }

        const res = await dispatch(addProduct(product));
        if (res.meta.requestStatus === 'fulfilled') {
            navigate('/products')
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Product Title"
                        variant="outlined"
                        fullWidth
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        label="Product Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
                        <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                            type="number"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                        />
                        <TextField
                            label="Quantity"
                            variant="outlined"
                            fullWidth
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                        />
                    </Stack>
                    <Stack spacing={1}>
                        {product.images.length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" color="textSecondary">
                                    Selected Images:
                                </Typography>
                                <Stack direction="row" spacing={2} flexWrap="wrap">
                                    {product.images.map((image, index) => (
                                        <Box key={index} sx={{ position: 'relative', width: 100, height: 100, overflow: 'hidden', borderRadius: 1 }}>
                                            <img
                                                src={URL.createObjectURL(image)}
                                                alt={`image-${index}`}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <IconButton
                                                onClick={() => handleImageDelete(index)}
                                                sx={{
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 0,
                                                    color: 'white',
                                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                                    },
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        )}
                    </Stack>

                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} width="100%">
                        <Button
                            variant="contained"
                            component="label"
                            sx={{ width: '100%' }}
                        >
                            Upload Images
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ width: '100%' }}
                        >
                            Add Product
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};
