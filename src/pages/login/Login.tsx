import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";
import UserInput from "../../components/UserInput";
// import "./login.scss";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/authSlice/loginSlice";
import SocialLogin from "../../components/SocialLogin";
import { capitalize, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { emailRegex } from "../../constants";


interface FormData {
  email: String,
  password: String
}

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const [isErrorPresent, setIsErrorPresent] = useState<boolean>(true);


  const handleNext = () => {
    navigate("/sign-in");
  };

  const validate = () => {
    for (const field in formData) {
      if (!formData[field]) {
        toast.warning(`${capitalize(field)} is Required.`);
        return
      }
      if (field === 'email') {
        if (!emailRegex.test(formData[field])) {
          toast.warning(`Invalid Email`);
          return
        }
      }
    }
    setIsErrorPresent(false)
  }

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsErrorPresent(true)
    validate();
    if (!isErrorPresent) {
      const response: object = await dispatch(
        loginAsync(formData)
      );
      if (response?.payload?.code === 200) {
        navigate("/home");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const value = e.target.value;
    setFormData((prev: FormData) => ({ ...prev, [fieldName]: value }))
    console.log({ fieldName, value });
  };

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <section>
      <div className="bg-[#ffffff]">
        <div className="h-[100vh] w-full flex flex-col-reverse md:flex-row justify-end md:justify-center gap-6 md:gap-0">
          <div className="flex justify-center items-center w-[20rem] sm:w-[30rem] md:w-[50%] m-auto md:px-10">
            <div className="flex flex-col gap-4 w-[90%] max-w-[30rem]">
              <p className="font-bold text-2xl md:text-[2rem] text-center md:hidden">Welcome to login</p>
              <h3 className="text-gray-800 text-center font-bold text-xl md:text-2xl hidden md:block">Sign In</h3>
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
              <UserInput
                labelname="Email"
                name="email"
                showValue={formData.email}
                onChange={handleChange}
                type="email"
                labelClass="capitalize font-bold tracking-wider"
                placeholder="Email"
                className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
              />
              <UserInput
                labelname="Password"
                type="password"
                name="password"
                showValue={formData.password}
                onChange={handleChange}
                labelClass="capitalize font-bold tracking-wider"
                placeholder="Password"
                className="h-[42px] md:h-[48px] bg-[#0000000d] w-full px-[20px]"
              />
              <div className="flex justify-end">
                <Link className="" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <UserButton
                name="Sign in"
                styleClass="text-white h-[44px] lg:h-[48px] w-full rounded-[5px] bg-[#2c5bf4e1] border border-[#0099ff]"
                action={handleLogin}
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
                  <Link className="" to="forget-password">
                    Terms
                  </Link>
                  <Link className="" to="forget-password">
                    Plans
                  </Link>
                  <Link className="" to="forget-password">
                    Contact US
                  </Link>
                </div>
              </div>
              <div className="flex gap-4 md:hidden">
                <p className="">Don't have an account?</p>
                <UserButton
                  name="Sign Up"
                  styleClass="text-black w-fit text-[#0073ff]"
                  action={handleNext}
                />
              </div>

            </div>
          </div>
          <div className="text-center text-white bg-[#0073ff] hidden md:flex justify-center items-center py-16 md:w-[50%] ">
            <div className="flex flex-col gap-4 items-center">
              <p className="font-bold text-2xl md:text-[2rem]">Welcome to login</p>
              <p className="">Don't have an account?</p>
              <UserButton
                name="Sign Up"
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
