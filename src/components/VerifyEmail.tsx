import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAsync } from "../store/authSlice/loginSlice";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      // axios.get(`http://localhost:3000/api/v1/user/verify/${id}`);
      const response: any = dispatch(verifyAsync(id));
      if (response?.payload?.code == 200) {
        // toast.success(response?.payload?.message);
        navigate("/");
      }
    }
  }, []);

  return (
    <div className="container p-20 flex justify-center items-center">
      <h2>Your Email Is Verified</h2>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        {" "}
        Back to login page
      </Button>
    </div>
  );
};

export default VerifyEmail;
