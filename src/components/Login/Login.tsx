import './Login.scss'
import Logo from '../../imgs/LogoCV1.svg'
import React, { useRef } from 'react';

function Login(props: { setLogUser: any; listOfExistentUsers: React.ReactNode, darkTheme: boolean}) {

    /* -------------- INIT REFS AND THEMES --------------*/
    const inputName = useRef(document.createElement('input'))
    const inputPass = useRef(document.createElement('input'))
    const inputSubmit =  useRef(document.createElement('button'))
    
    //  >>> Themes based in a global state
    var login_container = "login_container"
    if(props.darkTheme){
        login_container = "login_container_dark"
    }

    /* -------------- FUNCTIONS -------------- */
    function sendData(){
        props.setLogUser({
            username: inputName.current.value,
            password: inputPass.current.value
        })
    }

    /* -------------- RENDER --------------*/
    return (
        <div className={login_container}>
            <img src={Logo} alt="main_logo" />
            <label>Usuario:</label>
            <input 
                type="text" 
                name="username" 
                ref={inputName} 
                autoFocus
                onChange={(e: { target: { value: any } }) => {inputName.current.value = e.target.value}} 
                onKeyPress={(e: { key: any; preventDefault: () => void; }) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        inputPass.current?.focus()
                    }
                }}/>
            <label>Contraseña:</label>
            <input 
                type="password" 
                name="password" 
                ref={inputPass}
                onKeyPress={(e: { key: any; preventDefault: () => void; }) => {
                    if (e.key === 'Enter') {
                        e.preventDefault()
                        inputSubmit.current?.focus()
                    }
                }}/>
            <button onClick={sendData} ref={inputSubmit}>Login</button>
            <a href=".">Olvidé mi contraseña...</a>
        </div>
    );
}

export default Login;
