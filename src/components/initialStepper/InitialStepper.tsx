import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { confirmation } from "../../store/user/userSlice";
import { logout } from "../../utils/helpers";
import { AppDispatch } from "../../store/store";
import { AdditionalDetails } from "../../interface";
import { AccountTypes, steps } from "./initialStepperContent";
import { StepperSidebar } from "../stepperSideBar/StepperSideBar";
import { StepperForm } from "./stepperForm";

const InitialStepper = (props: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [additionalDetails, setAdditionalDetails] =
    React.useState<AdditionalDetails>({
      org_Name: "",
      phone: "",
      industry: "",
      org_Size: "",
      logo: "",
      banner: "",
      address: "",
      description: "",
      role: "",
    });
  const [showStepper, setShowStepper] = React.useState(false);
  const roleFields = {
    vendor: Object.keys(additionalDetails) as string[],
    user: ["phone", "logo", "address"] as string[],
  };

  const dispatch = useDispatch<AppDispatch>();
  const { onClose } = props || {};

  const validate = () => {
    const fieldMessageName: AdditionalDetails = {
      org_Name: "Organization Name",
      industry: "Industry",
      org_Size: "Organization Size",
      logo: "Avatar",
      banner: "Banner",
      address: "Address",
      description: "Description",
      phone: "Phone Number",
      role: "Role",
    };
    const role = additionalDetails?.role as keyof typeof roleFields;
    for (const field in additionalDetails) {
      if (!additionalDetails[field as keyof AdditionalDetails]) {
        if (roleFields[role]?.includes(field)) {
          toast.warning(
            `${fieldMessageName[field as keyof AdditionalDetails]} is Required.`
          );
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = async (e: any) => {
    e.preventDefault();
    if (activeStep === 0 && !additionalDetails?.role) {
      toast.warning(`Please Select a Role before Proceeding.`);
    } else if (activeStep === 1) {
      const isValidateSuccess = validate();
      if (isValidateSuccess) {
        const res: any = await handleConfirmation();
        if (res.payload.code === 200) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
    } else if (activeStep === 2) {
      if (additionalDetails?.role === "vendor") {
        handleLogout();
      } else {
        onClose();
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleConfirmation = async () => {
    const formData = new FormData();
    formData.append("org_Name", additionalDetails.org_Name || "");
    formData.append("industry", additionalDetails.industry || "");
    formData.append("org_Size", additionalDetails.org_Size || "");
    formData.append("logo", additionalDetails?.logo || "");
    formData.append("banner", additionalDetails?.banner || "");
    formData.append("phone", additionalDetails.phone || "");
    formData.append("address", additionalDetails.address || "");
    formData.append("description", additionalDetails.description || "");
    formData.append("role", additionalDetails.role);

    const res = await dispatch(confirmation(formData));
    return res;
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-full w-full flex-row">
      <StepperSidebar
        showStepper={showStepper}
        setShowStepper={setShowStepper}
        activeStep={activeStep}
      />
      <Box
        className={`${
          showStepper ? "hidden" : "flex"
        } flex-col w-full md:w-[70vw] p-4`}
      >
        <div className="flex justify-between sm:justify-end items-center mb-4">
          <Box className="block sm:hidden text-primaryColor z-10">
            <MenuIcon onClick={() => setShowStepper(!showStepper)} />
          </Box>
          <Button variant="contained" color="primary" onClick={logout} href="/">
            LOGOUT
          </Button>
        </div>
        <Card
          className="col max-w-[30rem] lg:max-w-[65rem] h-[80vh] mx-auto mb-20 mt-4"
          sx={{
            border: "2px solid #cccccc",
            borderRadius: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
            },
            overflow: "scroll",
          }}
        >
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography
                sx={{
                  mt: 2,
                  mb: 1,
                  height: "auto",
                }}
              >
                All steps completed - you&apos;re finished
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  pt: 2,
                  height: "auto",
                }}
              >
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography
                sx={{
                  fontSize: { xs: "16px", sm: "16px", md: "32px" },
                  m: { xs: "16px", sm: "16px", md: "32px" },
                  textAlign: "center",
                  height: "auto",
                }}
                className="flex"
              >
                {activeStep == 0 ? (
                  <div>
                    <div className="text-left">
                      <p className="my-4 text-base md:text-xl font-bold">
                        Choose Account Type
                      </p>
                    </div>
                    <div className="flex justify-center gap-8 my-5 flex-wrap overflow-auto cursor-pointer">
                      {AccountTypes?.map((item, index) => {
                        return (
                          <Card
                            sx={{ maxWidth: 345 }}
                            className={
                              additionalDetails?.role === item?.role
                                ? "border-dashed border-2 border-primaryColor p-2"
                                : " p-2"
                            }
                            onClick={() =>
                              setAdditionalDetails({
                                ...additionalDetails,
                                role: item?.role,
                              })
                            }
                            key={index}
                          >
                            <div className="flex justify-center items-center">
                              <div className="ps-2">{item.logo}</div>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  sx={{
                                    fontSize: { xs: "1rem", md: "1.25rem" },
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontSize: { xs: "0.75rem", md: "1rem" },
                                  }}
                                >
                                  {item.description}
                                </Typography>
                              </CardContent>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ) : activeStep == 1 ? (
                  <StepperForm
                    additionalDetails={additionalDetails}
                    setAdditionalDetails={setAdditionalDetails}
                  />
                ) : (
                  <div className="text-left">
                    <h5 className="py-2">You are Done</h5>
                    <p className="text-sm py-3">
                      {additionalDetails?.role === "customer"
                        ? 'Your account has been created successfully! Click the "Finish" button to complete the process and start browsing through a diverse collection of products and insightful blogs tailored to your interests.'
                        : "Your Account will be under review and you will be notified once it gets reviewed."}
                    </p>
                  </div>
                )}
              </Typography>
              <Box
                className={`${showStepper ? "hidden" : "flex"} flex-row`}
                sx={{
                  position: { xs: "fixed" },
                  bottom: 0,
                  padding: "8px",
                  backgroundColor: "white",
                  zIndex: 1000,
                  right: 0,
                  left: 0,
                  background: "#00000029",
                }}
              >
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1, m: { xs: 0, md: 1 } }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Card>
      </Box>
    </div>
  );
};
export default InitialStepper;