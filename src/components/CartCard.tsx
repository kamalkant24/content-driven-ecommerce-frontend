import { Box, IconButton, Paper, TextField, Typography } from "@mui/material"
import RemoveIcon from "@mui/icons-material/Remove";
import CloseIcon from '@mui/icons-material/Close'; import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { getFullProductUrl } from "../utils/helpers";

export const CartCard = ({ item, checkoutCards }) => {
    const navigate = useNavigate();

    const showProductDetails = (id: string) => {
        if (!checkoutCards)
            navigate(`/products/${id}`);
    };
    return <Paper square elevation={0} sx={{ boxShadow: { xs: 0, sm: 3 } }} className="sm:px-8 sm:py-4 flex gap-2 flex-row justify-between w-full relative border-b sm:border-none border-primaryColor pb-4 pt-10" onClick={() => showProductDetails(item?._id)}>
        <Box>
            <img src={getFullProductUrl(item?.image[0])} alt={item?.title} className={`w-[50px] ${!checkoutCards && 'sm:w-[100px]'} `} />
            <Typography className="capitalize" sx={{ textAlign: 'center', marginTop: 2, fontSize: { xs: '0.8rem', sm: '1rem' } }} variant="subtitle1">{item?.title}</Typography>
        </Box>
        <Box onClick={(e) => e.stopPropagation()} className='flex flex-col items-center gap-4'>
            <Typography>Quantity</Typography>
            <Box className="flex items-center">
                {checkoutCards ? <Typography>1</Typography> : <><IconButton>
                    <RemoveIcon sx={{ width: { xs: '15px', sm: 'auto' } }} />
                </IconButton>
                    <TextField
                        size="small"
                        value={1}
                        sx={{
                            width: { xs: 30, sm: 40 },
                            mx: { xs: 0.5, sm: 1 },
                            "& .MuiInputBase-input": {
                                fontSize: { xs: "12px", sm: "16px" },
                                textAlign: "center",
                                padding: { xs: "4px", sm: "8px" },
                            },
                        }}
                        inputProps={{ style: { textAlign: "center" } }}
                    />
                    <IconButton>
                        <AddIcon sx={{ width: { xs: '15px', sm: 'auto' } }} />
                    </IconButton></>}
            </Box>
        </Box>
        <Box className="flex flex-col sm:justify-start w-fit gap-2 md:gap-4">
            <Box className="flex gap-4 items-center flex-row">
                <Typography>Price: </Typography><Typography>${item?.price}</Typography>
            </Box>
            <Box className="flex gap-4 items-center flex-row">
                <Typography>Total: </Typography><Typography>${(item?.price * 1).toFixed(2)}</Typography>
            </Box>
        </Box>
        {!checkoutCards && <IconButton size="small" sx={{ position: 'absolute', top: 8, right: { xs: 0, sm: 8 }, color: 'red', padding: 0 }} aria-label="add to shopping cart" onClick={(e) => e.stopPropagation()}>
            <CloseIcon />
        </IconButton>
        }
    </Paper >
}