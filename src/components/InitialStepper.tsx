import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { confirmation, getProfile } from "../store/user/userSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UserInput from "./UserInput";
import MenuIcon from "@mui/icons-material/Menu";
// import {
//   CompanyAcc,

// } from "../assets/image";
import { toast } from "react-toastify";
import { logout } from "../utils/helpers";
import { AppDispatch, RootState } from "../store/store";
import { AdditionalDetails } from "../interface";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Account Type",
    description: `Select your account type`,
  },
  {
    label: "Business Details",
    description: `Setup your business deatils`,
  },
  {
    label: "Completetd",
    description: `Your account is created`,
  },
];

const InitialStepper = (props: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [previewImage, setPreviewImage] = React.useState("");
  const [previewBanner, setPreviewBanner] = React.useState("");
  const { userProfile } = useSelector((state: RootState) => state.profile);
  // const [activeAccount, setActiveAccount] = React.useState(0);
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
      role: ""
    });
  const [showStepper, setShowStepper] = React.useState(false);
  const roleFields = {
    vendor: Object.keys(additionalDetails) as string[],
    user: ["phone", "logo", "address"] as string[],
  };

  const handleOrganization = (e: any) => {
    const { name, value } = e.target;
    if (name == "logo") {
      setAdditionalDetails({ ...additionalDetails, [name]: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else if (name == "banner") {
      setAdditionalDetails({ ...additionalDetails, [name]: e.target.files[0] });
      setPreviewBanner(URL.createObjectURL(e.target.files[0]));
    } else {
      setAdditionalDetails({ ...additionalDetails, [name]: value });
    }
  };

  const dispatch = useDispatch<AppDispatch>();
  const { onClose } = props || {};

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

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

  const AccountTypes = [
    {
      title: "Personal Account",
      description:
        "This is user account. You can buy products, like and comment on blogs.",
      logo: <PermIdentityIcon height="200px" width="200px" />,
      role: "customer",
    },
    {
      title: "Corporate Account",
      description:
        "This is vendor account. You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
      logo: <CorporateFareIcon height="200px" width="200px" />,
      role: "vendor",
    },
  ];

  // const AccountPlan = [
  //   {
  //     title: "Company Account",
  //     description: "You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
  //     icon: CompanyAcc,
  //   },
  // ];

  const handleReset = () => {
    setActiveStep(0);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-full w-full flex-row">
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
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step key={index} {...stepProps} className="ml-4">
                  <StepLabel
                    {...labelProps}
                    sx={{
                      color: "white",
                      "& .MuiStepLabel-label": { color: "white !important" },
                    }}
                  >
                    {label?.label}{" "}
                  </StepLabel>
                  <Typography
                    {...labelProps}
                    className=" text-white "
                    sx={{
                      fontSize: {
                        xs: "16px",
                        sm: "16px",
                        md: "20px",
                      },
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
      <Box
        className={`${
          showStepper ? "hidden" : "flex"
        } flex-col w-full md:w-[70vw] p-4`}
      >
        <div className="flex justify-between sm:justify-end items-center mb-4">
          <Box className="block sm:hidden text-blue-500 z-10">
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
                            <CardActions></CardActions>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                ) : activeStep == 1 ? (
                  <div className="flex w-full">
                    <div className="w-full">
                      <div className="mx-auto bg-white rounded-md  text-left w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                          {additionalDetails?.role === "vendor"
                            ? "Organization"
                            : "Additional"}{" "}
                          Details
                        </h2>
                        <form className="flex flex-wrap justify-between text-sm ">
                          {additionalDetails?.role === "vendor" && (
                            <div className="my-4 w-full lg:w-[47.5%]">
                              <label className="block text-gray-700 font-medium mb-2">
                                Organization Name
                              </label>
                              <UserInput
                                type="text"
                                id="org_Name"
                                placeholder="Organization Name"
                                onChange={handleOrganization}
                                name="org_Name"
                                showValue={additionalDetails?.org_Name}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                              />
                            </div>
                          )}
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Phone Number
                            </label>
                            <UserInput
                              type="number"
                              id="phone"
                              placeholder="Phone Number"
                              onChange={handleOrganization}
                              name="phone"
                              showValue={additionalDetails?.phone}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                          {additionalDetails?.role === "vendor" && (
                            <div className="my-4 w-full lg:w-[47.5%]">
                              <label className="block text-gray-700 font-medium mb-2">
                                Choose Your Industry
                              </label>
                              <select
                                id="industry"
                                name="industry"
                                onChange={handleOrganization}
                                value={additionalDetails?.industry}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                              >
                                <option
                                  className="h-8"
                                  value=""
                                  disabled
                                  selected
                                >
                                  Select Industry
                                </option>
                                <option
                                  className="h-8"
                                  value="Technology & Electronics"
                                >
                                  Technology & Electronics
                                </option>
                                <option
                                  className="h-8"
                                  value="Fashion & Apparel"
                                >
                                  Fashion & Apparel
                                </option>
                                <option className="h-8" value="Home & Living">
                                  Home & Living
                                </option>
                                <option
                                  className="h-8"
                                  value="Health & Wellness"
                                >
                                  Health & Wellness
                                </option>
                                <option
                                  className="h-8"
                                  value="Sports & Recreation"
                                >
                                  Sports & Recreation
                                </option>
                              </select>
                            </div>
                          )}
                          {additionalDetails?.role === "vendor" && (
                            <div className="my-4 w-full lg:w-[47.5%]">
                              <label className="block text-gray-700 font-medium mb-2">
                                Organization Size
                              </label>
                              <UserInput
                                type="number"
                                id="org_Size"
                                placeholder="Organization Size"
                                onChange={handleOrganization}
                                name="org_Size"
                                showValue={additionalDetails?.org_Size}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                              />
                            </div>
                          )}
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Add Your Logo/Avatar
                            </label>
                            <div>
                              <input
                                type="file"
                                id="logo"
                                name="logo"
                                onChange={handleOrganization}
                                accept="image/*"
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                              />
                              {previewImage && (
                                <img
                                  src={previewImage}
                                  className="contain h-[4rem]"
                                />
                              )}
                            </div>
                          </div>
                          {additionalDetails?.role === "vendor" && (
                            <div className="my-4 w-full lg:w-[47.5%]">
                              <label className="block text-gray-700 font-medium mb-2">
                                Organization Banner
                              </label>
                              <div>
                                <input
                                  type="file"
                                  id="banner"
                                  name="banner"
                                  accept="image/*"
                                  onChange={handleOrganization}
                                  className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                                />
                                {previewBanner && (
                                  <img
                                    src={previewBanner}
                                    className="contain h-[4rem]"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Address
                            </label>
                            <UserInput
                              type="text"
                              id="address"
                              placeholder="Address"
                              onChange={handleOrganization}
                              name="address"
                              showValue={additionalDetails?.address}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                          {additionalDetails?.role === "vendor" && (
                            <div className="my-4 w-full lg:w-[47.5%]">
                              <label className="block text-gray-700 font-medium mb-2">
                                Description
                              </label>
                              <UserInput
                                type="text"
                                id="description"
                                placeholder="Company's Short Description"
                                onChange={handleOrganization}
                                name="description"
                                showValue={additionalDetails?.description}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                              />
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  </div>
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
