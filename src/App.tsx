import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Constant from './components/Constant';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import SignIn from "./pages/sign-up/Sign-in";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import UpdateNewPassword from "./pages/forgotPassword/UpdateNewPassword";
import VerifyEmail from "./components/VerifyEmail";


function App() {
  return (
    <>
   
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/verify-email/:id" element={<VerifyEmail/>}/>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/update-password" element={<UpdateNewPassword />} />

      
      <Route path="*"element={ <Constant/>}/>
      </Routes>
   
    </>
  )
}

export default App
