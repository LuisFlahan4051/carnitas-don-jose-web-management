import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
import { Schema, model, connect } from 'mongoose';

function Main() {

  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(false)

  /* -------------- GET LOGIN  --------------*/

  var listOfExistentUsers: string[] = ['Luis', 'Marco', 'Ana', 'Kriss', 'Carlos', 'Angel', 'Dany'] 
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })
  useEffect(() => { if (logUser.username) validateUserData() }, [logUser.username])
  function validateUserData() { 
    console.log(logUser)
    setCurrentUser({id:1, username: logUser.username, password: logUser.password})
    // To Do
  }








  /* -------------- USER LOGED -------------- */
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    username: "",
    password: ""
  })
  
  /* -------------- RENDER --------------*/
  return (
    <div className="Main">
      
      <Home darkTheme={darkTheme}/>

      <div className={darkTheme ? 'display_login-dark':  'display_login'} style={currentUser.id ? { display: 'none'} : {}}>
        < Login
          setLogUser={setLogUser}
          listOfExistentUsers={listOfExistentUsers}
          darkTheme={darkTheme}
        />
      </div>

      

    </div>
  );
}

export default Main;
