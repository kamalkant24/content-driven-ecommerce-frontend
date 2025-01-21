import  { useState } from 'react'
import UserInput from '../../components/UserInput'
import UserButton from '../../components/UserButton'

const ForgotPassword = () => {

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
            <h3 className="text-gray-800 text-center">ForgotPassword</h3>
            <UserInput
              // labelname="USERNAME"
              name="username"
              showValue={email}
              onChange={handleChange}
              type="email"
              // labelClass="userLabelClass pt-4"
              placeholder="Username"
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
            <p className="heading_main">Forget your password here</p>
          </div>

         
        </div>
      </div>
    </div>
  </section>
  )
}

export default ForgotPassword
