import React from 'react';
import Home from './screens/Home';
import Login from './screens/IniciarSesion';
import { useState } from 'react';
import firebaseApp from "./firebase/firebaseConfig";
import {getFirestore,doc,getDoc} from "firebase/firestore"
import {getAuth,onAuthStateChanged} from 'firebase/auth';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const App = () => {

  const [user, setUser] = useState(null);

  async function getRol(uid) {
    const docuRef = doc (firestore,`usuarios/${uid}`);
    const docuCifrada = await getDoc(docuRef);

    const infoFinal = docuCifrada.data().rol; //para interpretar la informacion del usuario ya que viene cifrada
    
    return infoFinal;
  }

  function setUserWithFirebaseAndRol(usuarioFirebase) {
    getRol(usuarioFirebase.uid).then((rol) => {
      const userData = {
        uid: usuarioFirebase.uid,
        email: usuarioFirebase.email,
        rol: rol,
      };
      setUser(userData);
      console.log("userData fianl", userData);
    });
  }

  //saber si cambio de sesion
  onAuthStateChanged(auth,(usuarioFirebase) => {
    if (usuarioFirebase) {
      //funcion final

      if (!user) {
        setUserWithFirebaseAndRol(usuarioFirebase);
      }
    } else {
      setUser(null);
    }
  })

  return ( 
    <>
      {user ? <Home user={user}/> : <Login/> }
    </>
   );
}
 
export default App;