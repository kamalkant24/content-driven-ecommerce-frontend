import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loader: React.FC = () => {
  return (
    <Box className="absolute inset-0 flex justify-center items-center">
      <CircularProgress />
    </Box>
  );
};
