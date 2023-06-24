import axios from 'axios';

const EDUCONNECT_URL = 'https://shipmenttrackingapi-qa.signsharecloud.com/api';

class ApiService {
  verifyLogin(loginUser: any) {
    return axios.post(`${EDUCONNECT_URL}/Auth`, loginUser);
  }
}

export default new ApiService();