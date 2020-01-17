const DEV_MODE = 1
const PRODUCT_MODE = 2

const CONFIG_MODE = PRODUCT_MODE

export const SERVICE_API_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.124:7000":
    "http://159.122.201.34:30558"       //To do: replace with real service url
);
export const SERVICE_FILE_URL = (
    CONFIG_MODE==DEV_MODE?
    "http://192.168.1.124:7000":
    "http://159.122.201.34:30558"       //To do: replace with real service url
);

export const stripePubKey = "pk_live_eoJz8twdr0bjI7kpthxTUILM"
export const blockchainExplorer = "http://bluebarricade-blockchain-explorer.s3-website.us-east-2.amazonaws.com/#/"
// export const firebaseConfig = {
//     apiKey: "AIzaSyAh3Lr-EfPEt9djZhVPNi1YYseZVXHUgWk",
//     authDomain: "transguard-f908b.firebaseapp.com",
//     databaseURL: "https://transguard-f908b.firebaseio.com",
//     projectId: "transguard-f908b",
//     storageBucket: "transguard-f908b.appspot.com",
//     messagingSenderId: "82304297084",
// }

export const firebaseConfig = {
    apiKey: "AIzaSyDETl5diKbDoNTI_MUZDFgnTPpSkbrSvoM",
    authDomain: "greenbay-chat.firebaseapp.com",
    databaseURL: "https://greenbay-chat.firebaseio.com",
    projectId: "greenbay-chat",
    storageBucket: "greenbay-chat.appspot.com",
    messagingSenderId: "935587814271",
}
  