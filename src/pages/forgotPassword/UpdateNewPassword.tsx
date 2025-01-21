import { useState } from 'react'
import UserInput from '../../components/UserInput'
import UserButton from '../../components/UserButton'

const UpdateNewPassword = () => {
    const [email,setEmail]=useState('')




    const handleChange=(e:any)=>{
        setEmail(e.target.value)
    }

    const handleForgot=()=>{

    }
  return (
    <section>
    <div className="wrap">
      <div className="row h-[100vh] w-full">
        <div className="col-lg-6 flex justify-center items-center ">
          <div>
            <h3 className="text-gray-800 text-center">Update Password</h3>
            <UserInput
            //   labelname="Password"
              name="password"
              showValue={email}
              onChange={handleChange}
              type="password"
              // labelClass="userLabelClass pt-4"
              placeholder="Password"
              className="inputClass mt-5 mb-2"
            />
               <UserInput
            //   labelname="ConfirmPassword"
              name="password"
              showValue={email}
              onChange={handleChange}
              type="password"
              // labelClass="userLabelClass pt-4"
              placeholder="ConfirmPassword"
              className="inputClass mt-5 mb-2"
            />
      
            <UserButton
              name="Submit"
              styleClass="userBtn"
              action={handleForgot}
            />

           
          </div>
        </div>
        <div className="text-center col-lg-6 rightBar d-flex justify-content-center align-items-center">
          <div>
            <p className="heading_main">Update your password from here</p>
          </div>

         
        </div>
      </div>
    </div>
  </section>
  )
}

export default UpdateNewPassword
