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

  /*var queryUserValidation = useQuery<User>(DB_USERS_VALIDATION, {
    variables: { username: logUser.username }
  })*/
 
  // EXAMPLE FETCH query
  /*useEffect(() => {
    fetch("http://localhost:8080/query", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ query: DB_USERS_VALIDATION_FETCH})
    }).then(response => response.json())
    .then(data => console.log(data.data.userByUsername.username))
  }, [])*/

  
  const [queryUserValidation, setQueryUserValidation] = useState({
    id: "",
    name: "",
    username: "",
    password: ""
  })
  
  function validateUser() { 
    console.log(queryUserValidation)
    if (queryUserValidation.username === logUser.username) {
      setCurrentUser({
        id: queryUserValidation.id,
        username: queryUserValidation.username,
        password: queryUserValidation.password
      })
      console.log("Usuario " + queryUserValidation.id + " verificado!")
      console.log(currentUser.username)
    }  
  }

  useEffect(() => { if (logUser.username) {
    let query = `{
      userByUsername(username: "${logUser.username}"){
        id,
        password, 
        username,
        name
      }
    }`
    fetch("http://localhost:8080/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: query })
    }).then(response => response.json())
      .then(data => {
        setQueryUserValidation({
          id: data.data.userByUsername.id,
          name: data.data.userByUsername.name,
          username: data.data.userByUsername.username,
          password: data.data.userByUsername.password
        })
      })
  }
}, [logUser.username])



  var queryArrayUsers = useQuery<UserData>(DB_USERS_LOGIN)
 
  var listOfExistentUsers: string[] = []
  queryArrayUsers.data?.users.map((User: any) => {
    listOfExistentUsers.push(User.username)
  })

  
  








  /* -------------- USER LOGED -------------- */
  const [currentUser, setCurrentUser] = useState({
    id: "",
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
