import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { steps } from "../initialStepper/initialStepperContent";

interface StepperSidebarProps {
  showStepper: boolean;
  setShowStepper: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: number;
}

export const StepperSidebar: React.FC<StepperSidebarProps> = ({
  showStepper,
  setShowStepper,
  activeStep,
}) => {
  return (
    <div
      className={`h-full inset-0 sm:w-[30vw] min-w-[17rem] bg-primaryColor ${
        showStepper ? "absolute" : "hidden"
      } sm:block`}
    >
      <Box className="block sm:hidden text-blue-500 z-10 m-4">
        <MenuIcon onClick={() => setShowStepper(!showStepper)} />
      </Box>
      <div className="flex justify-center items-center">
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          className="w-[300px] text-white sm:mt-20 ml-4"
        >
          {steps?.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            return (
              <Step key={index} {...stepProps} className="ml-4">
                <StepLabel
                  {...labelProps}
                  sx={{
                    color: "white",
                    "& .MuiStepLabel-label": { color: "#ffffff !important" },
                    "& .Mui-active .MuiStepIcon-root": { color: "#1976d2" },
                    "& .Mui-completed .MuiStepIcon-root": { color: "#1976d2" },
                    "& .MuiStepIcon-root": { color: "#808080" },
                  }}
                >
                  {label?.label}
                </StepLabel>
                <Typography
                  {...labelProps}
                  className=" text-white "
                  sx={{
                    fontSize: { xs: "16px", sm: "16px", md: "20px" },
                    color: "#ffffff",
                  }}
                >
                  {label.description}
                </Typography>
              </Step>
            );
          })}
        </Stepper>
      </div>
    </div>
  );
};
