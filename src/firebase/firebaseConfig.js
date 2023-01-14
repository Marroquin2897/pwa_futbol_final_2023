import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyA0DED0kWeK4uiMiSr4VjqjUQuVkkO_e8k",
  authDomain: "futbolpwa-react.firebaseapp.com",
  projectId: "futbolpwa-react",
  storageBucket: "futbolpwa-react.appspot.com",
  messagingSenderId: "1089517902764",
  appId: "1:1089517902764:web:711e303b369b0a3898b809"
  
  
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  // Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
  export default firebaseApp;