import './Login.scss'
import logo from './img/LogoCV1.svg'
import icon from './img/Down-Row.svg'
import React, { FunctionComponentFactory, useRef, useState } from 'react';

function Login(props: { setLogUser: Function; listOfExistentUsers: React.ReactNode[], darkTheme: boolean}) {

    /* -------------- INIT REFS AND THEMES --------------*/
    const inputName = useRef(document.createElement('input'))
    const inputPass = useRef(document.createElement('input'))
    const inputSubmit =  useRef(document.createElement('button'))

    const [handleSelect, setHandleSelect] = useState(false)
    const [userValue, setUserValue] = useState("")
    const [userInSelect, setUserInSelect] = useState(-1)    
    
    /* -------------- FUNCTIONS -------------- */
    function sendData(event: {preventDefault: () => void}){
        event.preventDefault()
        props.setLogUser({
            username: inputName.current.value,
            password: inputPass.current.value
        })
        setTimeout(() => {
            inputPass.current.value = ''
            inputPass.current.focus()
        }, 2000)
    }

    function resetPassword(event:{preventDefault: () => void}) {
        event.preventDefault()
        console.log('Reset Password')
    }

    /* -------------- RENDER --------------*/
    return (
        <div className={props.darkTheme ? 'login_container_dark' : 'login_container'}>

            <img src={logo} alt="main_logo" className='login__logo'/>


            <form className='login__form' onSubmit={sendData}>


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
                                        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                                            if (e.key === 'ArrowDown') {
                                                new Promise((resolve)=>{
                                                    if (userInSelect < props.listOfExistentUsers.length - 1) {
                                                        setUserInSelect(userInSelect + 1)
                                                    }
                                                    resolve(userInSelect + 1) //Se ejecuta al mismo tiempo que el if. por eso regreso el valor mientras actualiza el estado

                                                }).then((InSelect: any) => {
                                                    if (InSelect >= 0 && InSelect < props.listOfExistentUsers.length) {
                                                        setUserValue(`${props.listOfExistentUsers[InSelect]}`)
                                                    }
                                                })        
                                            }
                                            if (e.key === 'ArrowUp') {
                                                new Promise((resolve) => {
                                                    if (userInSelect > 0) {
                                                        setUserInSelect(userInSelect - 1)
                                                    }
                                                    resolve(userInSelect-1)
                                                }).then((InSelect: any) => {
                                                    if (InSelect >= 0 && InSelect < props.listOfExistentUsers.length) {
                                                        setUserValue(`${props.listOfExistentUsers[InSelect]}`)
                                                    }
                                                })
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
                            {props.listOfExistentUsers.map((user,index) =>
                                <div
                                    className="select__option"
                                    onClick={
                                        () => {
                                            setUserValue(`${user}`)
                                            setHandleSelect(false)
                                            setUserInSelect(index)
                                            inputName.current?.focus()
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
                    <button type='submit' ref={inputSubmit} className={props.darkTheme ? 'form__btnEntry-dark button' : 'form__btnEntry button'}>Login</button>
                </div>


            </form>
        </div>
    );
}

export default Login;
