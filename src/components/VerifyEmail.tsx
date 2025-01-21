import { Button } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const VerifyEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:3000/api/v1/user/verify/${id}`);
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
