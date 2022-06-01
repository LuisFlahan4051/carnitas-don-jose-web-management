import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
import { gql, useQuery } from '@apollo/client'

/* Types needed for Apollo query */
interface User {
  name: string
  username: string
  password: string
}

interface UserData {
  users: User[]
}

const DB_USERS = gql`query users{users(id:""){name, password, username, lastName}}`



function Main() {




  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(true)

  /* -------------- GET LOGIN  --------------*/

  var listOfExistentUsers: string[] = ['Luis', 'Marco', 'Ana', 'Kriss', 'Carlos', 'Angel', 'Dany'] 
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })
  useEffect(() => { if (logUser.username) validateUserData() }, [logUser.username])

  const { data } = useQuery<UserData>(DB_USERS)

  function validateUserData(): void { 

    data?.users.map(User => {
      console.log(User)
    })
    
    /* 
    mutation mut{createUser(input: {id:"",name: "Luis", password: "4051", username: "LuisFlahan"}){
  name,
  password,
  username
}}
*/
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
