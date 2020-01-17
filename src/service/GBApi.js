import Cache from "../utils/cache";
import * as config from "../config";
import { NativeModules } from 'react-native'
import UtilService from '../utils/util'
import * as Keychain from 'react-native-keychain';

const GBApi = {
  async baseApi(sub_url, method, json_data, cb) {
    try {
      let request = {
        method,
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": Cache.currentUser
            ? "bearer " + Cache.currentUser['access_token']
            : null,
        }
      };
      if (method == "POST" || method == "PUT") {
        request["body"] = JSON.stringify(json_data);
      }
      console.log(config.SERVICE_API_URL + sub_url, request)
      let response = await fetch(config.SERVICE_API_URL + sub_url, request);
      let responseJson = await response.json();
      if (response.status == 200) {
        cb(null, responseJson);
      } else {
        cb(responseJson);
      }
    } catch (error) {
      cb(error);
    }
  },

  async init(cb) {
    try {
      // const credentials = await UtilService.getKeychain()
      // console.log('credentials', credentials)
      // if (credentials && credentials.username) {
      //   this.login(credentials.username, credentials.password, (err, user) => {
      //     cb(err, user)
      //     Cache.currentUser = user;
      //   })
      // } else {
      //   cb(null)
      // }
      cb(null)
    } catch (err) {
      cb(err)
    }

  },

  isLoggedIn() {
    return Cache.currentUser != null;
  },

  login(email, password, cb) {
    this.baseApi('/api/login', 'POST', { email, password, pushToken:Cache.pushToken }, (err, res) => {
      if (err == null) {
        Cache.currentUser = res
        Cache.currentUser.user.password = password
        // UtilService.saveLocalStringData('email', email);
        // UtilService.saveLocalStringData('password', password);
      }
      cb(err, res)
    })
  },

  logout() {
    Cache.currentUser = null;
    // Keychain.resetGenericPassword()
  },

  signup(data, cb) {
    this.baseApi('/api/signup', 'POST', data, (err, res) => {
      cb(err, res)
    })
  },

  async uploadImage(sub_url, file, cb) {
    try {
      let image = {
        uri: file,
        type: "image/jpeg",
        name: "file.jpeg"
      };

      let formData = new FormData();
      formData.append("file", image);
      let response = await fetch(
        config.SERVICE_API_URL + sub_url,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          body: formData
        }
      );
      let status = response.status;
      console.log('status', status)

      let responseJson = await response.json();
      console.log('respo', responseJson)
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },

  getProjects(cb) {
    this.baseApi('/api/projects', 'GET', {}, cb)
  },
  setProjects(data, cb) {
    this.baseApi('/api/projects', 'POST', data, cb)
  },
  getMyDonates(cb) {
    this.baseApi('/api/userDonates', 'GET', {}, cb)
  },
  getFilteredProject(id, cb) {
    this.baseApi('/api/projects?type=' + id, 'GET', {}, cb)
  },
  getProjectTypes(cb) {
    this.baseApi('/api/projectTypes', 'GET', {}, cb)
  },
  getProjectTypeById(id, cb) {
    this.baseApi(`/api/projectTypes/${id}`, 'GET', {}, cb)
  },
  getCurrencies(cb) {
    this.baseApi('/api/currencies', 'GET', {}, cb)
  },
  getExchangeRate(base, cb) {
    this.baseApi(`/api/currencies/rates/${base}`, 'GET', {}, cb)
  },
  exchange(data, cb) {
    this.baseApi('/api/exchange', 'POST', data, cb)
  },
  getCurrencyById(id, cb) {
    this.baseApi(`/api/currencies/${id}`, 'GET', {}, cb)
  },
  getMyWallet(cb) {
    this.baseApi('/api/myWallet', 'GET', {}, cb)
  },
  setDonates(data, cb) {
    this.baseApi('/api/donates', 'POST', data, cb)
  },
  getHistory(cb) {
    this.baseApi('/api/userDonates', 'GET', {}, cb)
  },
  chargeStripe(data, cb) {
    this.baseApi('/api/web/chargeStripe', 'POST', data, cb)
  },
  getTransactions(pageNum, pageSize, from, to, cb) {
    this.baseApi('/api/transactions?pageNum=' + pageNum + '&pageSize=' + pageSize + '&from='+from + '&to='+to, 'GET', {}, cb)
  },
  calcFee(data, cb) {
    this.baseApi('/api/calcFee', 'POST', { data }, cb)
  },
  setTransfer(data, cb) {
    this.baseApi('/api/transfer', 'POST', { data }, cb)
  },
  getUsers(cb) {
    this.baseApi('/api/users', 'GET', {}, cb)
  },
  getUser(id, cb) {
    this.baseApi(`/api/users/${id}`, 'GET', {}, cb)
  },
  updateProfile(data, cb) {
    console.log('data----->', data)
    this.baseApi('/api/users/me', 'POST', data, cb)
  },
  forgotPassword(data, cb) {
    this.baseApi('/api/reset/request', 'POST', data, cb)
  },
  resetPassword(data, cb) {
    this.baseApi('/api/users/resetPassword', 'POST', data, cb)
  },
  requestWithdraw(data, cb) {
    this.baseApi('/api/requestWithdraw', 'POST', data, cb)
  },
  getPaypalToken(cb) {
    this.baseApi('/api/getPaypalToken', 'POST', {}, cb)
  },
  createPaypalPayment(data, cb) {
    this.baseApi('/api/createPaypalPayment', 'POST', data, cb)
  },
  executePaypalPayment(data, cb) {
    this.baseApi('/api/executePaypalPayment', 'POST', data, cb)
  },
  sendVerifyCode(phoneNumber, cb) {
    this.baseApi('/api/sendCode?phone=' + phoneNumber, 'GET', {}, cb)
  },
  verifyCode(code, cb) {
    this.baseApi('/api/verifyCode?code=' + code, 'GET', {}, cb)
  },
  async photoUpload(uri, cb) {
    try {
      let image = {
        uri: uri,
        type: "image/jpeg",
        name: "file.jpeg"
      };

      let formData = new FormData();
      formData.append("file", image);
      // formData.append("description", caption)
      let response = await fetch(
        config.SERVICE_API_URL + '/api/fileUpload',
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          body: formData
        }
      );
      let status = response.status;
      console.log('status', status)

      let responseJson = await response.json();
      console.log('respo', responseJson)
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  },

  async fileUpload(file, cb) {
    try {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("model", "users")
      formData.append("id", 1)
      // formData.append("description", caption)
      let response = await fetch(
        config.SERVICE_API_URL + '/api/fileUpload',
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
          },
          body: formData
        }
      );
      let status = response.status;
      console.log('status', status)

      let responseJson = await response.json();
      console.log('respo', responseJson)
      if (status == 200 || status == 201) {
        cb(null, responseJson);
      } else {
        cb(responseJson.message);
      }
    } catch (error) {
      cb(error);
    }
  }
};

export default GBApi;