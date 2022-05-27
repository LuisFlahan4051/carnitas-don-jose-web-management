import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'

function Main() {

  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(true)

  /* -------------- GET LOGIN  --------------*/
  var listOfExistentUsers: string[] = [] 
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })
  useEffect(() => { if (logUser.username) validateUserData() }, [logUser.username])
  function validateUserData() { 
    console.log(logUser.username)
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
      < Login 
      setLogUser={setLogUser} 
      listOfExistentUsers={listOfExistentUsers}
      darkTheme={darkTheme}
      />
    </div>
  );
}

export default Main;
