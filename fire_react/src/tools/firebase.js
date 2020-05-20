import firebase from "firebase";

//Configuracion de Firebase

var firebaseConfig = {
    apiKey: "AIzaSyBlmXyjBDSORJKA4qrWvDHW8SBpp4o0AU8",
    authDomain: "sttryreactnative.firebaseapp.com",
    databaseURL: "https://sttryreactnative.firebaseio.com",
    projectId: "sttryreactnative",
    storageBucket: "sttryreactnative.appspot.com",
    messagingSenderId: "644306323822",
    appId: "1:644306323822:web:99c5b897fefee5f21bd97f",
    measurementId: "G-SLRFJTRTV3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

export default firebase;