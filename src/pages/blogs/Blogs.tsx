import { Button } from "@mui/material";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Getting Blogs');
  }, [])
  return (
    <div className="m-4 font-bold">
      <Button onClick={() => navigate('create')}>Create Blog</Button>
    </div>
  )
}

export default Blogs
