import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Box, InputAdornment, Stack, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../../interface';
import { addProductSlice, getProductSlice } from '../../store/productsSlice/userProductSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { getFullProductUrl } from '../../utils/helpers';

export const AddProduct: React.FC = () => {
    const [product, setProduct] = useState<Product>({
        title: '',
        description: '',
        price: '',
        quantity: '',
        images: [],
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { allProducts } = useSelector((state: any) => state.products);
    const [productDetails, setProductDetails] = useState(null)

    useEffect(() => {
        if (!allProducts) {
            const fetchData = async () => {
                const res = await dispatch(
                    getProductSlice(id)
                );
                const product = res?.payload;
                setProductDetails(product);
            };
            fetchData();
        } else {
            const product = allProducts.data.find((product: any) => product?._id === id);
            setProductDetails(product);
        }
    }, [id, allProducts]);

    useEffect(() => {
        if (id && productDetails?.title) {
            const { title, description, price, quantity, image } = productDetails;
            setProduct({
                title,
                description,
                price,
                quantity,
                images: image
            })
        }
    }, [productDetails, productDetails])

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
        if (id) {
            console.log('Edit Product: ', product);
        } else {
            const res = await dispatch(addProductSlice(product));
            if (res.meta.requestStatus === 'fulfilled') {
                navigate('/products')
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" paddingY={4}>
                {id ? 'Edit' : 'Add'} Product
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
                                                src={typeof image === 'string' ? getFullProductUrl(image) : URL.createObjectURL(image)}
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
                            {id ? 'Edit' : 'Add'} Product
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};
