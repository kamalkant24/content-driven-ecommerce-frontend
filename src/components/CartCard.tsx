import { Box, IconButton, Paper, TextField, Typography } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from '@mui/icons-material/Close'; import AddIcon from "@mui/icons-material/Add";
// import { getFullProductUrl } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { getFullProductUrl } from "../utils/helpers";

export const CartCard = ({ item }) => {
    const navigate = useNavigate();

    const showProductDetails = (id: string) => {
        navigate(`/products/${id}`);
    };
    return <Paper className="p-4 md:p-8 flex gap-4 flex-row flex-wrap justify-around w-full relative" onClick={() => showProductDetails(item?._id)}>
        <Box>
            <img src={getFullProductUrl(item?.image[0])} alt={item?.title} className="w-[50px] sm:w-[100px]" />
            <Typography className="capitalize" sx={{ fontWeight: 'bold', marginTop: { xs: 0, sm: 2 } }} variant="subtitle1">{item?.title}</Typography>
        </Box>
        <Box onClick={(e) => e.stopPropagation()} className='flex flex-col items-center gap-4'>
            <Typography sx={{ fontWeight: 'bold' }}>Quantity</Typography>
            <Box>
                <IconButton>
                    <RemoveIcon />
                </IconButton>
                <TextField
                    size="small"
                    value={1}
                    sx={{ width: 40, mx: 1 }}
                    inputProps={{ style: { textAlign: "center" } }}
                />
                <IconButton>
                    <AddIcon />
                </IconButton>
            </Box>
        </Box>
        <Box className="flex flex-row sm:flex-col justify-around sm:justify-start w-full sm:w-fit gap-2 md:gap-4">
            <Box className="flex gap-4 items-center flex-row">
                <Typography sx={{ fontWeight: 'bold' }}>Price: </Typography><Typography color="primary" sx={{ fontWeight: 'bold' }}>${item?.price}</Typography>
            </Box>
            <Box className="flex gap-4 items-center flex-row">
                <Typography sx={{ fontWeight: 'bold' }}>Total: </Typography><Typography color="primary" sx={{ fontWeight: 'bold' }}>${(item?.price * 1).toFixed(2)}</Typography>
            </Box>
        </Box>
        <IconButton size="small" sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }} color="primary" aria-label="add to shopping cart" onClick={(e) => e.stopPropagation()}>
            <CloseIcon />
        </IconButton>
    </Paper>
}