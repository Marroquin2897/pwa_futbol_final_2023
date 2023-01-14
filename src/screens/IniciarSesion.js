import React,{useState} from 'react';
import firebaseApp from "../firebase/firebaseConfig";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

import {getFirestore,doc,setDoc} from "firebase/firestore"

const auth=getAuth(firebaseApp);


const Login = () => {
    const firestore= getFirestore(firebaseApp);
    const [registrarse, setRegistrarse] = useState(false);

    async function registrarUsuario(email,password,rol){
       const infoUsuario = await createUserWithEmailAndPassword(
        auth,
        email,
        password)
        .then((usuarioFirebase) => {
            return usuarioFirebase;
        });
        
        //pasar el uid para guardarlo en firestore
        const docuRef = doc(firestore,`usuarios/${infoUsuario.user.uid}`);
        
        setDoc(docuRef,{correo: email ,rol: rol}); //guardar en la base de datos con todos los campos
    }


    //tomar los datos que ingresa el usuario
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
        const rol = e.target.rol.value;

        console.log("submit",email,password,rol);

        if(registrarse){
            //Para registrarse
            registrarUsuario(email,password,rol);
        } else {
            //Iniciar sesion
            signInWithEmailAndPassword(auth,email,password);
        }
    }

    return ( 
        <div>
            <h1> {registrarse ? "Registrate" : "Inicia Sesion"} </h1>

            <form onSubmit={handleSubmit}>
                <label> Correo electronico  
                   <input type="email" id="email"/> 
                </label>
                <label> Contraseña
                 <input type="password" id="password"/>   
                </label> 
                <label>
                    Rol:
                    <select id="rol">
                        <option value="administrador"> Administrador </option>
                        <option value="jugador"> Jugador </option>
                    </select>
                </label>
                <input
                    type="submit"
                    value={registrarse ? "Registrar" : "Iniciar Sesion"}
                    />
            </form>
            <button onClick={()=>setRegistrarse(!registrarse)}>
                {registrarse ? "Ya tengo una cuenta" : "Quiero registrarme"}
            </button>
    </div>
     );
}
 
export default Login;