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
const DB_USERS_LOGIN = gql`query users{users{id, username}}`




function Main(props: { URIGRAPHQL: string}) {
  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(window.sessionStorage.getItem('darkTheme')? true: false)
  function setDarkThemeHandler() {
    setDarkTheme(!darkTheme)
    darkTheme ? window.sessionStorage.removeItem('darkTheme') : window.sessionStorage.setItem('darkTheme', 'true')
    let mutation = `mutation{
      updateUser(id:"${currentUser.id}", changes:{darktheme: ${!darkTheme}}){
        darktheme
      }
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
  
  // TODO: use the query validateUser from the API, not in react. Add request User! to schema graphql for that purpose
  function validateUser(){
    let query = `{
      userByUsername(username: "${logUser.username}"){
        id,
        password, 
        username,
        name,
        darktheme
      }
    }`
    fetch(props.URIGRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }).then(response => response.json())
      .then(data => {
        if (data.data.userByUsername.username === logUser.username && data.data.userByUsername.password === logUser.password) {
          setCurrentUser({
            id: data.data.userByUsername.id,
            username: data.data.userByUsername.username,
            password: data.data.userByUsername.password
          })

          console.log(data.data.userByUsername.darktheme)
          if(data.data.userByUsername.darktheme == true){
            setDarkTheme(true)
            window.sessionStorage.setItem('darkTheme', 'true')
          }else{
            setDarkTheme(false)
            window.sessionStorage.removeItem('darkTheme')
          }

          window.sessionStorage.setItem('idCurrentUser', data.data.userByUsername.id)
          window.sessionStorage.setItem('usernameCurrentUser', data.data.userByUsername.username)
          window.sessionStorage.setItem('passwordCurrentUser', data.data.userByUsername.password)
        }else{
          setDisplayAlert({
            style: { display: 'block' },
            msg: '¡Contraseña Incorrecta!',
            type: 'Error'
          })
          
        }
      }).catch( _ =>{
        setDisplayAlert({
          style: { display: 'block' },
          msg: `¡No existe el usuario ${logUser.username}!`,
          type: 'Error'
        })
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
