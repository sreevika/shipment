import axios from "axios";
import swal from 'sweetalert2';
const EDUCONNECT_URL = `https://shipmenttrackingapi-qa.signsharecloud.com/api`;
//const navigate = useNavigate(); // Use the useNavigate hook here


export const verifyLogin = async (loginUser: any) => {
  try {
    let response = await axios.post(`${EDUCONNECT_URL}/Auth`, loginUser);
    //   let response =  {
    //     "data": {
    //         "id": 0,
    //         "firstName": null,
    //         "lastName": null,
    //         "username": null,
    //         "accessToken": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhcnVuIiwiZW1haWwiOiJhcnVuIiwibmJmIjoxNjgzNzQ3ODM1LCJleHAiOjE2ODM3NDg0MzUsImlhdCI6MTY4Mzc0NzgzNSwiaXNzIjoiSXNzdWVyIiwiYXVkIjoiQXVkaWVuY2UifQ.WHjAF13yS7D_TPsJ4mDY-u5QhDjI1JgY_IiBYtISqzj4HKGQDjBTunc9OChDC_QhfDbPfUlw_HSkjD8GTRlSlw"
    //     },
    //     "succeeded": true,
    //     "message": null
    // };
    console.log(response);
    if (response.data.succeeded) {
      // The PromiseResult.data.succeeded is true
      localStorage.setItem('Authorization', response.data.data.accessToken);
      window.location.href = "http://localhost:5173/home";
      localStorage.setItem('error_message', "");
    
      //navigate("/home");
    } else {
     
      localStorage.setItem('error_message', response.data.message);
    
      swal.fire('Hi!', response.data.message, 'info');

      return false;
    }

    //return response;
  } catch (error) {
    // Handle the error if the promise rejects
    console.error("An error occurred:", error);
   
    throw error;
  }
};