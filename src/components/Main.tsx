import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
import Loader from './Loader/Loader'
import AlertScreen from './AlertScreen/AlertScreen';
import { gql, useQuery } from '@apollo/client'


// TYPES needed for Apollo query
interface User {
  id: string
  name: string
  username: string
  password: string
}

interface UserData {
  users: User[]
}


//APOLLO QUERYS
const DB_USERS_LOGIN = gql`query users{users{username}}`




function Main(props: { URIGRAPHQL: string}) {
  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(window.sessionStorage.getItem('darkTheme')? true: false)
  function setDarkThemeHandler() {
    setDarkTheme(!darkTheme)
    darkTheme ? window.sessionStorage.removeItem('darkTheme') : window.sessionStorage.setItem('darkTheme', 'true')
    let mutation = `mutation{
      updateUser(id:"${currentUser.id}", changes:{darktheme: ${!darkTheme}})
    }`
    fetch(props.URIGRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({query: mutation})
    })
  }

  /* -------------- GET LOGIN  --------------*/
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })


  const [currentUser, setCurrentUser] = useState({
    id: window.sessionStorage.getItem('idCurrentUser'),
    username: window.sessionStorage.getItem('usernameCurrentUser'),
    password: window.sessionStorage.getItem('passwordCurrentUser'),
  })

  function closeSession() {
    window.sessionStorage.clear()
    setCurrentUser({
      id: '',
      username: '',
      password: ''
    })
    setLogUser({
      username: '',
      password: ''
    })
  }
  
  function saveSession(userId: string) {
    let query = `
          query{
            userById(id:"${userId}"){
              id
              name
              lastname
              username
              password
              darktheme
            }
          }
          `
    fetch(props.URIGRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }).then(res => res.json())
      .then(data => {
        setCurrentUser({
          id: data.data.userById.id,
          username: data.data.userById.username,
          password: data.data.userById.password
        })

        if (data.data.userById.darktheme == true) {
          setDarkTheme(true)
          window.sessionStorage.setItem('darkTheme', 'true')
        } else {
          setDarkTheme(false)
          window.sessionStorage.removeItem('darkTheme')
        }

        window.sessionStorage.setItem('idCurrentUser', data.data.userById.id)
        window.sessionStorage.setItem('usernameCurrentUser', data.data.userById.username)
        window.sessionStorage.setItem('passwordCurrentUser', data.data.userById.password)
      })
  }

  function validateUser() {
    let query =  `
    query{
      validateUser(username: "${logUser.username}", password: "${logUser.password}")
    }
    `
    fetch( props.URIGRAPHQL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({query: query})
    }).then(response => response.json())
    .then(data => {
      switch (data.data.validateUser) {
        case "UserDoesNotExist":
          setDisplayAlert({
            style: { display: 'block' },
            msg: `¡No existe el usuario ${logUser.username}!`,
            type: 'Error'
          })
        break;
        case "IncorrectPassword":
          setDisplayAlert({
            style: { display: 'block' },
            msg: '¡Contraseña Incorrecta!',
            type: 'Error'
          })
        break;
        case null:
          setDisplayAlert({
            style: { display: 'block' },
            msg: '¡Error de Consulta!',
            type: 'Error'
          })
        break;
        default:
          saveSession(data.data.validateUser)
        break;
      }
    })
  }

  useEffect(() => { 
    if (logUser.username && !logUser.password) {
      setDisplayAlert({ 
        style: { display: 'block'},
        msg: 'Escribe la contraseña',
        type: 'Error'
      })
    }
    if (!logUser.username && logUser.password) {
      setDisplayAlert({
        style: { display: 'block' },
        msg: 'Escribe el nombre de usuario o tu correo',
        type: 'Error'
      })
    }
    if (logUser.username && logUser.password) {
      validateUser()
    }
  }, [logUser.username, logUser.password])

  /* -------------- GET USER LIST -----------------*/
  var queryArrayUsers = useQuery<UserData>(DB_USERS_LOGIN)
 
  var listOfExistentUsers: string[] = []
  queryArrayUsers.data?.users.map((User: any) => {
    return listOfExistentUsers.push(User.username)
  })

  /* -------------- Alert Functions -------------- */
  function handlerAlert() {
    setDisplayAlert({ 
      style: { display: 'none'},
      msg: '',
      type: ''
    })
  }

  const [displayAlert, setDisplayAlert] = useState({
    style: { display: 'none' },
    msg: '',
    type: ''
  })
  

  /* -------------- Loader Functions -------------- */
  const [displayLoader, setDisplayLoader] = useState({})
  useEffect(() => {
    setTimeout(() => {
      setDisplayLoader({ display: 'none' })
    }, 800)
  }, []);

  /* -------------- RENDER --------------*/
  return (
    <div className="Main">
      
      <Home 
      darkTheme={darkTheme}
      currentUser = {currentUser}
      setDarkThemeHandler={setDarkThemeHandler}
      closeSession={closeSession}
      />

      <div className={darkTheme ? 'display_login-dark setOn':  'display_login setOn'} style={currentUser.id ? { display: 'none'} : {}}>
        < Login
          setLogUser={setLogUser}
          listOfExistentUsers={listOfExistentUsers}
          darkTheme={darkTheme}
        />
      </div>

      <div className="display_alertScreen setOn" style={displayAlert.style}>
        <AlertScreen 
          darkTheme = {darkTheme}
          type = {displayAlert.type}
          msg = {displayAlert.msg}
          handlerAlert={handlerAlert}
        />
      </div>


      <div style={displayLoader} className={darkTheme ? 'display_loader-dark setOn' : 'display_loader setOn'}>
        <Loader />
      </div>      

    </div>
  );
}

export default Main;
