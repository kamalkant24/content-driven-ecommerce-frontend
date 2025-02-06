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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import UserInput from "./UserInput";
import logo from "../assets/online-store.png";
import {
  CompanyAcc,
  DeveloperAcc,
  MyCompanyLogo,
  TestingAcc,
} from "../assets/image";
import { toast } from "react-toastify";
import { capitalize } from "@mui/material";
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

  // const isStepOptional = (step: number) => {
  //   return step === 1;
  // };

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
      // let newSkipped = skipped;
      // if (isStepSkipped(activeStep)) {
      //   newSkipped = new Set(newSkipped.values());
      //   newSkipped.delete(activeStep);
      // }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      // setSkipped(newSkipped);
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

  // React.useEffect(() => {
  //   if (
  //     activeStep === steps.length - 0 &&
  //     organization.org_Name &&
  //     organization.industry &&
  //     organization.org_Size &&
  //     organization?.profile_img
  //   ) {
  //     handleConfirmation();
  //   }
  // }, [activeStep, steps, organization]);

  // const handleSkip = () => {
  //   if (!isStepOptional(activeStep)) {
  //     // You probably want to guard against something like this,
  //     // it should never occur unless someone's actively trying to break something.
  //     throw new Error("You can't skip a step that isn't optional.");
  //   }

  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   setSkipped((prevSkipped) => {
  //     const newSkipped = new Set(prevSkipped.values());
  //     newSkipped.add(activeStep);
  //     return newSkipped;
  //   });
  // };

  const AccountTypes = [
    {
      title: "Personal Account",
      description: "If you need more info ,please check this out",
      logo: <AdminPanelSettingsIcon height="200px" width="200px" />,
    },
    {
      title: "Corporate Account",
      description: "ICreate corporate account to mane users",
      logo: <CorporateFareIcon height="200px" width="200px" />,
    },
  ];

  const AccountPlan = [
    {
      title: "Company Account",
      description: "You can post products and blogs and costumers can buy your products, like and comment on your blogs.",
      icon: CompanyAcc,
    },
    // {
    //   title: "Developer Account",
    //   description: "Use images to your past time",
    //   icon: DeveloperAcc,
    // },
    // {
    //   title: "Testing Account",
    //   description: "Use images to enhance time travel rivers",
    //   icon: TestingAcc,
    // },
  ];

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="flex h-full w-full flex-col md:flex-row">
      <div className="md:h-full md:w-[30vw] min-w-[25rem] bg-blue-500 flex justify-start pl-[40px] md:pl-0 md:justify-center md:pt-20 hidden md:block">
        <div className="py-4 w-fit m-auto">
          {/* {MyCompanyLogo} */}
          {/* <img src={logo} width="50" height="50" /> */}
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            className="!block pt-0 md:pt-10 w-[300px] text-white"
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
                <Step key={index} {...stepProps}>
                  <StepLabel {...labelProps}>{label?.label} </StepLabel>
                  <Typography
                    {...labelProps}
                    className=" text-white "
                    sx={{
                      fontSize: {
                        xs: '16px',
                        sm: '18px',
                        md: '22px',
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
      <div className="col md:w-[70vw] overflow-auto max-w-[30rem] lg:max-w-[65rem] mx-auto mb-10">
        <div className="flex justify-end m-4">
          <Button variant="contained" className="bg-blue-500" onClick={logout} href="/">LOGOUT</Button>
        </div>
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
                fontSize: "25px",
                m: { xs: '16px', md: '32px' },
                textAlign: "center",
                height: "auto",
                // minHeight: { sm: '70vh' }
              }}
              className="flex"
            >
              {activeStep == 0 ? (
                <div>
                  <div className="text-left">
                    <p className="my-4 text-base md:text-xl font-bold">Choose Account Type</p>
                  </div>
                  <div className="flex  gap-8 my-5 flex-wrap overflow-auto">
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
                                  fontSize: { xs: '1rem', sm: '1.25rem' }, 
                                }}
                              >
                                {item.title}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                  fontSize: { xs: '0.75rem', sm: '1rem' },
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

                  {/* <h5>Specific team size !</h5>
                  <div className="grid grid-col-4 grid-flow-col gap-4 text-center">
                    <div className="card w-32">1-1</div>
                    <div className="card w-32">2-10</div>
                    <div className="card w-32">10-50</div>
                    <div className="card w-32">50+</div>
                  </div> */}
                  {/* <p className="text-base mt-5">
                    Customer will see the shorter version of your statement
                    description below
                  </p>

                  <div>
                    <UserInput placeholder="Description" className="border border-black rounded-sm h-12 text-base px-4  w-full" />
                  </div> */}

                  <div className="w-[80%]">
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
            <Box sx={{
              flexDirection: "row",
              position: { xs: "fixed" },
              bottom: 0,
              padding: "8px",
              backgroundColor: "white",
              zIndex: 1000,
              right: 0,
              left: 0,
              background: '#00000029',
              display: { xs: 'flex' },
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
              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};
export default InitialStepper;
