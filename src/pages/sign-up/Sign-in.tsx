import { Link, useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";
import UserInput from "../../components/UserInput";
import "./signIn.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerAsync } from "../../store/authSlice/loginSlice";
import { toast } from "react-toastify";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

interface user {
  name: any;
  email: any;
  phone: any;
  password: any;
  cPassword: any;
}
export default function SignIn() {
  const obj: user = {
    name: "",
    email: "",
    phone: "",
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

  const handleRegister = async () => {
    const response: any = dispatch(registerAsync(formData));
    if (response?.payload?.code == 200) {
      toast.success(response?.payload?.message);
      navigate("/");
    }
  };

  return (
    <section>
      <div className="wrap">
        <div className="row row h-[100vh] w-full">
          <div className="col-lg-6 flex  justify-center items-center">
            <div className="p-4">
              <div>
                <h3 className="text-center">Sign In</h3>
                <div className="flex my-3 justify-center gap-3">
                  <UserButton
                    name="Sign in with Google"
                    styleClass="text-black rounded-md py-2 px-6 font-medium border"
                  />
                  <UserButton
                    name="Sign in with Apple"
                    styleClass="text-black rounded-md py-2 px-6  font-medium border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mt-5">
                  <UserInput
                    labelname="FULL NAME"
                    type="text"
                    labelClass="userLabelClass"
                    placeholder="Name"
                    className="inputClass"
                    showValue={formData?.name}
                    name="name"
                    onChange={handleChange}
                  />
                  <UserInput
                    labelname="EMAIL"
                    type="email"
                    labelClass="userLabelClass"
                    placeholder="Email"
                    className="inputClass"
                    showValue={formData?.email}
                    name="email"
                    onChange={handleChange}
                  />
                  <UserInput
                    labelname="Phone"
                    type="text"
                    labelClass="userLabelClass"
                    placeholder="Phone"
                    className="inputClass"
                    showValue={formData?.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                  <UserInput
                    labelname="PASSWORD"
                    type="password"
                    labelClass="userLabelClass"
                    placeholder="Password"
                    className="inputClass"
                    showValue={formData?.password}
                    name="password"
                    onChange={handleChange}
                  />
                  <UserInput
                    labelname="Confirm Password"
                    type="password"
                    labelClass="userLabelClass"
                    placeholder="Password"
                    className="inputClass"
                    showValue={formData?.cPassword}
                    name="cPassword"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <FormControlLabel
                    required
                    control={<Checkbox />}
                    label="Accept the terms and conditions"
                  />
                </div>
                <UserButton
                  name="Sign Up"
                  styleClass="userBtn"
                  action={handleRegister}
                />
              </div>
              <div className="flex justify-between items-center">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
                </FormControl>
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
            </div>
          </div>
          <div className="col-lg-6 rightBar d-flex  justify-content-center  align-items-center text-center">
            <div>
              <p className="heading_main">Welcome to login</p>
              <p className="heading_second">Don't have an account?</p>
              <UserButton
                name="Sign In"
                styleClass="userBtnUp"
                action={handleNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
