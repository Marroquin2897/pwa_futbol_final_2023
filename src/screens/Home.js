import React from 'react';
import firebaseApp from '../firebase/firebaseConfig';
import { getAuth,signOut } from 'firebase/auth';
import VistaAdmi from '../Componentes/VistaAdministrador';
import JugadorVista from '../Componentes/VistaJugador';


const auth=getAuth(firebaseApp);

function Home({user}) {
    return (  
        <>
        <p> HOME </p>

        <button onClick={()=>signOut(auth)}> Cerrar sesion</button>
        {user.rol === "administrador" ? <VistaAdmi /> : <JugadorVista />}
        </>
    );
}
 
export default Home;
