import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { confirmation, getProfile } from "../store/user/userSlice";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UserInput from "./UserInput";
import MenuIcon from '@mui/icons-material/Menu';
import {
  CompanyAcc,

} from "../assets/image";
import { toast } from "react-toastify";
import { logout } from "../utils/helpers";

interface Organization {
  org_Name: string;
  industry: string;
  org_Size: string;
  profile_img: string;
  org_Banner: string;
  org_Phone: string;
  org_Address: string;
  org_Description: string
}

const steps = [
  {
    label: "Account Type",
    description: `Select your account type`,
  },
  {
    label: "Account Info",
    description: "Setup your account settings",
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
  const [activeAccount, setActiveAccount] = React.useState(0);
  const [organization, setOrganization] = React.useState<Organization>({
    org_Name: "",
    org_Phone: "",
    industry: "",
    org_Size: "",
    profile_img: "",
    org_Banner: "",
    org_Address: "",
    org_Description: ""
  });
  const [showStepper, setShowStepper] = React.useState(false);

  const handleOrganization = (e: any) => {
    const { name, value } = e.target;
    if (name == "profile_img") {
      setOrganization({ ...organization, [name]: e.target.files[0] });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    } else if (name == "org_Banner") {
      setOrganization({ ...organization, [name]: e.target.files[0] });
      setPreviewBanner(URL.createObjectURL(e.target.files[0]));
    } else {
      setOrganization({ ...organization, [name]: value });
    }
  };

  const dispatch = useDispatch();
  const { onClose } = props || {};

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const validate = () => {
    const fieldMessageName: Organization = {
      org_Name: "Organization Name",
      industry: "Industry",
      org_Size: "Organization Size",
      profile_img: "Avatar",
      org_Banner: 'Banner',
      org_Address: 'Address',
      org_Description: 'Description',
      org_Phone: 'Phone Number'
    };
    for (const field in organization) {
      if (!organization[field]) {
        toast.warning(`${fieldMessageName[field]} is Required.`);
        return false;
      }
    }
    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (activeStep === 2) {
      const isValidateSuccess = validate();
      if (isValidateSuccess) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    } else if (activeStep === steps.length - 1) {
      const res = await handleConfirmation();
      if (res.payload.code === 200) {
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
    formData.append("org_Name", organization.org_Name);
    formData.append("industry", organization.industry);
    formData.append("org_Size", organization.org_Size);
    formData.append("profile_img", organization?.profile_img);
    // formData.append("org_Banner", organization?.org_Banner);

    const res = await dispatch(confirmation(formData));
    dispatch(getProfile({}));
    onClose();
    return res
  };


  const AccountTypes = [
    {
      title: "Personal Account",
      description: "This is user account. You can buy products, like and comment on blogs.",
      logo: <PermIdentityIcon height="200px" width="200px" />,
    },
    {
      title: "Corporate Account",
      description: "This is company account. You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
      logo: <CorporateFareIcon height="200px" width="200px" />,
    },
  ];

  const AccountPlan = [
    {
      title: "Company Account",
      description: "You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
      icon: CompanyAcc,
    },
  ];

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="flex h-full w-full flex-row">
      <div className={`h-full inset-0 sm:w-[30vw] min-w-[17rem] bg-[#1565c04a] ${showStepper ? 'absolute' : 'hidden'} sm:block`} >
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
                  <StepLabel {...labelProps}>{label?.label} </StepLabel>
                  <Typography
                    {...labelProps}
                    className=" text-white "
                    sx={{
                      fontSize: {
                        xs: '16px',
                        sm: '16px',
                        md: '20px',
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
      <Box className={`${showStepper ? 'hidden' : 'flex'} flex-col w-full md:w-[70vw] p-4`}>
        <div className='flex justify-between sm:justify-end items-center mb-4'>
          <Box className="block sm:hidden text-blue-500 z-10">
            <MenuIcon onClick={() => setShowStepper(!showStepper)} />
          </Box>
          <Button variant="contained" sx={{ background: 'blue.500' }} onClick={logout} href="/">LOGOUT</Button>
        </div>
        <Card elevated={6} className="col max-w-[30rem] lg:max-w-[65rem] h-[80vh] mx-auto mb-20 mt-4"
          sx={{
            border: '2px solid #cccccc',
            borderRadius: 2,
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
            },
            overflow: 'scroll'
          }}>

          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{
                mt: 2, mb: 1, height: "auto",
              }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2, height: 'auto' }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography
                sx={{
                  fontSize: { xs: '16px', sm: '16px', md: '32px' },
                  m: { xs: '16px', sm: '16px', md: '32px' },
                  textAlign: "center",
                  height: "auto",
                }}
                className="flex"
              >
                {activeStep == 0 ? (
                  <div>
                    <div className="text-left">
                      <p className="my-4 text-base md:text-xl font-bold">Choose Account Type</p>
                    </div>
                    <div className="flex justify-center gap-8 my-5 flex-wrap overflow-auto">
                      {AccountTypes?.map((item, index) => {
                        return (
                          <Card
                            sx={{ maxWidth: 345 }}
                            className={
                              activeAccount === index
                                ? "border-dashed border-2 border-blue-500 p-2"
                                : " p-2"
                            }
                            onClick={() => {
                              setActiveAccount(index);
                            }}
                          >
                            <div className="flex justify-center items-center">
                              <div className="ps-2">{item.logo}</div>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                  sx={{
                                    fontSize: { xs: '1rem', md: '1.25rem' },
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{
                                    fontSize: { xs: '0.75rem', md: '1rem' },
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
                  <div className="text-left flex flex-col gap-4">
                    <h4>Account Info</h4>
                    <div className="max-w-[25rem]">
                      <h5>Your Account Plan !</h5>
                      {AccountPlan?.map((item) => {
                        return (
                          <div className="flex my-4 items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
                            <div className="w-full py-4 flex items-center mr-2">
                              <div className="me-2">{item.icon}</div>
                              <div>
                                <label for="bordered-radio" className="text-sm font-medium text-gray-900">
                                  {item.title}
                                </label>
                                <h6 className="text-xs font-normal">
                                  {item.description}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-sm">
                      if you need more info,pleae check out{" "}
                      <span className="text-primary text-[#3b82f6] cursor-pointer">Help Page?</span>
                    </p>
                  </div>
                ) : activeStep == 2 ? (
                  <div className="flex w-full">
                    <div className="w-full">
                      <div className="mx-auto bg-white rounded-md  text-left w-full">
                        <h2 className="text-2xl font-semibold mb-4">
                          Organization Details
                        </h2>
                        <form className="flex flex-wrap justify-between text-sm ">
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
                              showValue={organization?.org_Name}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Phone Number
                            </label>
                            <UserInput
                              type="number"
                              id="org_Phone"
                              placeholder="Phone Number"
                              onChange={handleOrganization}
                              name="org_Phone"
                              showValue={organization?.org_Phone}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Choose Your Industry
                            </label>
                            <select
                              id="industry"
                              name="industry"
                              onChange={handleOrganization}
                              value={organization?.industry}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            >
                              <option className="h-8" value="" disabled selected>
                                Select Industry
                              </option>
                              <option className="h-8" value="Technology & Electronics">
                                Technology & Electronics
                              </option>
                              <option className="h-8" value="Fashion & Apparel">
                                Fashion & Apparel
                              </option>
                              <option className="h-8" value="Home & Living">
                                Home & Living
                              </option>
                              <option className="h-8" value="Health & Wellness">
                                Health & Wellness
                              </option>
                              <option className="h-8" value="Sports & Recreation">
                                Sports & Recreation
                              </option>
                            </select>
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Organization Size
                            </label>
                            <select
                              id="org_Size"
                              name="org_Size"
                              onChange={handleOrganization}
                              value={organization?.org_Size}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            >
                              <option className="h-8" value="" disabled selected>
                                Organization size
                              </option>
                              <option className="h-8" value="100">
                                0 to 100
                              </option>
                              <option className="h-8" value="200">
                                100 to 200
                              </option>
                              <option className="h-8" value="300">
                                200 to 300
                              </option>
                              <option className="h-8" value="500">
                                300 to 500
                              </option>
                            </select>
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Add Your Logo/Avatar
                            </label>
                            <div>
                              <input
                                type="file"
                                id="profile_img"
                                name="profile_img"
                                onChange={handleOrganization}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                              />
                              {previewImage &&
                                <img src={previewImage} className="contain h-[4rem]" />
                              }
                            </div>
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Organization Banner
                            </label>
                            <div>
                              <input
                                type="file"
                                id="org_Banner"
                                name="org_Banner"
                                onChange={handleOrganization}
                                className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 py-3 mb-4"
                              />
                              {previewBanner &&
                                <img src={previewBanner} className="contain h-[4rem]" />
                              }
                            </div>
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Address
                            </label>
                            <UserInput
                              type="text"
                              id="org_Address"
                              placeholder="Address"
                              onChange={handleOrganization}
                              name="org_Address"
                              showValue={organization?.org_Address}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                          <div className="my-4 w-full lg:w-[47.5%]">
                            <label className="block text-gray-700 font-medium mb-2">
                              Description
                            </label>
                            <UserInput
                              type="text"
                              id="org_Description"
                              placeholder="Company's Short Description"
                              onChange={handleOrganization}
                              name="org_Description"
                              showValue={organization?.org_Description}
                              className="bg-slate-100  w-full h-12 focus:border-blue-500 px-3 "
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-left">
                    <h5 className="py-2">You are Done</h5>
                    <p className="text-sm py-3">
                      Your Account will be under review and you will be notified once it gets reviewed.
                    </p>
                  </div>
                )}
              </Typography>
              <Box
                className={`${showStepper ? 'hidden' : 'flex'} flex-row`}
                sx={{
                  position: { xs: "fixed" },
                  bottom: 0,
                  padding: "8px",
                  backgroundColor: "white",
                  zIndex: 1000,
                  right: 0,
                  left: 0,
                  background: '#00000029',
                }}>
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
