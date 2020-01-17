import AsyncStorage from '@react-native-community/async-storage';
import * as Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import {Alert} from 'react-native'

class UtilService {
  static getPastDateTime(ts) {
    if (ts == null || ts == "") return "";

    var mins = Math.floor((Date.now() / 1000 - ts / 1000000000) / 60);

    if (mins <= 0) {
      return "just now";
    } else if (mins < 60) {
      if (mins == 1) return mins + " minute ago";
      else return mins + " minutes ago";
    } else if (mins < 24 * 60) {
      var hours = Math.floor(mins / 60);

      if (hours == 1) return hours + " hour ago";
      else return hours + " hours ago";
    } else if (mins >= 24 * 60) {
      var days = Math.floor(mins / (24 * 60));

      if (days == 1) return days + " day ago";
      else return days + " days ago";
    }
  }

  static convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  }

  static getPositionString(pos) {
    if (!pos) return "—";

    return this.ordinal_suffix_of(pos);
  }

  static deg2rad(angle) {
    return (angle * Math.PI) / 180;
  }

  static getDistanceFromLatLonInMile(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return Number((d / 1.6093).toFixed(1));
  }

  static getBackColor(imageObj) {
    if (!imageObj) return "rgb(255,255,255)";

    var backgroundColor = imageObj._env
      ? "rgb(" +
      imageObj._env["input-md-average"].r +
      "," +
      imageObj._env["input-md-average"].g +
      "," +
      imageObj._env["input-md-average"].b +
      ")"
      : "rgb(255,255,255)";

    return backgroundColor;
  }

  static getPricesString(prices) {
    var p = prices || 1;
    var ret = "";
    for (i = 1; i <= p; i++) {
      ret += "₡";
    }

    return ret;
  }

  static capitalizeFirstLetter(string) {
    if (string === undefined) {
      return null;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static isValid(data) {
    if (!data) return false;

    if (data == "") return false;

    return true;
  }

  static isValidURL(data) {
    if (!this.isValid(data)) return false;

    if (data == "http://") return false;

    return true;
  }

  static fixUrl(url) {
    if (this.isValidURL(url)) {
      url = url.toLowerCase();
      //if ((url.indexOf("http://") == -1) && (url.indexOf("https://") == -1)) {
      if (url.indexOf(":") == -1) {
        url = "http://" + url;
      }
      return url;
    }

    return null;
  }

  static ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  static async saveLocalStringData(key, strValue) {
    await AsyncStorage.setItem("@gogo:" + key, strValue);
    return true;
  }

  static async saveLocalObjectData(key, obj) {
    await AsyncStorage.setItem("@gogo:" + key, JSON.stringify(obj));
  }

  static async getLocalStringData(key) {
    let ret = await AsyncStorage.getItem("@gogo:" + key);

    return ret;
  }

  static async getLocalObjectData(key) {
    let ret = await AsyncStorage.getItem("@gogo:" + key);
    if (ret != null) {
      return JSON.parse(ret);
    } else {
      return null;
    }
  }

  static async removeLocalObjectData(key) {
    let ret = await AsyncStorage.removeItem("@gogo:" + key);
    return true;
  }

  getHours(date) {
    let d = new Date(date);
  }

  static getKeychain() {
    return new Promise((resolve, reject) => {
      Keychain.getGenericPassword().then(credentials => {
        Keychain.getSupportedBiometryType()
          .then(async (type) => {
            if (type == 'Fingerprint' && credentials && credentials.username) {
              TouchID.authenticate('Authentication')
                .then(result => {
                  resolve(credentials)
                })
                .catch(error => {
                  resolve(null)
                })
            } else {
              resolve(credentials)
            }

          }).catch(err => {
            resolve(credentials)
          })
      }).catch(err => {
        resolve(null)
      })

    })
  }

  static touchAuthenticate(cb) {
    const supportConfig = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    }
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.isSupported(supportConfig)
      .then(biometryType => {
       
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else {
          console.log('TouchID is supported.');
        }

        TouchID.authenticate('To use your touchID for login', optionalConfigObject)
          .then(success => {
            if ( cb ) cb()
          })
          .catch(error => {
            console.log('authenticate', error)
            // Alert.alert('Authentication Failed');
          });
      })
      .catch(error => {
        console.log('isSupport', error)
        Alert.alert('Please enable your touch id in system settings.')
      });
  }


  static getAddress1(contact) {
    var rets = [];
    if (contact) {
      if (contact.Street) rets.push(contact.Street);
      if (contact.Street2) rets.push(contact.Street2);
      return rets.join(" ");
    }
  }
  static getHourMinutes(date) {
    let dd = new Date(date)
    let h = dd.getHours(), m = dd.getMinutes()
    let AP = ' AM'
    if (h > 12) {
      h = h - 12;
      AP = ' PM'
    }

    return h + ':' + m + AP
  }
}

export default UtilService;
String.prototype.isEmptyText = function (title) {
  if (this.length == 0) return "Please input username."
  if (this.length == 1) return "At least 2 characters."
  return null
}
String.prototype.isValidName = function (title) {
  if (this.length == 0) return translate('pleaseEnter') + " " + title + "."
  if (!this.match(/^[A-Za-z]+$/)) return translate('pleaseEnterValid') + " " + title + "."
  if (this.length == 1) return translate('pleaseEnterAtLeast2CharactersIn') + " " + title + "."
  return null
}
String.prototype.isValidPassword = function () {
  if (this.length == 0) return "Please input password."
  if (this.length < 6) return "Please input password at least 6 characters."
  return null
}
String.prototype.isValidEmail = function () {
  if (this.length == 0) return "Please input email."
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this)) return null
  return "Please input valid email"
}
String.prototype.isValidPhoneNumber = function () {
  if (this.length == 0) return "Please input mobile number."
  if (!(/^\d+$/.test(this))) return "Invalid mobile number."
  if (this.length < 8) return "Please input at least 8 digits mobile number."
  return null
}
