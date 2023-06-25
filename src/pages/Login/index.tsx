import { FormEvent, useEffect, useState } from "react";

import "../../App.scss";

import "./login-style.scss";
//import "../assets/images/petsmart-logo.png"
import petsmartImg from "../../assets/images/petsmart.png";
import pangeaImg from "../../assets/images/pangea.png";
// import { verifyLogin } from "../../api/login";
import ApiService from "../../api/ApiService";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

interface Login {
  data: LoginData;
  succeeded: boolean;
  message: string;
}
interface LoginData {
  id: number;
  firstName: string | null;
  lastName: string | null;
  username: string | null;
  accessToken: string;
}

export default function LoginPage() {
  const [uname, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginResponse, setLoginResponse] = useState<Login | null>(null);
  const [loginError, setLoginError] = useState("");
  const [loginErrorStatus, setLoginErrorStatus] = useState(false);
  const navigate = useNavigate();
  // if(localStorage.getItem(password) != null ){
  //   //setPassword(localStorage.getItem(password));
  //   //setUserName(localStorage.getItem(username));

  // } else {
  //   setPassword("");
  //   setUserName("");
  // }
  // setPassword(localStorage.getItem(password));
  // setUserName(localStorage.getItem(username));
  const unameChangeHandler = (e: { target: { value: any } }) => {
    setUserName(e.target.value);
    setNameError("");
    setLoginErrorStatus(false);
    setLoginError("");
  };

  const passwordChangeHandler = (e: { target: { value: any } }) => {
    setPassword(e.target.value);
    setPasswordError("");
    setLoginErrorStatus(false);
    setLoginError("");
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // remember me
  const [rememberMe, setRememberMe] = useState(true);

  const handleCheckboxChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (uname.trim() === "") {
      setNameError("Name is required.");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required.");
    }
    if (uname.trim() !== "" && password.trim() !== "") {
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("username", uname);
        localStorage.setItem("password", password);
      } else {
        localStorage.setItem("rememberMe", "false");
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
        // localStorage.removeItem("rememberMe");
        // localStorage.removeItem("username");
        // localStorage.removeItem("password");
      }
      const loginUser = { username: uname, password: password };

      const response = await ApiService.verifyLogin(loginUser);
      setLoginResponse(response.data);
    }
  };

  useEffect(() => {
    if (loginResponse && loginResponse.succeeded !== undefined) {
      console.log(loginResponse);

      if (loginResponse.succeeded) {
        localStorage.setItem("Authorization", loginResponse.data.accessToken);
        setLoginErrorStatus(false);
        setLoginError("");
        navigate("/home");
      } else {
        setLoginErrorStatus(true);
        setLoginError(
          "Invalid username or password. Please check your credentials."
        );
      }
    }
  }, [loginResponse]);

  return (
    <>
      <div className="wrapper-elm ">
        <div className=" container-fluid-login h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
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
                      <PersonOutlineIcon
                        sx={{ fontSize: 24, marginTop: 2, marginLeft: 1.7 }}
                      />
                    </div>
                    <input
                      type="text"
                      id="form3Example3"
                      placeholder="User ID"
                      className={
                        nameError
                          ? "error-border form-control form-control-lg"
                          : "form-control form-control-lg"
                      }
                      maxLength={10}
                      value={uname}
                      onChange={unameChangeHandler}
                    />
                    <small className="bottom-text">Please enter your ID</small>
                    <small className="bottom-count">{uname.length}/10</small>
                  </div>

                  <div
                    className="form-outline mb-3 wrapper"
                    id="form-outline-password"
                  >
                    <HttpsOutlinedIcon
                      style={{
                        fontSize: 24,
                        top: 38,
                        left: "4%",
                        position: "relative",
                      }}
                    />
                    {showPassword ? (
                      <VisibilityIcon
                        style={{
                          fontSize: 24,
                          top: "38px",
                          marginRight: "5%",
                          float: "right",
                          color: "grey",
                          position: "relative",
                        }}
                        onClick={toggleShowPassword}
                      />
                    ) : (
                      <RemoveRedEyeOutlinedIcon
                        style={{
                          fontSize: 24,
                          top: "38px",
                          marginRight: "5%",
                          float: "right",
                          color: "grey",
                          position: "relative",
                        }}
                        onClick={toggleShowPassword}
                      />
                    )}
                    <input
                      type={showPassword ? "text" : "password"}
                      id="form3Example4"
                      placeholder="Password"
                      name="psw"
                      value={password}
                      onChange={passwordChangeHandler}
                      // onClick={passwordChangeHandler}
                      className={
                        passwordError
                          ? "error-border form-control form-control-lg"
                          : "form-control form-control-lg"
                      }
                    />
                    <small className="bottom-text">
                      Please enter your password
                    </small>
                  </div>

                  {/* <div className="d-flex justify-content-between align-items-center">
  </div> */}
                  <div
                    className={
                      loginErrorStatus ? "Login__error" : "Login__success"
                    }
                  >
                    {loginError}
                  </div>
                  <div className="submit-button text-center mt-4 ">
                    <button type="submit" className="btn btn-lg btn1">
                      <EastOutlinedIcon />
                      <small
                        className="ml-3"
                        style={{ color: "white", fontSize: "14px" }}
                      >
                        Login
                      </small>
                    </button>
                  </div>
                  <div className="checkbox-elm row mt-4">
                    <input
                      className="col-md-1"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleCheckboxChange}
                    />
                    <small className="col-md-5 mt-1" id="checkbox-text">
                      Remember me
                    </small>
                  </div>
                </form>

                <div className="spinner-container">
                  <div className="loading-spinner"></div>
                </div>
              </div>

              {/* <div className="fed-img">
      <img src={fedExImg} className="img-fluid" alt="Sample image"></img>
    </div> */}
            </div>
          </div>
        </div>
        <div className="left"></div>
      </div>
      <div className="footer__content footer__content1">
        <div className="footer__item">Help for Shipment tracking</div>
        <div className="footer__item">
          The Service Desk: servicedesk@petsmart.com
        </div>
        <div className="footer__item"> 800.406.2155</div>
      </div>
    </>
  );
}
