// import US from '../constants/language/english'
// import CN from '../constants/language/chinese'
// import SE from '../constants/language/swedish'
// import PT from '../constants/language/portuguese'
// import ES from '../constants/language/spanish'
// import DE from '../constants/language/german'
// import FR from '../constants/language/french'

// function Translate1(key, lang) {
//   if (lang[key]) return lang[key]
//   return key;
// }

// function T1(lang) {
//   switch (lang) {
//     case 'US':
//         return (key)=>Translate1(key, US);
//     case 'CN':
//       return (key) => Translate1(key, CN);
//     case 'SE':
//       return (key) => Translate1(key, SE);
//     case 'PT':
//       return (key) => Translate1(key, PT);
//     case 'ES':
//       return (key) => Translate1(key, ES);
//     case 'DE':
//       return (key) => Translate1(key, DE);
//     case 'FR':
//       return (key) => Translate1(key, FR);
//     default:
//       return (key) => Translate1(key, CN);
//   }
// }

class Cache {
  constructor() {
    this.cacheMap = {}
    this.currentUser = null
    this.currencies = null

    //   this.lang = 'US'

      

    // this.translate = {
    //   T1: T1(this.lang)
    // }
    // console.log(this.translate.T1('Enter_registered'))
  }

  // changeLanguage(lang) {
  //   this.lang = lang
  //   this.translate = {
  //     T1: T1(lang)
  //   }
  // } 

  // setMapData(key, val) {
  //   this.cacheMap[key] = val
  // }

  // getMapData(key) {
  //   return this.cacheMap[key]
  // }

  // removeMapData(key) {
  //   if (this.cacheMap[key])
  //     delete this.cacheMap[key]
  // }

  // resetMap() {
  //   this.cacheMap = {}
  // }
}

export default new Cache();
