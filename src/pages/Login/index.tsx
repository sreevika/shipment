import { FormEvent, useEffect, useState } from "react";

import "../../App.scss";

import "./login-style.scss";
//import "../assets/images/petsmart-logo.png"
import petsmartImg from '../../assets/images/petsmart.png';
import pangeaImg from '../../assets/images/pangea.png';
import fedExImg from '../../assets/images/fedEXMain.png';
import { verifyLogin } from '../../api/login';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import EastOutlinedIcon from '@mui/icons-material/EastOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';



export default function LoginPage() {
  const [uname, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const[UserIdNumber, setUserIdNumber] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const unameChangeHandler = (e: { target: { value: any; }; }) => {
    setUserName(e.target.value);
    setNameError('');
    setUserIdNumber(uname.length)
  };
  const passwordChangeHandler = (e: { target: { value: any; }; }) => {
    setPassword(e.target.value);
    setPasswordError('');
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // remember me 
  const [rememberMe, setRememberMe] = useState(true);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
    
  
  };

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uname.trim() === '') {
      setNameError('Name is required.');
    } 
    if (password.trim() === '') {
      setPasswordError('Password is required.');
    } 
    if (uname.trim() != '' && password.trim() != '') {
      if(rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('username', uname);
        localStorage.setItem('password', password);
      } else {
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }
      const loginUser = { username: uname, password: password };
      verifyLogin(loginUser)
    }
  }

  useEffect(() => {
    const rememberMeValue = localStorage.getItem('rememberMe');
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    if (rememberMeValue === 'true' && storedUsername && storedPassword) {
      setUserName(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  return (

    <div className="wrapper-elm">

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
                <input type="text" id="form3Example3" placeholder="User ID" className={nameError ? 'error-border form-control form-control-lg' : 'form-control form-control-lg'}  maxLength={11}
                  value={uname} onChange={unameChangeHandler}  />
                <small className="bottom-text">Please enter your ID</small>
                <small className="bottom-count">{UserIdNumber}/10</small>
              </div>


              <div className="form-outline mb-3 wrapper" id="form-outline-password">
                    <HttpsOutlinedIcon style={{ fontSize: 24, top: 38, left: "4%", position: 'relative' }} />
                    {showPassword ? 
                    <VisibilityIcon style={{fontSize: 24, top: "38px", marginRight: "5%", float: 'right', color: 'grey',position: 'relative' }} onClick={toggleShowPassword} /> :
                    <RemoveRedEyeOutlinedIcon style={{fontSize: 24, top: "38px", marginRight: "5%", float: 'right', color: 'grey',position: 'relative' }} onClick={toggleShowPassword} />
                    }
                <input type={showPassword ? 'text' : 'password'} id="form3Example4" 
                  placeholder="Password" name="psw" value={password} onChange={passwordChangeHandler} className={passwordError ? 'error-border form-control form-control-lg' : 'form-control form-control-lg'}/>
                <small className="bottom-text">Please enter your password</small>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center">
              </div> */}

              <div className="submit-button text-center mt-4 ">
                <button type="submit" className="btn btn-lg btn1"
                >
                <EastOutlinedIcon />
                <small className="ml-3" style={{color: "white", fontSize: "14px"}}>Login</small>
                </button>

              </div>
              <div className="checkbox-elm row mt-4">
                <input className="col-md-1" type="checkbox" checked={rememberMe} onChange={handleCheckboxChange}/>
                <small className="col-md-5 mt-1" id="checkbox-text">Remember me</small>
              </div>
            </form>
            <div className="spinner-container">
      <div className="loading-spinner">
      </div>
    </div>
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
