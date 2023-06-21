<div className="row section-form">
          <div className="form-container col">
            <form onSubmit={handleLogin}>
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
              <div className="form-outline mb-4 wrapper">
                <div className="person-icon">
                  <PersonOutlineIcon sx={{ fontSize: 24, marginTop: 2, marginLeft: 1.7 }} />
                </div>
                <input type="text" id="form3Example3" placeholder="User ID" className="form-control form-control-lg"
                  value={uname} onChange={unameChangeHandler} required />
                <small className="bottom-text">Please enter your ID</small>
                <small className="bottom-count">0/8</small>
              </div>


              <div className="form-outline mb-3 wrapper" id="form-outline-password">
                <div className="lockIcon">
                <HttpsOutlinedIcon  sx={{ fontSize: 24, marginTop: 2, marginLeft: 1.7 }} />
                <RemoveRedEyeOutlinedIcon  sx={{ fontSize: 24, marginTop: 2, marginLeft: 37, color: 'grey' }} />
                </div>
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  placeholder="Password" name="psw" value={password} onChange={passwordChangeHandler} />

                <small className="bottom-text">Please enter your password</small>
              </div>

              {/* <div className="d-flex justify-content-between align-items-center">
              </div> */}

              <div className="submit-button text-center mt-5 ">
                <button type="submit" className="btn btn-lg btn1"
                >
                  <ArrowRightAltSharp />
                  Login
                </button>

              </div>
            </form>
          </div>
          <div className="fed-img col">
            <img src={fedExImg} className="img-fluid" alt="Sample image"></img>
          </div>
          </div>