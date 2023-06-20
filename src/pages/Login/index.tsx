import { FormEvent, useState } from "react";

import "../../App.css";

import "./login-style.css";
//import "../assets/images/petsmart-logo.png"
import petsmartImg from '../../assets/images/petsmart.png';
import pangeaImg from '../../assets/images/pangea.png';
import fedExImg from '../../assets/images/fedEXMain.png';
import {verifyLogin } from '../../api/login';
import { ArrowRightAltSharp } from "@mui/icons-material";


export default function LoginPage() {
  const [uname, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const unameChangeHandler = (e: { target: { value: any; }; }) => {
    setUserName(e.target.value);
  };
  const passwordChangeHandler = (e: { target: { value: any; }; }) => {
    setPassword(e.target.value);
  };

 

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUser={username:uname ,password:password};
    verifyLogin(loginUser)
  }

  return (
    
    <section className="vh-100">
    <div className="container-fluid h-custom">
      <div className="row d-flex justify-content-center align-items-center h-100">
        
        <div className="col-md-8 col-lg-6 col-xl-3 offset-xl-1">
        <form onSubmit = {handleLogin }>
            <div className="d-flex flex-row align-items-center justify-content-between justify-content-lg-start mb-4">
              <div className="mr-4">
                <img className="logo-1" src={petsmartImg} />
              </div>
              <div className="mr-4">
                <span className="pipe"></span>
              </div>
              <div>
                <img className="logo-2" src={pangeaImg} />
              </div>
            </div>
            <div className="track-1 mb-4">SHIPMENT TRACKING</div>
            <div className="form-outline mb-4 wrapper">
              <i className="fa fa-user fa-lg icon"></i>
              <input type="text" id="form3Example3" placeholder="User ID"className="form-control form-control-lg"
               value={uname} onChange={unameChangeHandler} required/>
              <small>Please enter your ID</small>
            </div>
  
            
            <div className="form-outline mb-3 wrapper">
            <i className="fa fa-lock fa-lg icon"></i>
              <input type="password" id="form3Example4" className="form-control form-control-lg"
                placeholder="password"  name="psw" value={password} onChange={passwordChangeHandler}/>
            
              <small>Please enter your Password</small>
            </div>
  
            <div className="d-flex justify-content-between align-items-center">
              
              
            
            </div>
  
            <div className="text-center text-lg-start mt-4 pt-2">
              <button type="submit" className="btn btn-lg btn1"
                >
                  <ArrowRightAltSharp />
                  Login
                </button>
           
            </div>
  
          </form>
        </div>
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img src={fedExImg}  className="img-fluid" alt="Sample image"></img>
        </div>
      </div>
    </div>
    <div
      className="flex-column flex-md-row text-center justify-content-between py-4 px-4 px-xl-5   footer1" >
    {/* d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5  */}
      <div className="text-white mb-3 mb-md-0 ">
      Help for Shipment tracking  &nbsp; &nbsp; The Service Desk: servicedesk@petsmart.com &nbsp;&nbsp; 800.406.2155
      </div>
   
  
  
  
    </div>
  </section>
 
  );
}
