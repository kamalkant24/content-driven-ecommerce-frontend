import { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserButton from "../../components/UserButton";
import UserInput from "../../components/UserInput";
import "./login.scss";
import { useDispatch } from "react-redux";
import { loginAsync } from "../../store/authSlice/loginSlice";
import SocialLogin from "../../components/SocialLogin";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNext = () => {
    navigate("/sign-in");
  };

  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response: object = await dispatch(
      loginAsync({ email: username, password })
    );
    if (response?.payload?.code === 200) {
      navigate("/home");
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  return (
    <section>
      <div className="wrap">
        <div className="row h-[100vh] w-full">
          <div className="col-lg-6 flex justify-center items-center ">
            <div>
              <h3 className="text-gray-800 text-center">Sign In</h3>
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
              <div className="flex justify-center items-center">
                __________________________or with
                email______________________________
              </div>
              <UserInput
                // labelname="USERNAME"
                name="username"
                showValue={username}
                onChange={handleUsernameChange}
                type="email"
                // labelClass="userLabelClass pt-4"
                placeholder="Username"
                className="inputClass mt-5 mb-2"
              />
              <UserInput
                // labelname="PASSWORD"
                type="password"
                name="password"
                showValue={password}
                onChange={handlePasswordChange}
                // labelClass="userLabelClass"
                placeholder="Password"
                className="inputClass mt-4 "
              />
              <div className="flex justify-end my-2">
                <Link className="" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              <UserButton
                name="Sign in"
                styleClass="userBtn"
                action={handleLogin}
              />

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
          <div className="text-center col-lg-6 rightBar d-flex justify-content-center align-items-center">
            <div>
              <p className="heading_main">Welcome to login</p>
              <p className="heading_second">Don't have an account?</p>
              <UserButton
                name="Sign Up"
                styleClass="userBtnUp "
                action={handleNext}
              />
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
