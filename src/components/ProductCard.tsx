import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { discountedProductPrice, getFullProductUrl } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";


export const ProductCard = ({ item }) => {
    const navigate = useNavigate();
    const { userProfile } = useSelector((state: RootState) => state.profile);

    const addToWishlist = (e:any) => {
        e.stopPropagation();
        console.log('added to wishlist');
    }
    return <Card
        sx={{
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden',
            transition: 'transform 0.3s ease',
            '&:hover': { transform: 'scale(1.05)' },
            cursor: 'pointer',
            margin: { xs: 'auto', sm: 0 },
            width: '18rem',
            position: 'relative',
        }}
        key={item?._id}
        onClick={() => navigate(`/products/${item?._id}`)}
    >
        <CardMedia
            component="img"
            alt="product_image"
            height="200"
            image={getFullProductUrl(item?.image[0])}
            sx={{ height: '200px', objectFit: 'contain' }}
            className="bg-white"
        />
        <CardContent sx={{ paddingY: 2 }}>
            <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontWeight: 600, color: 'text.primary' }}
            >
                {item?.title}
            </Typography>
            <Box className="flex justify-start items-center gap-2">
                <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: 'black', mb: 1 }}
                >
                    ${discountedProductPrice(item.price, 10)}
                </Typography>
                <Typography
                    variant="small"
                    className="line-through text-gray-500"
                    sx={{ mb: 1 }}
                >
                    ${item.price}
                </Typography>
                <Typography
                    variant="small"
                    className="text-secondaryColor font-bold"
                    sx={{ mb: 1 }}
                >
                    10% off
                </Typography>
            </Box>
            {
                userProfile?.role === 'vendor' ? <Typography variant="body2">
                    {item.quantity} items left
                </Typography> : (item.quantity < 20 && item.quantity > 0) && <Typography variant="body2" sx={{ color: 'red' }}>{item.quantity} {item.quantity == 1 ? 'item' : 'items'} left only. Hurry Up!</Typography>
            }
        </CardContent>
        {(!item?.availability && item.quantity > 50) && <Typography variant="body2" className="text-red-500 bg-[#fee2e299] w-fit px-2 py-1 rounded-sm absolute top-0 left-0" >Out of Stock</Typography>}
        <IconButton aria-label="add to shopping cart" sx={{ position: 'absolute', top: 0, right: 0 }} onClick={addToWishlist}>
            <FavoriteIcon />
        </IconButton>
    </Card>
}