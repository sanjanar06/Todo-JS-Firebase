const firebaseConfig = {
    apiKey: "AIzaSyCl-rzDxROed-kDiEJSDAVIwGjjvnRGMzY",
    authDomain: "todo-app-2fa4c.firebaseapp.com",
    projectId: "todo-app-2fa4c",
    storageBucket: "todo-app-2fa4c.appspot.com",
    messagingSenderId: "809399820967",
    appId: "1:809399820967:web:ce97e92f7e2972b074f182",
    measurementId: "G-J57FYKBQ21"
  };
  
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//Firestore db
const db=firebase.firestore();