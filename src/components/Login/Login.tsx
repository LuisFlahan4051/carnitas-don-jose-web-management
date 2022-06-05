import './Login.scss'
import logo from './img/LogoCV1.svg'
import icon from './img/Down-Row.svg'
import React, { useRef, useState } from 'react';

function Login(props: { setLogUser: any; listOfExistentUsers: React.ReactNode[], darkTheme: boolean}) {

    /* -------------- INIT REFS AND THEMES --------------*/
    const inputName = useRef(document.createElement('input'))
    const inputPass = useRef(document.createElement('input'))
    const inputSubmit =  useRef(document.createElement('button'))

    const [handleSelect, setHandleSelect] = useState(false)
    const [userValue, setUserValue] = useState("")
    const [userInSelect, setUserInSelect] = useState(0)    
    
    /* -------------- FUNCTIONS -------------- */
    function sendData(event: {preventDefault: () => void}){
        event.preventDefault()
        props.setLogUser({
            username: inputName.current.value,
            password: inputPass.current.value
        })
    }

    function resetPassword(event:{preventDefault: () => void}) {
        event.preventDefault()
        console.log('Reset Password')
    }

    /* -------------- RENDER --------------*/
    return (
        <div className={props.darkTheme ? 'login_container_dark' : 'login_container'}>

            <img src={logo} alt="main_logo" className='login__logo'/>


            <form className='login__form'>


                <div className='login__fild'>

                    <label>Usuario:</label>

                    <div className='form__username'>
                        <div className='username__select_area'>
                            <input
                                type="text"
                                name="username"
                                ref={inputName}
                                autoFocus
                                autoComplete='off'
                                onChange={
                                    (event: { target: { value: any } }) => {
                                        setUserValue(event.target.value)
                                    }}
                                value={userValue}
                                onKeyPress={(e: { key: any; preventDefault: () => void; }) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        inputPass.current?.focus()
                                    }
                                }}
                                onKeyDown={
                                    (e) => {
                                        if (e.key === 'ArrowDown') {
                                            if (userInSelect >= 0 && userInSelect <= props.listOfExistentUsers.length -1){ 
                                                if (userInSelect === 0) { 
                                                    setUserValue(`${props.listOfExistentUsers[userInSelect]}`)
                                                }else{
                                                    setUserInSelect(userInSelect+1)
                                                    setUserValue(`${props.listOfExistentUsers[userInSelect]}`)
                                                }
                                            }else{
                                                setUserInSelect(0)
                                                setUserValue(`${props.listOfExistentUsers[userInSelect]}`)
                                            }
                                        }
                                        if (e.key === 'ArrowUp') {
                                            if (userInSelect >= 0 && userInSelect <= props.listOfExistentUsers.length - 1) {
                                            }
                                        }
                                    }
                                }
                                className='input'
                            />


                            <div className="username__icon_select" onClick={() => setHandleSelect(!handleSelect)}>
                                <img className={handleSelect ? 'icon-motion-right' : 'icon-motion-left'} src={icon} alt="V" />
                            </div>
                        </div>


                        <div className="options_area" style={handleSelect ? {} : { display: 'none' }}>
                            {props.listOfExistentUsers.map((user) =>
                                <div
                                    className="select__option"
                                    onClick={
                                        () => {
                                            setUserValue(`${user}`)
                                            setHandleSelect(false)
                                        }}
                                    key={user?.toString()}
                                >
                                    {user}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    

                </div>


                <div className='login__fild'>
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
                        }}
                        className='form__password input'
                    />


                    <a href="." className='form__link' onClick={resetPassword}>Olvidé mi contraseña...</a>


                </div>



                <div className='form__btnsArea'>
                    <button onClick={sendData} ref={inputSubmit} className={props.darkTheme ? 'form__btnEntry-dark button' : 'form__btnEntry button'}>Login</button>
                </div>


            </form>
        </div>
    );
}

export default Login;
