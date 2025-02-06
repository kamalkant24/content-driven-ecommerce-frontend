import { Link, useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";
import UserInput from "../../components/UserInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/authSlice/loginSlice";
import { toast } from "react-toastify";
import {
  capitalize,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { emailRegex } from "../../constants";

interface user {
  name: any;
  email: any;
  password: any;
  cPassword: any;
}
export default function SignIn() {
  const obj: user = {
    name: "",
    email: "",
    password: "",
    cPassword: "",
  };
  const [formData, setFormData] = useState<any>({ ...obj });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNext = () => {
    navigate("/");
  };

  const fieldLabels:user = {
    name: "Full Name",
    email: "Email",
    password: "Password",
    cPassword: "Confirm Password",
  }

  const validate = () => {
    for (const field in formData) {
      if (!formData[field]) {
        toast.warning(`${fieldLabels[field]} is Required.`);
        return false
      }
      if (field === 'email') {
        if (!emailRegex.test(formData[field])) {
          toast.warning(`Invalid Email`);
          return false
        }
      }
      if (field === 'cPassword') {
        if (formData.password !== formData.cPassword) {
          toast.warning(`Password and Confirm Password does not match.`);
          return false
        }
      }
    }
    return true;
  }

  const handleRegister = async () => {
    const isValidSuccess = validate();
    if (isValidSuccess) {
      const response: any = await dispatch(registerAsync(formData));
      if (response?.payload?.code == 200) {
        navigate("/");
      }
    }
  };

  return (
    <section>
      <div className="bg-[#ffffff]">
        <div className="min-h-[100vh] w-full flex flex-col-reverse md:flex-row justify-end md:justify-center gap-6 md:gap-0">
          <div className="flex justify-center items-center w-[20rem] sm:w-[30rem] md:w-[50%] m-auto md:px-10 my-auto">
            <div className="flex flex-col gap-4 w-[90%] lg:w-[100%] max-w-[35rem]">
              <p className="font-bold text-2xl md:text-[2rem] text-center md:hidden">Welcome to Signup</p>
              <h3 className="text-gray-800 text-center font-bold text-xl md:text-2xl hidden md:block">Sign Up</h3>
              <div className="flex justify-center flex-col lg:flex-row gap-3 lg:gap-5">
                <UserButton
                  name="Sign in with Google"
                  styleClass="text-black rounded-md py-2 px-6 font-medium border"
                />
                <UserButton
                  name="Sign in with Apple"
                  styleClass="text-black rounded-md py-2 px-6  font-medium border"
                />
              </div>
              <div className="flex items-center justify-center">
                <div className="flex-1 border-t border-black"></div>
                <span className="mx-2">or with email</span>
                <div className="flex-1 border-t border-black"></div>
              </div>
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
                <UserInput
                  labelname="Full Name"
                  type="text"
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Name"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                  showValue={formData?.name}
                  name="name"
                  onChange={handleChange}
                />
                <UserInput
                  labelname="Email"
                  type="email"
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Email"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                  showValue={formData?.email}
                  name="email"
                  onChange={handleChange}
                />
                {/* <UserInput
                  labelname="Phone"
                  type="number"
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Phone"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                  showValue={formData?.phone}
                  name="phone"
                  onChange={handleChange}
                /> */}
                <UserInput
                  labelname="Password"
                  type="password"
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Password"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                  showValue={formData?.password}
                  name="password"
                  onChange={handleChange}
                />
                <UserInput
                  labelname="Confirm Password"
                  type="password"
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Password"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                  showValue={formData?.cPassword}
                  name="cPassword"
                  onChange={handleChange}
                />
                {/* <UserInput
                  labelname="Password"
                  type="password"
                  name="password"
                  showValue={formData.password}
                  onChange={handleChange}
                  labelClass="capitalize font-bold tracking-wider"
                  placeholder="Password"
                  className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
                /> */}
              </div>
              {/* <div className="text-sm">
                <FormControlLabel
                  required
                  control={<Checkbox />}
                  label="Accept the terms and conditions"
                />
              </div> */}
              <UserButton
                name="Sign Up"
                styleClass="text-white h-[44px] lg:h-[48px] w-full rounded-[5px] bg-[#2c5bf4e1] border border-[#0099ff]"
                action={handleRegister}
              />

              <div className="flex justify-between items-center">
                {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Age
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={age}
                  // onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
                <div className="flex gap-4">
                  <Link className="" to="">
                    Terms
                  </Link>
                  <Link className="" to="">
                    Plans
                  </Link>
                  <Link className="" to="">
                    Contact US
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 md:hidden">
                <p className="">Already have an account?</p>
                <UserButton
                  name="Log In"
                  styleClass="text-black w-fit text-[#0073ff]"
                  action={handleNext}
                />
              </div>
            </div>
          </div>
          <div className="text-center text-white bg-[#0073ff] hidden md:flex justify-center items-center py-16 md:w-[50%] ">
            <div className="flex flex-col gap-4 items-center">
              <p className="font-bold text-2xl md:text-[2rem]">Welcome to Signup</p>
              <p className="">Already have an account?</p>
              <UserButton
                name="Sign in"
                styleClass="py-[5px] px-[20px] rounded-full border border-white w-fit"
                action={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
