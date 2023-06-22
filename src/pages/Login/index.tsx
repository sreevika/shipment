import React, { FormEvent, useState } from "react";

import "../../App.css";

import "./login-style.scss";
//import "../assets/images/petsmart-logo.png"
import petsmartImg from '../../assets/images/petsmart.png';
import pangeaImg from '../../assets/images/pangea.png';
import fedExImg from '../../assets/images/fedEXMain.png';
import { verifyLogin } from '../../api/login';
import { ArrowRightAltSharp } from "@mui/icons-material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';


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
    const loginUser = { username: uname, password: password };
    verifyLogin(loginUser)
  }

  return (

    <div className="wrapper-elm vh-240">

      <div className="container-fluid h-custom">
        <div className="row elm-top d-flex justify-content-center align-items-center h-100">
        <div className="row section-form">
            <div className="form-wrapper">
            <form className="form-elm" onSubmit={handleLogin}>
              <div className="d-flex flex-row align-items-center justify-content-between justify-content-lg-start mb-4">
                <div className="petsmart-img mr-4">
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
              <div className="form-outline wrapper">
                <div className="person-icon">
                  <PersonOutlineIcon sx={{ fontSize: 24, marginTop: 2, marginLeft: 1.7 }} />
                </div>
                <input type="text" id="form3Example3" placeholder="User ID" className="form-control form-control-lg"
                  value={uname} onChange={unameChangeHandler} required />
                <small className="bottom-text">Please enter your ID</small>
                <small className="bottom-count">0/8</small>
              </div>


              <div className="form-outline mb-3 wrapper" id="form-outline-password">
                    <HttpsOutlinedIcon style={{ fontSize: 24, top: 38, left: "4%", position: 'relative' }} />
                    <RemoveRedEyeOutlinedIcon style={{fontSize: 24, top: "38px", marginRight: "5%", float: 'right', color: 'grey',position: 'relative' }} />
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Password" name="psw" value={password} onChange={passwordChangeHandler} />
                   
                

                <small className="bottom-text">Please enter your password</small>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center">
              </div> */}

              <div className="submit-button text-center mt-5 ">
                <button type="submit" className="btn btn-lg btn1"
                >
                  <EastOutlinedIcon />
                <small className="ml-3" style={{color: "white", fontSize: "14px"}}>Login</small>
                </button>

              </div>
              <div className="checkbox-elm row mt-4">
                <input className="col-md-1" type="checkbox" />
                <small className="col-md-5 mt-1" id="checkbox-text">Remember me</small>
              </div>
            </form>
            </div>
          
            <div className="fed-img">
              <img src={fedExImg} className="img-fluid" alt="Sample image"></img>
            </div>

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


    </div>
  );
}
