import './Main.scss'
import { useState, useEffect } from 'react';
import Login from './Login/Login'
import Home from './Home/Home'
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

//EXAMPLE for a manual FETCH
/*const DB_USERS_VALIDATION_FETCH = `{
  userByUsername(username: "LuisFlahan"){
    id,
    name, 
    password, 
    username, 
    lastName
  }
}`*/

//QUERYS
const DB_USERS_LOGIN = gql`query users{users{id, username}}`
const DB_USERS_VALIDATION = gql`query getUser($username: String){
  userByUsername(username: $username){
    password, 
    username
  }
}`


function Main() {
  
  /* --------------GLOBAL THEME CONTROL --------------*/
  const [darkTheme, setDarkTheme] = useState(true)

  /* -------------- GET LOGIN  --------------*/
  const [logUser, setLogUser] = useState({
    username: "",
    password: ""
  })

  useEffect(() => { if (logUser.username) {
    validateUserData()
  } }, [logUser.username])

  var queryArrayUsers = useQuery<UserData>(DB_USERS_LOGIN)
 
  var listOfExistentUsers: string[] = []
  queryArrayUsers.data?.users.map((User: any) => {
    listOfExistentUsers.push(User.username)
  })

  var queryUserValidation = useQuery<User>(DB_USERS_VALIDATION, {
    variables: { username: logUser.username }
  })
 
  // EXAMPLE FETCH query
  /*useEffect(() => {
    fetch("http://localhost:8080/query", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ query: DB_USERS_VALIDATION_FETCH})
    }).then(response => response.json())
    .then(data => console.log(data.data.userByUsername.username))
  }, [])*/

  function validateUserData() { 
    //console.log(logUser)
    //let getUser: any = queryUserValidation.data ? queryUserValidation.data : undefined
    let getUser: any = queryUserValidation.data!
    console.log(getUser)
  }/*if (getUser.userByUsername.username === logUser.username){
    console.log(getUser.userByUsername.username)  
    setCurrentUser({ 
        id: 1, 
        username: getUser.userByUsername.username, 
        password: getUser.userByUsername.password 
      })
      console.log("Usuario " + logUser.username + " verificado!")
      console.log(currentUser.username)
    }
  }*/


   //query exple for graph, no react
  /*
  mutation mut{createUser(input: {id:"",name: "Luis", password: "4051", username: "LuisFlahan"}){
    name,
    password,
    username
  }}
*/







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
