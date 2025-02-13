import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const GoToHome = () => {
        navigate('/products')
    }

    return (
        <Box className="absolute inset-0 bg-white flex flex-col justify-center items-center text-4xl font-bold">
            <Typography variant="h2" component='h2'>404</Typography>
            <Typography variant="h6" component='h6'>PAGE NOT FOUND!</Typography>
            <Typography className="text-blue-500" onClick={GoToHome}>Go to Home Page.</Typography>
        </Box>
    );
};

export default NotFound;
